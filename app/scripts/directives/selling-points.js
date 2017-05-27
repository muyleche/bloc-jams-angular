(function() {
  /**
   * Directive for making the landing page's sellingPoints appear when the user scrolls.
   * @type {Utilities}
   */
  angular.module('blocJams')
    .directive('sellingPoints', ['$window', 'Utilities', function ($window, Utilities) {
       return {
         restrict: 'C',
         link: function(scope, element, attrs, Ctrl) {
           const sellingPoints = element[0],
            scrollDistance = sellingPoints.getBoundingClientRect().top - $window.innerHeight + 200,
            scrollHandler = function () {
              if ($window.scrollY >= scrollDistance) {
                Utilities.addClass('visible-points', sellingPoints);
              }
            };

           angular.element($window).on('scroll', scrollHandler);

           if ($window.innerHeight > 950) {
             Utilities.addClass('visible-points', sellingPoints);
           }

           scope.$on('$destroy',() => {
             angular.element($window).off('scroll', scrollHandler);
           });
         }
     };
   }]);
})();
