
function getScrollRoot () {
    if( document.documentElement.scrollTop ) {
      return document.documentElement;
    } else if ( document.body.scrollTop ) {
      return document.body;
    }

    var html = document.documentElement, body = document.body,
        cacheTop = ((typeof window.pageYOffset !== "undefined") ? window.pageYOffset : null) || body.scrollTop || html.scrollTop, // cache the window's current scroll position
        root;

    html.scrollTop = body.scrollTop = cacheTop + (cacheTop > 0) ? -1 : 1;
    // find root by checking which scrollTop has a value larger than the cache.
    root = (html.scrollTop !== cacheTop) ? html : body;

    root.scrollTop = cacheTop; // restore the window's scroll position to cached value

    return root; // return the scrolling root element
}

var scrollRoot = getScrollRoot(),
    scroll = {
      root: scrollRoot,
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

module.exports = scroll;
