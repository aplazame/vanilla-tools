
module.exports = function (scroll) {

	var onScroll = function () {
	      document.documentElement.classList.toggle('scroll-top', !scroll.top() );
	    };

	scroll.on(onScroll);

	require('../../fn/ready')(onScroll);

};
