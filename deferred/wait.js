
var $q = require('q-promise/no-native'),
	wait = function (delay, callback) {
		if( delay instanceof Function ) {
			delay = [callback, callback = delay][0];
		}
		if( callback && !(callback instanceof Function) ) {
			throw new Error('callback should be a Function');
		}
		if( typeof delay !== 'number' ) {
			throw new Error('delay should be a Number');
		}
		return $q(function (resolve, reject) {
			setTimeout(function () {
				resolve();
				if( callback ) {
					callback();
				}
			}, delay);
		});
	};

module.exports = wait;
