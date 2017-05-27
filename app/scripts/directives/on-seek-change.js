(function() {
  angular.module('blocJams')
    .directive('onSeekChange', ['$window', 'AudioService', function ($window, AudioService) {
      return {
        require: '^^playerBar',
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs, Ctrl) {
         element.on('mousedown mouseup input', function(event) {
           if (event.type === 'mousedown') {
             angular.element($window).off('timeupdate', Ctrl.positionUpdater);
           }
           else if (event.type === 'mouseup') {
             angular.element($window).on('timeupdate', Ctrl.positionUpdater);
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
