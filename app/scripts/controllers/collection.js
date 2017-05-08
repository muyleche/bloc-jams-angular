class CollectionController {
  /**
   * Constructor for the collection page's controller.
   * @param  {AlbumService} AlbumService
   */
  constructor(AlbumService) {
    this.albums = AlbumService.getAlbum();
  }
}
