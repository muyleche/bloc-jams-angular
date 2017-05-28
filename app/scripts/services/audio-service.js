(function() {
  /**
   * Service class providing functionality for audio playback.
   */
  class AudioService {
    constructor($rootScope) {
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
      /**
       * Whether or not the user is currently seeking the song's playback position.
       * @type {Boolean}
       */
      this.seeking = false;

      /**
       * Function that udpates the 'position' attribute according to the plyr instance's getCurrentTime().
       * @return {[type]} [description]
       */
      this.positionUpdater = () => {
        if (!this.seeking) $rootScope.$apply(this.position = this.player && (this.player.getCurrentTime() || 0));
      };
    }

    /**
     * instantiate the plyr audio object.
     * @param {plyrObject}  player  The plyr instance you will use with this service.
     */
    init(player) {
      if (!player) throw "You must provide an instance of plyr.";
      this.player = angular.element(player)[0];
      this.player.on('timeupdate', this.positionUpdater)
        .on('$destroy', () => {
          this.player.off('timeupdate', this.positionUpdater);
          this.player.destroy();
        });
    }

    /**
     * Returns a 'source' object that plyr.source() expects.
     * @param  {Object} song JSON object representing the song to set as the plyr source.
     * @return {Object} plyr-structured object for the .source() method.
     */
    plyrSongFromJsonSong(song = { file, fileType:"audio/mp3", title:"Unknown"}) {
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
     * Play the provided song. This will change the currently playing song if different.
     * @param  {song} song JSON song object.
     */
    play(song) {
      if (!this.player) throw "You have not provided an instance of plyr.";
      if (song && this.currentSong !== song){
        this.changeSong(song);
      }
      else if (this.player.isPaused()) {
        this.player.play();
      }
    }

    /**
     * Pause the currently playing song.
     */
    pause() {
      if (!this.player) throw "You have not provided an instance of plyr.";
      if (this.currentSong && !this.player.isPaused())
        this.player.pause();
    }

    /**
     * Stop the currently playing song.
     */
    stop() {
      if (!this.player) throw "You have not provided an instance of plyr.";
      this.currentSong = null;
      this.player.pause();
    }

    /**
     * Change the playback position of the currently playing song.
     * @param  {number} here the number of seconds into the song to seek to.
     */
    seek(here) {
      if (!this.player) throw "You have not provided an instance of plyr.";
      if (here) {
        this.position = typeof here === 'number' ? here : parseFloat(here, 10);
        this.player.seek(this.position);
      }
    }

    /**
     * Function to change the currently playing song.
     * @param  {Object} song The currently playing song.
     */
    changeSong(song) {
      if (!this.player) throw "You have not provided an instance of plyr.";
      if (song && this.currentSong !== song) {
        // if you played a valid song, increment playCount and change plyr source.
        song.playCount++;
        this.player.source(this.plyrSongFromJsonSong(song));
        this.player.seek(0);
        this.currentSong = song;
        this.player.play();
      }
      else throw "You must provide a song.";
    }
  }

  angular.module('blocJams')
    .service('AudioService',AudioService);
})();
