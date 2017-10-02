
var html = document.documentElement, body = document.body, scroll_root = document.scrollingElement;

function setScrollRoot(scrolling_element) {
  scroll_root = scrolling_element;
  scroll.goto = setScrollTopRoot;
  scroll.top = getScrollTopRoot;
}

function setScrollTopRoot (scroll_value) {
  scroll_root.scrollTop = scroll_value;
}

function getScrollTopRoot () {
  return scroll_root.scrollTop;
}

function setScrollTopDiscover (scroll_value) {
  if( scroll_value > 0 ) {
    html.scrollTop = scroll_value;
    body.scrollTop = scroll_value;
    if( scroll_value === html.scrollTop ) setScrollRoot(html);
    else if( scroll_value === body.scrollTop ) setScrollRoot(body);
  } else {
    html.scrollTop = 0;
    body.scrollTop = 0;
  }
}

function getScrollTopDiscover () {
  if( body.scrollTop !== 0 ) {
    setScrollRoot(body);
    return body.scrollTop;
  }
  if( html.scrollTop !== 0 ) {
    setScrollRoot(html);
    return html.scrollTop;
  }
}

var scroll = {
  on: function ( handler, useCapture ) {
    return document.addEventListener('scroll', handler, useCapture);
  },
  off: function ( handler, useCapture ) {
    return document.removeEventListener('scroll', handler, useCapture);
  },
  top: scroll_root ? getScrollTopRoot : getScrollTopDiscover,
  goto: scroll_root ? setScrollTopRoot : setScrollTopDiscover,
};

module.exports = scroll;
