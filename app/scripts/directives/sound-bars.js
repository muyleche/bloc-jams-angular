(function() {
  angular.module('blocJams')
    .directive('soundBars', function() {
      return {
        restrict: 'C',
        template:`<div class="bar bar1"></div>
                  <div class="bar bar2"></div>
                  <div class="bar bar3"></div>
                  <div class="bar bar4"></div>`
      };
    });
})();
