class LandingController {
  /**
   * Constructor for the landing page's controller.
   * @param  {Utilities} Utilities
   */
  constructor(Utilities) {
    const points = document.getElementsByClassName('point');
    if (window.innerHeight > 950) {
      Utilities.forEach(points, this.revealPoint);
    }
    const sellingPoints = document.getElementsByClassName('selling-points')[0];
    const scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    const arrow = document.getElementsByClassName('arrow')[0];
    window.addEventListener('scroll', (event) => {
      if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
        Utilities.forEach(points, this.revealPoint);
        arrow.style.opacity = 0;
      }
    });

  }
  /**
   * Scale up and make opaque the provided DOM element.
   * @param  {DOM element} point
   */
  revealPoint(point) {
    point.style.opacity = 1;
    point.style.transform = "scaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
  }

}
