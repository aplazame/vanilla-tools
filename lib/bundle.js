
var extend = require('./extend');

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
  require('./key'),
  require('./type'),
  require('./path')
);

_.Scope = require('./scope');

_.extend(_, {
	animate: require('./deferred/animate'),
	wait: require('./deferred/wait')
});

_.extend(_, {
	ready: require('./fn/ready'),
	template: require('./fn/template'),
	once: require('./fn/once'),
	debounce: require('./fn/debounce')
});

_.extend(_,
  require('./events'),
	// _.on(el, eventName, handler, useCapture)
	// _.off(el, eventName, handler, useCapture)
	// _.triggerEvent(element, eventName, data)

  require('./dom')
  // _.create(tagName, attrs)
	// _.attr(el, name, value)
  // _.tmpClass(el, className, duration, cb)
);

_.extend(_, {
	normalize: require('./normalize'),
	// _.touchDevice === true | false
	// _.isMac === true | false
	// _.isAndroid === true | false

	scroll: require('./scroll/bundle') // scroll is not available until document is ready
	// _.scroll.on( handler, useCapture )
	// _.scroll.off( handler, useCapture )
	// _.scroll.top()
	// _.scroll.goto(value)
	// _.scroll.animateTo(value | HTMLElement, callback, duration): Promise
	// _,scroll.inAnimation === true | false
});

module.exports = _;
