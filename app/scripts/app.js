(function() {
  function config($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });
    $urlRouterProvider.otherwise('/');
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

  angular
    .module('blocJams', ['ui.router'])
    .config(config)
    .service('AlbumService', AlbumService)
    .service('Utilities', Utilities)
    .controller('LandingController', ['$scope', 'Utilities', LandingController])
    .controller('CollectionController', ['AlbumService', '$scope', CollectionController])
    .controller('AlbumController', ['$stateParams', 'AlbumService', '$scope', 'Utilities', AlbumController]);

})();
