
module.exports = function (scroll) {

	var ready = require('../../fn/ready');

	scroll.autoTopClass = function (topClass, topClassAlt) {

		topClass = topClass || 'js-scroll-top';
		topClassAlt = topClassAlt || 'js-no-scroll-top';

    ready(function () {
      scroll.on(function () {
        var top = scroll.top();
        document.documentElement.classList.toggle(topClass, !top );
        document.documentElement.classList.toggle(topClassAlt, top );
      });
    });
	};

};
