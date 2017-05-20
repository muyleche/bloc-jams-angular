/**
 *   Constructor for the controller for album page.
 *   @param  {stateParams}  $stateParams
 *   @param  {AlbumService} AlbumService
 *   @param  {AudioService}  AudioService
 *   @param  {Utilities}    Utilities
 */
function AlbumController($stateParams, AlbumService, AudioService, Utilities) {
  const albumIndex = $stateParams.id;
  Object.assign(this,
    {
      AudioService,
      Utilities
    },
    AlbumService.getAlbum(albumIndex)
  );
  this.AudioService.setup(this.songs);
}
