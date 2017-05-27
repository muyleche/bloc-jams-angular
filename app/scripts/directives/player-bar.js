(function() {
  /**
   * PlayerBarController function for the audio playback controls on the album page.
   * @param {$scope}        $scope
   * @param {AudioService}  AudioService
   */
  function PlayerBarController($scope, AudioService) {
    /**
     * Updates this service's "position" attribute as the plyr audio plays.
     */
    this.positionUpdater = function() {
      $scope.$apply(AudioService.position = AudioService.player && (AudioService.player.getCurrentTime() || 0));
    };

    $scope.$watch(
      () => AudioService.currentSong,
      () => $scope.currentSongIndex = $scope.songs.indexOf(AudioService.currentSong)
    );
  }

  angular.module('blocJams')
    .directive('playerBar', ['$window', 'AudioService', 'Utilities', function($window, AudioService, Utilities) {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          songs: '=',
          artist: '='
        },
        link: function (scope, element, attrs, Ctrl) {
          // Create plyr instance and assign it to the AudioService.
          AudioService.setup(plyr.setup('.audio-player', { debug: false })[0]);

          // Attach services to scope for use in HTML.
          scope.AudioService = AudioService;
          scope.Utilities = Utilities;

          angular.element($window).on('timeupdate', Ctrl.positionUpdater);
          scope.$on('$destroy', () => {
            AudioService.changeSong();
            AudioService.player.destroy();
            angular.element($window).off('timeupdate', Ctrl.positionUpdater);
          });
        },
        templateUrl: '/templates/player_bar.html',
        controller: ['$scope', 'AudioService', PlayerBarController],
        controllerAs: 'PlayerBarCtrl'
      };
    }]);
})();
