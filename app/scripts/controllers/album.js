/**
 *   Constructor for the controller for album page.
 *   @param  {stateParams}  $stateParams
 *   @param  {AlbumService} AlbumService
 *   @param  {Utilities}    Utilities
 */
function AlbumController($stateParams, AlbumService, Utilities) {
  const albumIndex = $stateParams.id;
  Object.assign(this,
    {
      currentSongIndex: -1,
      playing: false,
      Utilities: Utilities
    },
    AlbumService.getAlbum(albumIndex)
  );

  /**
   * OnClick handler for playing a song.
   * @param  {event} event
   */
  this.selectSong = (event) => {
    // only do stuff if you clicked in the album-song-button
    if (event.target.classList.contains('album-song-button')) {
      this.changeSong(parseInt(Utilities.getFirstParentByClassName(event.target,'album-view-song-item').dataset.songIndex,10));
    }
  }

  /**
   * Function to change the currently playing song.
   * @param  {Number} [index=-1] The index of currently playing song in this album's songs array.
   */
  this.changeSong = (index = -1) => {
    index = index === this.currentSongIndex ? -1 : index;
    const song = this.songs[index];
    // if you played a valid song, increment playCount.
    if (song) song.playCount++;
    // update currentSong and 'playing' state.
    this.currentSongIndex = index;
    this.playing = index >= 0;
  }

  /**
   * Get the first parent of the provided element that has the 'album-view-song-item' class.
   * @param  {DOMelement} element
   */
  this.getSongItem = (element) => {
    switch (element.className) {
      case /album/.test(element.className): {
        return element.querySelector('.song-item-number');
      }
      default: {
        return Utilities.getFirstParentByClassName(element,'album-view-song-item').querySelector('.song-item-number');
      }
    }
  }
}
