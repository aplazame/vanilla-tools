
// document.currentScript
// Date.now()
// HTMLElement.closest()
// HTMLElement.addEventListener
// HTMLElement.removeEventListener
// window.matchMedia
// Element.prototype.matchesSelector

// require('classlist.js'); // https://developer.mozilla.org/es/docs/Web/API/Element/classList

var extend = require('./utils/extend');

function _ (selector, source) {
  return source && typeof source === 'string' ?
		selector.querySelector(source) :
		(source || document).querySelector(selector);
}

_.noop = function (value) { return value; };
_.once = function (fn) {
  return function () {
    if( fn ) fn.apply(this, arguments);
    fn = null;
  };
};
_.now = Date.now ? function () {
  return Date.now();
} : function () {
  return new Date().getTime();
};

_.usePolyfills = _.once(function () {
  require('./browser-polyfills');
});

_.q = require('parole');

extend.extend(_, extend,
  require('./utils/key'),
  require('./utils/type'),
  require('./utils/path')
);

_.extend(_, {
	animate: require('./deferred/animate'),
	wait: require('./deferred/wait')
});

_.extend(_, {
	ready: require('./fn/ready'),
	template: require('./fn/template'),
	template: require('./fn/once'),
	debounce: require('./fn/debounce')
});

_.extend(_,
  require('./utils/events'),
	// _.on(el, eventName, handler, useCapture)
	// _.off(el, eventName, handler, useCapture)
	// _.triggerEvent(element, eventName, data)

  require('./utils/dom'),
  // _.create(tagName, attrs)
	// _.attr(el, name, value)
  // _.tmpClass(el, className, duration, cb)

  Scope: require('./utils/scope')
);

_.extend(_, {
	normalize: require('./utils/normalize'),
	// _.touchDevice === true | false
	// _.isMac === true | false
	// _.isAndroid === true | false

	scroll: require('./utils/scroll/bundle') // scroll is not available until document is ready
	// _.scroll.on( handler, useCapture )
	// _.scroll.off( handler, useCapture )
	// _.scroll.top()
	// _.scroll.goto(value)
	// _.scroll.animateTo(value | HTMLElement, callback, duration): Promise
	// _,scroll.inAnimation === true | false
});

module.exports = _;
