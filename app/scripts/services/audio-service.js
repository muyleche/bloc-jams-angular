(function() {
  /**
   * Service class providing functionality for audio playback.
   */
  class AudioService {
    constructor() {
      /**
       * @type {number}
       * @desc The current playback
       */
      this.position = 0;
      this.volume = 5;
      this.currentSong = null;
    }

    /**
     * instantiate the plyr audio object.
     * @param {element | selector | array of elements}  element  The selector or HTML element(s) to be converted to plyr instances.
     */
    setup(element = '.audio-player') {
      if (!this.player) {
        this.player = plyr.setup(element, { debug: false })[0];
      }
    }

    /**
     * @function Returns a 'source' object that plyr.source() expects.
     * @param  {object} song JSON object representing the song to set as the plyr source.
     * @return {object} plyr array of songs for the .source() method.
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
     * @param  {object} song The currently playing song.
     */
    changeSong(song) {
      if (!song || song === this.currentSong && !this.player.isPaused()) {
        // if no song provided or you clicked the stop button, stop player and null song.
        this.player.pause();
        song = null;
      }
      else if (song === this.currentSong && this.player.isPaused()) {
        // if the song hasn't changed and you just hid play, play song.
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
