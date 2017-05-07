class AlbumController {
  constructor($stateParams, AlbumService, $scope, Utilities) {
    let albumIndex = $stateParams.id;
    this.album = AlbumService.getAlbum(albumIndex);
    this.currentSongIndex = -1;
    this.playing = false;

    this.selectSong = (event) => {
      // only do stuff if you clicked in the album-song-button
      if (event.target.classList.contains('album-song-button')) {
        const songIndex = parseInt(Utilities.getFirstParentByClassName(event.target,'album-view-song-item').dataset.songIndex,10);
        // stop playing if the user clicked the currently playing song.
        if (songIndex === this.currentSongIndex){
          this.currentSongIndex = -1;
          this.playing = false;
        }
        else{
          this.changeSong(songIndex);
        }
      }
    }

    this.changeSong = (index = -1) => {
      const song = this.album.songs[index]
      // if you played a valid song, increment playCount.
      if (song) song.playCount++;
      // update currentSong and 'playing' state.
      this.currentSongIndex = index;
      this.playing = index >= 0;
      console.log({playing: this.playing, currentSongIndex: this.currentSongIndex});
    }

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

}
