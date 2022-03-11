function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * Default utm keys
 * @type {string[]}
 */
var defaultUtmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

/**
 * Get utm tags from url
 * @param url
 * @param utmKeysMap
 * @returns {{}}
 */

function getUtmFromUr(url) {
  var utmKeysMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var defaultUtmKeys$1 = [].concat(_toConsumableArray(defaultUtmKeys), [utmKeysMap]);
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};

  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      var paramName = a[0];

      if (defaultUtmKeys$1.includes(paramName)) {
        var paramValue = typeof a[1] === 'undefined' ? true : a[1];
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

        if (paramName.match(/\[(\d+)?]$/)) {
          var key = paramName.replace(/\[(\d+)?]/, '');
          if (!obj[key]) obj[key] = [];

          if (paramName.match(/\[\d+]$/)) {
            var index = /\[(\d+)]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            obj[key].push(paramValue);
          }
        } else if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

/**
 * Get cookie value by name
 * @param name
 * @returns {any}
 */
function getCookieByName(name) {
  var value = "; ".concat(document.cookie);
  var parts = value.split("; ".concat(name, "="));
  if (parts.length === 2) return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
}

/**
 * Get utm tags from cookies
 * @param utmKeysMap
 * @returns {{}}
 */

function getUtmFromCookies() {
  var utmKeysMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var defaultUtmKeys$1 = [].concat(_toConsumableArray(defaultUtmKeys), _toConsumableArray(utmKeysMap));
  return document.cookie.split(';').reduce(function (cookies, cookie) {
    var _cookie$split$map = cookie.split('=').map(function (c) {
      return c.trim();
    }),
        _cookie$split$map2 = _slicedToArray(_cookie$split$map, 2),
        name = _cookie$split$map2[0],
        val = _cookie$split$map2[1];

    if (defaultUtmKeys$1.includes(name)) {
      cookies[name] = val;
    }

    return cookies;
  }, {});
}

/**
 * Get all utm keys from url or cookies
 * @param utmKeysMap
 * @returns {{}}
 */

function getUtmParams() {
  var utmKeysMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var defaultUtmKeys$1 = [].concat(_toConsumableArray(defaultUtmKeys), _toConsumableArray(utmKeysMap));
  var utmParamsObject;
  utmParamsObject = getUtmFromUr(window.location.href, defaultUtmKeys$1);

  if (utmParamsObject && Object.keys(utmParamsObject).length === 0) {
    utmParamsObject = getUtmFromCookies(defaultUtmKeys$1);

    if (Object.keys(utmParamsObject).length === 0) {
      utmParamsObject = getCookieByName('utm');
    }
  }

  return utmParamsObject;
}

export { getCookieByName, getUtmFromCookies, getUtmFromUr as getUtmFromUrl, getUtmParams };
