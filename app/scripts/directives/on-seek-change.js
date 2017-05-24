 function onRangeChangeLink(scope, element, attrs, Ctrl) {
  element.on('mousedown mouseup input', function(event) {
    if (event.type === 'mousedown') {
      document.removeEventListener('timeupdate', Ctrl.positionUpdater);
    }
    else if (event.type === 'mouseup') {
      document.addEventListener('timeupdate', Ctrl.positionUpdater);
    }
    else {
      AudioService.position = parseFloat(event.target.value, 10);
      AudioService.player.seek(AudioService.position);
    }
  });
}
