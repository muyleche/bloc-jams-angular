class CollectionController {
  constructor(AlbumService, $scope) {
    this.albums = AlbumService.getAlbum();
  }
}
