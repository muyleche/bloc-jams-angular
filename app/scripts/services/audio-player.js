/**
 * Service class providing functionality for audio playback.
 */
class AudioService {
  constructor(Utilities) {
    this.Utilities = Utilities;
    this.songs = [];
    this.playing = false;
    this.position = 5;
    this.durationSeconds = 0;
    this.volume = 5;
    this.currentSong = null;

    //binding this one because otherwise it uses the eventListener's 'this'.
    this.positionUpdater = this.positionUpdater.bind(this);
  }

  /**
   * instantiate the plyr audio object.
   * @return {plyr instance} an instance of plyr for this AudioPlayer.
   */
  setup(songs) {
    if (!this.player) {
      this.player = plyr.setup('.audio-player',{ debug: false, volume: this.volume })[0];
    }
    if (songs) {
      this.songs = songs;
      this.changeSong(songs[0]);
    }
    return this.player;
  }

  /**
   * @function Updates this service's "position" attribute as the plyr audio plays.
   */
  positionUpdater() {
    console.log('position: ', this.position);
    let currentTime = this.player.getCurrentTime() || 0;
    if (currentTime != this.position) {
      this.position = currentTime;
    }
  }

  /**
   * @function Returns a 'source' object that plyr.source() expects.
   * @param  {array} song JSON object representing the song to set as the plyr source.
   * @return {object}       plyr array of songs for the .source() method.
   */
  plyrSongFromJsonSong(song) {
    if (song.file) {
      return {
        type: 'audio',
        title: song.title,
        sources: [{
          src: "/assets/music/" + encodeURI(song.file),
          type: song.fileType || "audio/mp3"
        }]
      };
    }
    return {};
  }


  /**
   * Function to change the currently playing song.
   * @param  {Number}  [index=-1]   The currently playing song.
   */
  changeSong(options = {song: null, adjust: null}) {
    document.removeEventListener('timeupdate', this.positionUpdater );
    // update currentSong and 'playing' state.
    if (options.song != null)
      this.currentSong = options.song;
    else if (options.adjust != null)
      this.currentSong += this.songs[(this.songs.indexOf(this.currentSong)+options.adjust)%this.songs.length];
    else
      this.currentSong = null;
    // if you played a valid song, increment playCount and change plyr source.
    if (this.currentSong) {
      this.durationSeconds = this.Utilities.durationStringToSeconds(this.currentSong.duration);
      this.currentSong.playCount++;
      this.player.source(this.plyrSongFromJsonSong(this.currentSong));
      this.player.seek(0);
      this.player.play();
      document.addEventListener('timeupdate', this.positionUpdater);
    }
  }

  seekHandler(newPosition) {
    document.removeEventListener('timeupdate', this.positionUpdater);
    if (this.seekTimer) {
      clearTimeout(this.seekTimer);
      this.seekTimer = null;
    }
    this.seekTimer = setTimeout(() => {
        this.player.pause();
        this.player.seek(newPosition);
        document.addEventListener('timeupdate', this.positionUpdater);
    }, 250);
  }

  cleanUp(){
    this.changeSong();
    document.removeEventListener('timeupdate', this.positionUpdater);
  }
}
