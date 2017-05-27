(function() {
  /**
   * Service class providing functionality for audio playback.
   */
  class AudioService {
    constructor() {
      /**
       * The current playback position of the audio.
       * @type {Number}
       */
      this.position = 0;
      /**
       * The current volume of the audio.
       * @type {Number}
       */
      this.volume = 5;
      /**
       * The currently playing song object.
       * @type {Object}
       */
      this.currentSong = null;
    }

    /**
     * instantiate the plyr audio object.
     * @param {plyrObject}  player  The plyr instance you will use with this service.
     */
    setup(player) {
      if (player) this.player = player;
    }

    /**
     * Returns a 'source' object that plyr.source() expects.
     * @param  {Object} song JSON object representing the song to set as the plyr source.
     * @return {Object} plyr-structured object for the .source() method.
     */
    plyrSongFromJsonSong(song = { file, fileType:"audio/mp3", title:"Unknown"}) {
      if (!song.file) return {};
      return {
        type: 'audio',
        title: song.title,
        sources: [{
          src: encodeURI(song.file),
          type: song.fileType
          }]
      };
    }

    /**
     * Function to change the currently playing song.
     * @param  {Object} song The currently playing song.
     */
    changeSong(song) {
      if (!song || song === this.currentSong && !this.player.isPaused()) {
        // if no song provided or you clicked the stop button, stop player and null song.
        this.player.pause();
        song = null;
      }
      else if (song === this.currentSong && this.player.isPaused()) {
        // if the song hasn't changed and you just hit play, play song.
        this.player.play();
      }
      else {
        // if you played a valid song, increment playCount and change plyr source.
        song.playCount++;
        this.player.source(this.plyrSongFromJsonSong(song));
        this.player.seek(0);
        this.player.play();
      }
      // set the currentSong.
      this.currentSong = song;
    }
  }

  angular.module('blocJams')
    .service('AudioService',AudioService);
})();
