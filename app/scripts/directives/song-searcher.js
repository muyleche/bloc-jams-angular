(function() {
  function songSearcherController(AlbumService, $state) {
    this.songs = AlbumService.getAllSongs();
    this.query = "";
    this.songFilter = (item) => {
      const reg = new RegExp(this.query.trim(), 'gi');
      return !!this.query.trim() && (reg.test(item.title) || reg.test(item.artist));
    };
    this.navigate = (state, options) => {
      if (state && options) {
        $state.go(state,options);
        this.query = "";
      }
    };
  }
  angular.module('blocJams')
    .directive('songSearcher', ['AlbumService', 'Utilities', '$state', function(AlbumService, Utilities, $state) {
      return {
        restrict: 'AE',
        replace: true,
        scope: {},
        templateUrl: '/templates/song-searcher.html',
        link: function(scope, element, attrs, Ctrl) {
          const results = element[0].querySelector('.search-results');
          let selected = results.querySelector('.selected'),
              newSelected;
          element.on('keydown mouseover',(event) => {
            if (event.keyCode === 38) //up arrow
              newSelected = Utilities.prev(selected || angular.element(results.children[0]));
            else if (event.keyCode === 40) //down arrow
              newSelected = selected ? (selected.next()[0] || selected[0]) : results.children[0];
            else if (event.type === 'mouseover')
              newSelected = event.target;
            else if (event.keyCode === 13) //return key
              Ctrl.navigate('album', { id: selected[0].dataset.album });
            else return;
            if (selected) selected.removeClass('selected');
            if (newSelected) {
              event.preventDefault();
              newSelected = angular.element(newSelected);
              if (!newSelected.hasClass('search-result-item')) return;
              selected = newSelected;
              selected.addClass('selected');
            }
          });
        },
        controller: ['AlbumService', '$state', songSearcherController],
        controllerAs: 'songSearchCtrl'
      };
    }]);
})();
