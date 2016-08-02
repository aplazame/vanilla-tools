
var pageRunning = false,
    listeners = [];

function ready (callback) {
  if( callback instanceof Function ) {
    if( pageRunning ) {
      ready.listeners.push(callback);
    } else {
      callback();
    }
  }
}
ready.init = function () {
  [].forEach.call(listeners, function (cb) { cb(); });
  listeners.splice(0, listeners.length);
  pageRunning = true;
  document.removeEventListener('DOMContentLoaded', ready.init);
  window.removeEventListener('load', ready.init);
};
document.addEventListener('DOMContentLoaded', ready.init);
window.addEventListener('load', ready.init);

module.exports = ready;
