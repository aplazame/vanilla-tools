
var html = document.documentElement, body = document.body, scroll_root;

function setScrollTopRoot (scroll_value) {
  scroll_root.scrollTop = scroll_value;
}

function setScrollTopDiscover (scroll_value) {
  if( scroll_value > 0 ) {
    html.scrollTop = scroll_value;
    body.scrollTop = scroll_value;
    if( scroll_value === html.scrollTop ) scroll_root = html;
    else if( scroll_value === body.scrollTop ) scroll_root = body;
    if( scroll_root ) scroll.goto = setScrollTopRoot;
  } else {
    html.scrollTop = 0;
    body.scrollTop = 0;
  }
}

var scroll = {
  on: function ( handler, useCapture ) {
    return document.addEventListener('scroll', handler, useCapture);
  },
  off: function ( handler, useCapture ) {
    return document.removeEventListener('scroll', handler, useCapture);
  },
  top: function () {
    return scroll_root ? scroll_root.scrollTop : (html.scrollTop || body.scrollTop);
  },
  goto: setScrollTopDiscover
};

module.exports = scroll;
