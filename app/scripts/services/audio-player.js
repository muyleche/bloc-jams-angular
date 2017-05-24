/**
 * Service class providing functionality for audio playback.
 */
class AudioService {
  constructor(Utilities) {
    this.Utilities = Utilities;
    this.playing = false;
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
   * @param  {Number}  [index=-1]   The currently playing song.
   */
  changeSong(options = {song: null, adjust: null}) {
    // update currentSong and 'playing' state.
    if (options.song != null)
      this.currentSong = options.song;
    else
      this.currentSong = null;
    // if you played a valid song, increment playCount and change plyr source.
    if (this.currentSong) {
      if (!this.player) { this.setup(); }
      this.durationSeconds = this.Utilities.durationStringToSeconds(this.currentSong.duration);
      this.currentSong.playCount++;
      this.player.source(this.plyrSongFromJsonSong(this.currentSong));
      this.player.seek(0);
      this.position = 0;
      this.player.play();
    }
  }
}
