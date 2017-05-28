(function() {
  angular.module('blocJams')
    .filter('secondsToDuration', ['Utilities', function(Utilities) {
      return function (seconds) {
        return Utilities.secondsToDurationString(seconds);
      };
    }]);
})();
