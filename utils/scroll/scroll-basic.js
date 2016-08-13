
var scrollRoot;

function getScrollRoot() {
    if( document.documentElement.scrollTop ) {
      return document.documentElement;
    } else if ( document.body.scrollTop ) {
      return document.body;
    }

    var html = document.documentElement, body = document.body,
        cacheTop = ((typeof window.pageYOffset !== "undefined") ? window.pageYOffset : null) || body.scrollTop || html.scrollTop; // cache the window's current scroll position

    html.scrollTop = body.scrollTop = cacheTop + (cacheTop > 0) ? -1 : 1;
    // find root by checking which scrollTop has a value larger than the cache.
    scrollRoot = (html.scrollTop !== cacheTop) ? html : body;

    scrollRoot.scrollTop = cacheTop; // restore the window's scroll position to cached value

    return scrollRoot; // return the scrolling root element
}

var scroll = {
      on: function ( handler, useCapture ) {
        return document.addEventListener('scroll', handler, useCapture);
      },
      off: function ( handler, useCapture ) {
        return document.removeEventListener('scroll', handler, useCapture);
      },
      top: function () {
        return scrollRoot.scrollTop;
      },
      goto: function ( value ) {
        scrollRoot.scrollTop = value;
      }
    };

require('../../fn/ready')(function () {
  scroll.root = getScrollRoot();
});

module.exports = scroll;
