
function getScrollRoot () {
  var html = document.documentElement, body = document.body;

  if( html.scrollTop ) return html;
  if( body.scrollTop ) return body;

  var cacheTop = ((typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : null) || body.scrollTop || html.scrollTop, // cache the window's current scroll position
      root;

  html.scrollTop = body.scrollTop = cacheTop + (cacheTop > 0) ? -1 : 1;
  // find root by checking which scrollTop has a value larger than the cache.
  root = (html.scrollTop !== cacheTop) ? html : body;

  root.scrollTop = cacheTop; // restore the window's scroll position to cached value

  return root; // return the scrolling root element
}

var ready = require('./fn/ready'),
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
