
var $q = require('q-promise'),
	wait = function (delay, callback) {
		if( !(delay instanceof Number) ) {
			throw new Error('delay should be a Number');
		}
		if( callback && !(callback instanceof Function) ) {
			throw new Error('callback should be a Function');
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