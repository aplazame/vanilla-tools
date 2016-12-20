
module.exports = function (scroll) {

	var animate = require('../../deferred/animate'),
			Parole = require('parole'),
			noop = function() {},
			scrollAnimation = animate(noop, 0),
			aux;

	scroll.animation = function () {
		return scrollAnimation;
	};

	scroll.animateTo = function (value, cb, duration ) {
		var scrollFrom = scroll.top();

		if( value === undefined ) {
		  return Parole.reject();
		}
		if( value instanceof Element ) {
			// position from top of the page
			value = value.getBoundingClientRect().top + scrollFrom;
		}

		if( typeof cb === 'number' ) {
		  aux = duration;
		  duration = cb;
		  cb = typeof aux === 'function' ? aux : noop;
		}

		var scrollDelta = value - scrollFrom;

		scrollAnimation.stop();
		scroll.inAnimation = true;
		scrollAnimation = animate(function (progress) {
		  scroll.goto( scrollFrom + scrollDelta*progress );
		}, function () {
		  scroll.inAnimation = false;
		  (cb || noop)();
		}, duration || 350, 'ease-out');

		return scrollAnimation;
	};

	return scroll;
};
