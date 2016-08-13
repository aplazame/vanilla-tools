
module.exports = {
  create: function (tagName, attrs) {
    var el = document.createElement(tagName);
    if( attrs ) {
      if( attrs.html ) {
        el.innerHTML = attrs.html;
      }
      for( var attr in attrs ) {
        if( attr !== 'html' ) {
          el[attr] = attrs[attr];
        }
      }
    }
    return el;
  },
  attr: function (el, name, value) {
    if( value !== undefined ) {
      el.setAttribute(name, value);
    }
    return el.getAttribute(name);
  },
  tmpClass: function (el, className, duration, cb) {
    el.classList.add(className);
    // console.log('tmpClass', className, duration instanceof Function ? duration() : duration );
    setTimeout(function () {
      el.classList.remove(className);
      if( cb instanceof Function ) {
        cb();
      }
    }, duration instanceof Function ? duration() : duration );
  },
  formParams: function (form) {
    var data = {};
    [].forEach.call(form.elements, function (el) {
      if( el.name && !el.disabled ) {
        if( el.type === 'radio' ) {
          if( el.checked ) {
            data[el.name] = el.value;
          }
        } else {
          data[el.name] = el.value;
        }
      }
    });
    return data;
  }
};
