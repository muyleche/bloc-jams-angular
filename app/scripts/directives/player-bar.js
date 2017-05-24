function PlayerBarLink(scope, element, attrs, ctrl) {

}

function PlayerBarController($scope, $interval, AudioService) {
  this.AudioService = AudioService;
  this.songPosition = AudioService.position;
  AudioService.setup();



  /**
   * @function Updates this service's "position" attribute as the plyr audio plays.
   */
  let positionUpdater = () => {
    let currentTime = AudioService.player.getCurrentTime() || 0;
    AudioService.position = currentTime;
    $scope.$apply();
  };

  document.addEventListener('timeupdate', positionUpdater);

  this.seekHandler = (newPosition) => {
    console.log('seek: ', newPosition);
    document.removeEventListener('timeupdate', positionUpdater);
    if (this.seekTimer) {
      this.seekTimer = clearTimeout(this.seekTimer);
    }
    this.seekTimer = setTimeout( function () {

        AudioService.player.seek(newPosition);
        document.addEventListener('timeupdate', positionUpdater);
    }, 250);
  };

  this.nextSong = (index) => {
    AudioService.changeSong(this.songs)
  };
}
