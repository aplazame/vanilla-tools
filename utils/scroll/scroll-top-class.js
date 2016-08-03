
var scroll = require('./scroll-basic'),
    onScroll = function () {
      document.documentElement.classList.toggle('scroll-top', !scroll.top() );
    };

scroll.on(onScroll);
onScroll();
