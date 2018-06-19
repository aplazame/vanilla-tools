
function _isObject (o) {
  return typeof o === 'object' && o !== null;
}

function _splitKeys (keys) {
  return (typeof keys === 'string' ? keys : '').replace(/^\[|\]/g, '').replace(/\[/g, '.').split('.');
}

function _getKey (o, keys) {
  return _splitKeys(keys).reduce(function (value, key) {
    if( !value ) return;
    return value[key];
  }, o);
}

function _setKey (_o, _keys, value) {
  var keys = _splitKeys(_keys),
      o = _o,
      last = keys.length - 1;

  keys.forEach(function (key, i) {
    if( i === last ) o[key] = value;
    else {
      o[key] = _isObject(o[key]) ? o[key] : {};
      o = o[key];
    }
  });

  return _o;
}

module.exports = {
  getKey: _getKey,
  setKey: _setKey,
  key: function (o, key, value) {
    if( value === undefined ) return _getKey(o, key);
    return _setKey(o, key, value);
  },
  keys: Object.keys
};
