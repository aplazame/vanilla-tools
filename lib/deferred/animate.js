
var Parole = require('parole'),
    beizerEasing = require('bezier-easing'),
    timingFunctions = {},
    noop = function () {},
    getTimingFunction = function (timingFunctionName) {
      if( !timingFunctions[timingFunctionName] ) {
        if( timingFunctionName === 'linear' ) {
          timingFunctions[timingFunctionName] = function ( value ) { return value; };
        } else if( timingFunctionName === 'ease' ) {
          timingFunctions[timingFunctionName] = beizerEasing(.17,.67,.83,.67);
        } else if( timingFunctionName === 'ease-in' ) {
          timingFunctions[timingFunctionName] = beizerEasing(.42,0,1,1);
        } else if( timingFunctionName === 'ease-out' ) {
          timingFunctions[timingFunctionName] = beizerEasing(0,0,.58,1);
        } else if( timingFunctionName === 'ease-in-out' ) {
          timingFunctions[timingFunctionName] = beizerEasing(.42,0,.58,1);
        }
      }
      return timingFunctions[timingFunctionName];
    },
    _requestAnimationFrame = window.requestAnimationFrame,
    // eslint-disable-next-line
    _cancelAnimationFrame = window.cancelAnimationFrame,
    animation_polyfilled = false;

// FROM: https://gist.github.com/paulirish/1579671
if( !_requestAnimationFrame ) (function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      _requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      _cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if( !_requestAnimationFrame ) {
    animation_polyfilled = true;
    _requestAnimationFrame = function(callback, _element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    _cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();

// FROM: https://gist.github.com/paulirish/5438650
(function(){

  if ('performance' in window == false) {
      window.performance = {};
  }

  Date.now = (Date.now || function () {  // thanks IE8
    return new Date().getTime();
  });

  if ('now' in window.performance == false){

    var nowOffset = Date.now();

    if (performance.timing && performance.timing.navigationStart){
      nowOffset = performance.timing.navigationStart;
    }

    window.performance.now = function now(){
      return Date.now() - nowOffset;
    };
  }

})();

function animate (progressFn, duration, atEnd, timingFunctionName) {
  var aux;
  if ( duration instanceof Function ) {
    if ( typeof atEnd === 'number' ) {
      aux = duration;
      duration = atEnd;
      atEnd = aux;
    } else {
      atEnd = duration;
      duration = 400;
    }
  } else if ( duration === undefined ) {
    duration = 400;
  }

  timingFunctionName = timingFunctionName || ( typeof atEnd === 'string' ? atEnd : ( typeof duration === 'string' ? duration : 'ease' ) );

  progressFn(duration === 0 ? 1 : 0);

  var start, frame_id,
      timingFunction = getTimingFunction(timingFunctionName),
      deferred = Parole.defer();

  if( duration > 0 ) {
    start = animation_polyfilled ? new Date().getTime() : performance.now();

    frame_id = _requestAnimationFrame(function step() {
      var elapsed = performance.now() - start;

      if( elapsed >= duration ) {
        progressFn(1);
        deferred.resolve();
        (atEnd || noop)();
      } else {
        progressFn( timingFunction(elapsed/duration) );
        frame_id = _requestAnimationFrame(step);
      }
    });
  } else setTimeout(deferred.resolve, 0);

  deferred.promise.stop = function (reject) {
    _cancelAnimationFrame(frame_id);
    if( reject ) deferred.reject();
  };

  return deferred.promise;
}

animate.time = function (el) {
  var time = 0;
  var duration = window.getComputedStyle(el).animationDuration;
  if( duration ) {
    duration.replace(/([0-9](\.[0-9])?)(m)?s/, function (matched, t, decimals, ms) {
      time += ms ? Number(t) : Number(t)*1000;
    });
  }
  if( window.getComputedStyle(el).animationDelay ) {
    window.getComputedStyle(el).animationDelay.replace(/([0-9](\.[0-9])?)(m)?s/, function (matched, t, decimals, ms) {
      time += ms ? Number(t) : Number(t)*1000;
    });
  }
  duration = window.getComputedStyle(el).transitionDuration;
  if( duration ) {
    duration.replace(/([0-9](\.[0-9])?)(m)?s/, function (matched, t, decimals, ms) {
      t = ms ? Number(t) : Number(t)*1000;
      if( t > time ) {
        time = t;
      }
    });
  }
  // console.log('animationTime', el, time);
  return time;
};

module.exports = animate;
