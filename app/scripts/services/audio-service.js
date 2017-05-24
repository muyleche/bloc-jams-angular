/**
 * Service class providing functionality for audio playback.
 */
class AudioService {
  constructor(Utilities) {
    this.Utilities = Utilities;
    this.position = 0;
    this.volume = 5;
    this.currentSong = null;
  }

  /**
   * instantiate the plyr audio object.
   * @return {plyr instance} an instance of plyr for this AudioPlayer.
   */
  setup() {
    if (!this.player) {
      this.player = plyr.setup('.audio-player',{ debug: false, volume: this.volume })[0];
    }
    return this.player;
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
   * @param  {Song} song The currently playing song.
   */
  changeSong(song) {
    if (!song || song === this.currentSong && !this.player.isPaused()) {
      // if no song provided or you clicked the stop button, null song and stop player.
      this.currentSong = null;
      this.player.pause();
    }
    else if (song === this.currentSong && this.player.isPaused()) {
      // if the song hasn't changed and you just hid play, play song.
      this.player.play();
    }
    else {
      // if you played a valid song, increment playCount and change plyr source.
      this.currentSong = song;
      this.durationSeconds = this.Utilities.durationStringToSeconds(this.currentSong.duration);
      this.currentSong.playCount++;
      this.player.source(this.plyrSongFromJsonSong(this.currentSong));
      this.player.seek(0);
      this.position = 0;
      this.player.play();
    }

  }
}
