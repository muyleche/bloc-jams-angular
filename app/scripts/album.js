var createSongRow = function (songNumber, songName, songLength, playCount) {
   var template =
      '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="'+songNumber+'">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName 
    + '    <div class="sound-bars">'
    + '      <div class="bar bar1"></div>'
    + '      <div class="bar bar2"></div>'
    + '      <div class="bar bar3"></div>'
    + '      <div class="bar bar4"></div>'
    + '    </div>'
    + '  </td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '  <td class="song-item-play-count">' + playCount + '</td>'
    + '</tr>';
  return template;
};

var setCurrentAlbum = function (album) {
  var albumTitle = document.querySelector('.album-view-title'),
      albumArtist = document.querySelector('.album-view-artist'),
      albumReleaseInfo = document.querySelector('.album-view-release-info'),
      albumImage = document.querySelector('.album-cover-art'),
      albumSongList = document.querySelector('.album-view-song-list'),
      currentlyPlaying;
  
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);
  
  albumSongList.innerHTML = 
      '    <thead>'
    + '      <tr>'
    + '        <td class="song-item-number">#</td>'
    + '        <td class="song-item-title">Title</td>'
    + '        <td class="song-item-duration">Length</td>'
    + '        <td class="song-item-play-count">Plays</td>'
    + '      </tr>'
    + '    </thead>'
    + '    <tbody>';
  
  // Add each of the album's songs to the table using the template.
  forEach(album.songs, function(song, index) {
    albumSongList.innerHTML += createSongRow(index+1,song.title, song.duration,song.playCount);
  });
  albumSongList.innerHTML += '</tbody>';
  
};

/*
getFirstParentByClassName() is defined in utilities.js
*/

function getSongItem(element) {
  switch (element.className) {
    case /album/.test(element.className): {
      return element.querySelector('.song-item-number');
    }
    default: {
      return getFirstParentByClassName(element,'album-view-song-item').querySelector('.song-item-number');      
    }
  }
}

window.onload = function() {
  setCurrentAlbum(albums[parseInt(getHtmlQueryAsJson().albumIndex)]);
  
  document.querySelector('.album-view-song-list').addEventListener('mouseover', function(event) {
    var target = getFirstParentByClassName(event.target,'album-view-song-item');
    if (target && !target.classList.contains('playing')) {
      var songNumberElement = getSongItem(target);
      // if the play button isn't already visible, replace the track number with the play button.
      if (!/<a>/.test(songNumberElement.innerHTML)) {songNumberElement.innerHTML = '<a class="album-song-button ion-play"><a>';}
    }
  });
  
  
  for (var i = 0, currentlyPlaying, songRows = document.getElementsByClassName('album-view-song-item'), row; i < songRows.length; i++) {
    row = songRows[i]
    row.addEventListener('mouseleave', function (event) {
      // Add mouse leave listener to display track number again.
      if (!this.classList.contains('playing')) {
        var songNumberElement = getSongItem(this);
        songNumberElement.innerHTML = songNumberElement.getAttribute('data-song-number');
      }
    });
    row.querySelector('.song-item-number').addEventListener('click', function (event) {
      // only do stuff if you clicked in the album-song-button
      if (event.target.classList.contains('album-song-button')) {
        var button = event.target,
            song = getFirstParentByClassName(button,'album-view-song-item'),
            isPlaying = currentlyPlaying === song,
            playCountNode = song.querySelector('.song-item-play-count');

        // if a song is already playing, stop it.
        if (currentlyPlaying) {
          currentlyPlaying.className = currentlyPlaying.className.replace(/\s?playing/g,'');
          // if you just stopped the current song change the icon.
          if (isPlaying) {
            if (button.classList.contains('ion-play')) { 
              button.className = button.className.replace('ion-play','ion-pause');
            }
            else {
              button.className = button.className.replace('ion-pause','ion-play');
            }
          } // reset track number if you didn't just play the current row.
          else {
            var currentlyPlayingSongNumberElement = getSongItem(currentlyPlaying);
            currentlyPlayingSongNumberElement.innerHTML = currentlyPlayingSongNumberElement.getAttribute('data-song-number');
          }
          currentlyPlaying = null;
        }

        // if the current row wasn't already playing, play it.
        if (!isPlaying) {
          song.className += ' playing';
          playCountNode.textContent = parseInt(playCountNode.textContent)+1;
          currentlyPlaying = song;
          button.className = button.className.replace('ion-play','ion-pause');
        }
      }
    });
  }

};