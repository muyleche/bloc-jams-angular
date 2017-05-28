(function() {
  angular.module('blocJams')
    .directive('onSeekChange', ['AudioService', function (AudioService) {
      return {
        require: '^^playerBar',
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs, Ctrl) {
         element.on('mouseup mousedown input', function(event) {
           if (event.type === 'mousedown')
             AudioService.seeking = true;
           else if (event.type === 'mouseup')
             AudioService.seeking = false;
           else
             AudioService.seek(parseFloat(event.target.value, 10));
         });
       }
      };
    }]);
})();
