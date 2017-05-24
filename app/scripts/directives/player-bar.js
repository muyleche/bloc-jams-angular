(function() {
  /**
   * PlayerBarController function for the audio playback controls on the album page.
   * @param {$scope}        $scope
   * @param {AudioService}  AudioService
   * @param {Utilities}     Utilities
   */
  function PlayerBarController($scope, AudioService, Utilities) {
    this.AudioService = AudioService;
    this.Utilities = Utilities;
    this.songPosition = AudioService.position;

    /**
     * Updates this service's "position" attribute as the plyr audio plays.
     */
    this.positionUpdater = () => {
      let currentTime = AudioService.player.getCurrentTime() || 0;
      //console.log('position updated: ',currentTime);
      AudioService.position = currentTime;
      $scope.$apply();
    };
  }

  angular.module('blocJams')
    .directive('playerBar', ['AudioService', 'Utilities', function(AudioService) {
      return {
        restrict: 'EA',
        scope: {
          songs: '=',
          artist: '='
        },
        link: function (scope, element, attrs, Ctrl) {
            AudioService.setup();
            document.addEventListener('timeupdate', Ctrl.positionUpdater);
            scope.$on('$destroy', () => {
              AudioService.player.destroy();
              document.removeEventListener('timeupdate', Ctrl.positionUpdater);
            });
        },
        templateUrl: '/templates/player_bar.html',
        controller: ['$scope', 'AudioService', 'Utilities', PlayerBarController],
        controllerAs: 'PlayerBarCtrl'
      };
    }]);
})();
