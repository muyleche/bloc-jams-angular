(function() {
  /**
   * Function for configuring the bloc-jams-angular app.
   * @param  {stateProvider} $stateProvider     ui-router service for setting application state based on URL route.
   * @param  {locationProvider} $locationProvider  angular service for managing browser window location (URL).
   * @param  {urlRouterProvider} $urlRouterProvider angular service for manipulating angular app's URL routes.
   */
  function config($stateProvider, $locationProvider, $urlRouterProvider) {
    // hide 'hash' notation in URL.
    // don't require the 'base' url tag in the HTML head.
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    // if any unanticipated URL path is provided, go to the landing page.
    $urlRouterProvider.otherwise('/');

    // define routes using ui-router.
    $stateProvider
      .state('landing',{
        url: '/',
        templateUrl: '/templates/landing.html',
        controller: 'LandingController as LandingCtrl'
      })
      .state('collection',{
        url: '/collection',
        templateUrl: '/templates/collection.html',
        controller: 'CollectionController as CollectionCtrl'
      })
      .state('album', {
        url: '/album/{id:int}',
        templateUrl: '/templates/album.html',
        controller: 'AlbumController as AlbumCtrl'
      });
  }

  // define primary angular module, config, and controllers/services.
  angular
    .module('blocJams', ['ui.router'])
    .config(config)
    .service('Utilities', Utilities)
    .service('AlbumService', AlbumService)
    .service('AudioService', ['Utilities', AudioService])
    .controller('LandingController', ['Utilities', LandingController])
    .controller('CollectionController', ['AlbumService', CollectionController])
    .controller('AlbumController', ['$stateParams', 'AlbumService', 'AudioService', 'Utilities', AlbumController])
    .directive('playerBar', ['AudioService', function(AudioService) {
      return {
        restrict: 'EA',
        scope: { songs: '=' },
        link: function (scope, element, attrs, Ctrl) {
            AudioService.setup();
            document.addEventListener('timeupdate', Ctrl.positionUpdater);
            //scope.$destroy(() => {document.removeEventListener('timeupdate', Ctrl.positionUpdater);});
        },
        templateUrl: '/templates/player_bar.html',
        controller: ['$scope', 'AudioService', PlayerBarController],
        controllerAs: 'PlayerBarCtrl'
      };
    }])
    .directive('onSeekChange', ['AudioService', function (AudioService) {
      return {
        require: '^^playerBar',
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs, Ctrl) {
         element.on('mousedown mouseup input', function(event) {
           if (event.type === 'mousedown') {
             document.removeEventListener('timeupdate', Ctrl.positionUpdater);
           }
           else if (event.type === 'mouseup') {
             document.addEventListener('timeupdate', Ctrl.positionUpdater);
           }
           else {
             AudioService.position = parseFloat(event.target.value, 10);
             AudioService.player.seek(AudioService.position);
           }
         });
       }
      };
    }]);

})();
