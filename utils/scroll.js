
function getScrollRoot () {
    var html = document.documentElement, body = document.body;
    if( html.scrollTop ) {
      return html;
    }
    if ( body.scrollTop ) {
      return body;
    }

    var cacheTop = ((typeof window.pageYOffset !== "undefined") ? window.pageYOffset : null); // cache the window's current scroll position

    html.scrollTop = cacheTop;
    body.scrollTop = cacheTop + (cacheTop > 0) ? -1 : 1;

    return html;
}

var ready = require('../fn/ready'),
    scrollRoot = { scrollTop: 0 },
    scroll = {
      root: scrollRoot,
      on: function ( handler, useCapture ) {
        return document.addEventListener('scroll', handler, useCapture);
      },
      off: function ( handler, useCapture ) {
        return document.removeEventListener('scroll', handler, useCapture);
      },
      top: function () {
        return scroll.root.scrollTop;
      },
      goto: function ( value ) {
        scroll.root.scrollTop = value;
      }
    };

ready(function () {
  scrollRoot = getScrollRoot();
  scroll.root = scrollRoot;
});

module.exports = scroll;
