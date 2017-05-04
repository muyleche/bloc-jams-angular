var points = document.getElementsByClassName('point');

function animatePoints (points) {

  function revealPoint(point) {
    point.style.opacity = 1;
    point.style.transform = "scaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
  };

  forEach(points, revealPoint);
};

window.onload = function() {
  if (window.innerHeight > 950) {
    animatePoints(points);
  }
  var sellingPoints = document.getElementsByClassName('selling-points')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
  var arrow = document.getElementsByClassName('arrow')[0];
  window.addEventListener('scroll',function(event) {
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
      animatePoints(points);
      arrow.style.opacity = 0;
    }
  });
}

