/**
 * Constructor for the collection page's controller.
 * @param  {AlbumService} AlbumService
 */
function CollectionController(AlbumService) {
  this.albums = AlbumService.getAlbum();
}
