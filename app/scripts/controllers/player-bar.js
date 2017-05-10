function PlayerBarController($scope) {
  //console.log($scope.currentSongIndex);
  this.volume = 5;
  this.position = 0;
  //this.player = plyr.setup('.audio-player',{})[0];
  //this.player.setVolume(this.state.volume);
  //document.addEventListener('timeupdate', positionUpdater);

  this.playerBarPlayPause = (target = document.querySelector('.play-pause'), props = this.props) => {
    if (props.playing && this.player.isPaused()) {
      this.player.play();
      utils.removeClass('ion-play', target);
      utils.addClass('ion-pause', target);
    }
    else if (!props.playing && !this.player.isPaused()) {
      this.player.pause();
      utils.removeClass('ion-pause', target);
      utils.addClass('ion-play', target);
    }
  }

  this.positionUpdater = () => {
    this.position = this.player.getCurrentTime();
  }

  this.seekHandler = (event) => {
    this.setState({position: parseFloat(event.target.value)});
    document.removeEventListener('timeupdate', this.positionUpdater);
    if (this.seekTimer) {
      clearTimeout(this.seekTimer);
      this.seekTimer = null;
    }
    this.seekTimer = setTimeout(() => {
        this.player.pause();
        this.player.seek(this.state.position);
        document.addEventListener('timeupdate', this.positionUpdater);
        this.playerBarPlayPause();
    }, 250);
  }

  this.volumeHandler = (event) => {
    this.volume = event.target.value;
    this.player.setVolume(this.volume);
  }

  this.updateCurrentSongInPlayer = (song) => {
    this.player.source({
      type: 'audio',
      title: song ? song.title : this.props.currentSong.title,
      sources: [{
        src: "assets/music/" + encodeURI(song ? song.file : this.props.currentSong.file),
        type: song ? song.fileType : this.props.currentSong.fileType
      }]
    });
    this.player.seek(0);
    this.positionUpdater();
  }

  this.componentWillReceiveProps = (nextProps) => {
    // the props are about to be updated.
    // the song just changed, upate the player.
    if (nextProps.currentSong && this.props.currentSong !== nextProps.currentSong) {
      this.updateCurrentSongInPlayer(nextProps.currentSong);
    }
    if (this.player.isReady()) {
      this.playerBarPlayPause(undefined, nextProps);
    }
  }

  this.componentWillUnmount = () => {
    this.player.destroy();
    clearInterval(this.state.positionTimer);
    document.removeEventListener('timeupdate', this.positionUpdater);
  }
}
