(function() {
  /**
   * Constructor for the landing page's controller.
   */
  function LandingController() {
    /**
     * The 'Hero'-styled text for the title on the landing page.
     * @type {String}
     */
    this.heroTitle = "Turn the Music Up!";
  }

  angular.module('blocJams')
    .controller('LandingController', LandingController);
})();
