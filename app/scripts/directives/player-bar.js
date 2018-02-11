(function() {
  /**
   * PlayerBarController function for the audio playback controls on the album page.
   * @param {$scope}        $scope
   * @param {AudioService}  AudioService
   */
  function PlayerBarController($scope, AudioService) {
    $scope.$watch(
      () => AudioService.currentSong,
      (nextSong) => {
        $scope.previousSong = $scope.songs[$scope.songs.indexOf(nextSong)-1];
        $scope.nextSong = $scope.songs[$scope.songs.indexOf(nextSong)+1];
      }
    );
  }

  angular.module('blocJams')
    .directive('playerBar', ['AudioService', 'Utilities', function(AudioService, Utilities) {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          songs: '=',
          artist: '='
        },
        link: function (scope, element, attrs, Ctrl) {
          // Create plyr instance and assign it to the AudioService.
          AudioService.init(plyr.setup('.audio-player', { debug: false })[0]);

          // Attach services to scope for use in HTML.
          scope.AudioService = AudioService;
          scope.Utilities = Utilities;
        },
        templateUrl: '/templates/player-bar.html',
        controller: ['$scope', 'AudioService', PlayerBarController],
        controllerAs: 'PlayerBarCtrl'
      };
    }]);
})();
