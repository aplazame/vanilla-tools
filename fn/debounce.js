
function debounce (fn, timeslot) {
  var timer = null,
      timeslot = timeslot || 80;

  return function () {
    var _this = this, args = arguments;

    if( timer ) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, timeslot);
  };
}

module.exports = debounce;