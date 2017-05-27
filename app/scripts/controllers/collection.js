(function() {
  /**
   * Constructor for the collection page's controller.
   * @param  {AlbumService} AlbumService
   */
  function CollectionController(AlbumService) {
    /**
     * All the album objects for the collections page.
     * @type {Array<Object>}
     */
    this.albums = AlbumService.getAlbums();
  }
  angular.module('blocJams')
    .controller('CollectionController', ['AlbumService', CollectionController]);
})();
