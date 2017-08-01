
var classListEnabled = !!document.createElement('div').classList;

var classListHas = classListEnabled ? function (el, className) {
      return el.classList.contains(className);
    } : function (el, className) {
      return new RegExp('\\b' + (className || '') + '\\b','').test(el.className);
    },
    classListAdd = classListEnabled ? function (el, className) {
      el.classList.add(className);
    } : function (el, className) {
      if( !classListHas(el, className) ) {
        el.className += ' ' + className;
      }
    },
    classListRemove = classListEnabled ? function (el, className) {
      el.classList.remove(className);
    } : function (el, className) {
      el.className = el.className.replace(new RegExp('\\s*' + className + '\\s*','g'), ' ');
    },
    classListToggle = classListEnabled ? (function () {
      var aux = document.createElement('span');
      aux.classList.toggle('test', true);
      aux.classList.toggle('test', true);

      // IE does not support second parameter toggle
      return aux.classList.contains('test') ? function (el, className, toggle) {
        el.classList.toggle(className, toggle);
      } : function (el, className, toggle) {
        toggle = toggle === undefined ? !el.classList.contains(className) : toggle;
        if( toggle ) el.classList.add(className);
        else el.classList.remove(className);
      };
    })() : function (el, className) {
      el.className = el.className.replace(new RegExp('\\s*' + className + '\\s*','g'), ' ');
    };

function _formKey(o, key, value) {
  var keys = key.replace(/\[(.*?)\]/g, '.$1').split('.'),
      last_i = keys.length - 1;
  key.split('.').forEach(function (_key, i) {
    if( i === last_i ) return o[_key] = value;
    o[_key] = o[_key] || {};
    o = o[_key];
  });
}

var _dom = {
  classList: { add: classListAdd, remove: classListRemove, has: classListHas, toggle: classListToggle },
  addClass: classListAdd,
  removeClass: classListRemove,
  hasClass: classListHas,
  toggleClass: classListToggle,
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
    if( !(el instanceof Element) && el[0] instanceof Element ) {
      el = el[0];
    }
    if( value !== undefined ) {
      el.setAttribute(name, value);
    }
    return el.getAttribute(name);
  },
  tmpClass: function (el, className, duration, cb) {
    var isCollection = !(el instanceof Element ) && el.length;

    if( isCollection ) {
      [].forEach.call(el, function (_el) {
        classListAdd(_el, className);
      });
    } else {
      classListAdd(el, className);
    }
    setTimeout(function () {
      if( isCollection ) {
        [].forEach.call(el, function (_el) {
          classListRemove(_el, className);
        });
      } else {
        classListRemove(el, className);
      }
      if( cb instanceof Function ) {
        cb();
      }
    }, duration instanceof Function ? duration() : duration );
  },
  formParams: function (form) {
    if( !(form instanceof Element) && form.length ) {
      form = form[0];
    }

    var data = {};
    [].forEach.call(form.elements, function (el) {
      if( el.name && !el.disabled ) {
        if( el.type === 'radio' ) {
          if( el.checked ) {
            _formKey(data, el.name, el.value);
          }
        } else {
          _formKey(data, el.name, el.value);
        }
      }
    });
    return data;
  }
};

function _currentScript () {
 var scripts = document.getElementsByTagName('script');
 return scripts[scripts.length - 1];
}

Object.defineProperty(_dom, 'currentScript', {
  get: function () {
    return document.currentScript || _currentScript();
  },
  set: function () {}
});

module.exports = _dom;
