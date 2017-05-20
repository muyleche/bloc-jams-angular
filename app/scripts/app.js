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
    .filter('secondsToDuration', secondsToDuration)
    .controller('LandingController', ['Utilities', LandingController])
    .controller('CollectionController', ['AlbumService', CollectionController])
    .controller('AlbumController', ['$stateParams', 'AlbumService', 'AudioService', 'Utilities', AlbumController])
    .directive('playerBar', function() {
      return {
        restrict: 'EA',
        templateUrl: '/templates/player_bar.html',
        controller: ['$scope', '$interval', 'AudioService', PlayerBarController],
        controllerAs: 'PlayerBarCtrl'
      };
    });

})();
