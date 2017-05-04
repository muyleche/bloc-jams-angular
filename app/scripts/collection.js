
var createAlbumItem = function(album) {
  var template = 
    '<div class="collection-album-container column fourth">'
  + '    <a href="album.html?albumIndex='+albums.indexOf(album)+'">'
  + '      <div class="image-container">'
  + '         <img src="' + album.albumArtUrl + '">'
  + '         <div class="label">' + album.songs.length + ' songs</div>'
  + '      </div>'
  + '      <p class="caption">'
  + '        <span class="album-name">' + album.title + '</span>'
  + '        <br/>' + album.artist
  + '      </p>'
  + '    </a>'
  + '  </div>';
  return template;
}

window.onload = function () {
  var collectionContainer = document.getElementsByClassName('album-covers')[0];
  collectionContainer.innerHTML = '';
  forEach(albums, function(albumItem) {
    collectionContainer.innerHTML += createAlbumItem(albumItem);
  });
};