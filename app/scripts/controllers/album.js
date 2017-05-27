(function() {
  /**
   *   Constructor for the controller for album page.
   *   @param  {$stateParams}  $stateParams
   *   @param  {AlbumService} AlbumService
   *   @param  {AudioService}  AudioService
   */
  function AlbumController($stateParams, AlbumService, AudioService) {
    const albumIndex = $stateParams.id;

    // assign the AudioService and album info to the scope.
    Object.assign(this,{ AudioService },AlbumService.getAlbums(albumIndex));
  }

  angular.module('blocJams')
    .controller('AlbumController', ['$stateParams', 'AlbumService', 'AudioService', AlbumController])
})();
