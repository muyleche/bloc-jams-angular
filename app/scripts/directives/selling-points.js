(function() {
  /**
   * Directive for making the landing page's sellingPoints appear when the user scrolls.
   * @type {Utilities}
   */


  angular.module('blocJams')
    .directive('sellingPoints', ['Utilities', function (Utilities) {
       return {
         restrict: 'C',
         link: function(scope, element, attrs, Ctrl) {
         const sellingPoints = document.getElementsByClassName('selling-points')[0],
          scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200,
          scrollHandler = function (event) {
            if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
              Utilities.addClass('visible-points', sellingPoints);
            }
          };

         document.addEventListener('scroll', scrollHandler);
         if (window.innerHeight > 950) {
          Utilities.addClass('visible-points', sellingPoints);
         }

         scope.$on('$destroy',() => {
          document.removeEventListener('scroll', scrollHandler);
         });
       }
     };
   }]);
})();
