function PlayerBarController($scope, AudioService) {
  this.AudioService = AudioService;
  this.songPosition = AudioService.position;

  /**
   * @function Updates this service's "position" attribute as the plyr audio plays.
   */
  this.positionUpdater = () => {
    let currentTime = AudioService.player.getCurrentTime() || 0;
    //console.log('position updated: ',currentTime);
    AudioService.position = currentTime;
    $scope.$apply();
  };

  this.nextSong = (index) => {
    AudioService.changeSong(this.songs)
  };

  this.previousSong = (index) => {
    AudioService.changeSong(this.songs)
  };
}
