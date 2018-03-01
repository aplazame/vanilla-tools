
var html = document.documentElement, body = document.body, scroll_root = document.scrollingElement;
var supports_passive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supports_passive = true;
    }
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {} // eslint-disable-line

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
  on: function ( handler, use_capture ) {
    return document.addEventListener('scroll', handler, supports_passive ? { passive: supports_passive, capture: use_capture } : use_capture );
  },
  off: function ( handler, use_capture ) {
    return document.removeEventListener('scroll', handler, supports_passive ? { passive: supports_passive, capture: use_capture } : use_capture );
  },
  top: scroll_root ? getScrollTopRoot : getScrollTopDiscover,
  goto: scroll_root ? setScrollTopRoot : setScrollTopDiscover,
};

module.exports = scroll;
