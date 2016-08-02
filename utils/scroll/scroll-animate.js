
var scroll = require('./scroll-basic'),
	animate = require('../animate'),
	noop = function() {},
	scrollAnimation = _.animate(_.noop, 0),
	aux;

scroll.animation = function () {
	return scrollAnimation;
};

scroll.animateTo = function (value, cb, duration ) {
	if( value === undefined ) {
	  return $q.reject();
	}
	if( value instanceof Element ) {
	  value = value.offsetTop;
	}

	if( typeof cb === 'number' ) {
	  aux = cb;
	  duration = cb;
	  cb = aux;
	}

	var scrollFrom = scroll.top(),
	    scrollDelta = value - scrollFrom;

	scrollAnimation.stop();
	scroll.inAnimation = true;
	scrollAnimation = animate(function (progress) {
	  scroll.goto( scrollFrom + scrollDelta*progress );
	}, function () {
	  scroll.inAnimation = false;
	  (cb || _.noop)();
	}, duration || 350, 'ease-out');

	return scrollAnimation;
};

module.exports = scroll;