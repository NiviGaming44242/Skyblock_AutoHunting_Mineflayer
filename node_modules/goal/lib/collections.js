/* jslint node: true */
"use strict";

var _ = require('./helpers.js');

function args(arr) {
  return Array.prototype.slice.call(arr);
}

function each(obj, cb, thisArg) {
  if(typeof thisArg !== 'undefined')
    cb = cb.bind(thisArg);

  if(Array.isArray(obj)) {
    var count = 0;
    var length = obj.length;

    for(; count < length; count++) {
      cb(obj[count], count, obj);
    }
  } else {
    var count = 0;
    var keys = Object.keys(obj);
    var length = keys.length;

    for(; count < length; count++) {
      var key = keys[count];
      cb(obj[key], key, obj);
    }
  }
}

function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

function mixin(dest) {
  var count = 1;
  var length = arguments.length;

  for(; count < length; count++) {
    var arg = arguments[count];

    for(var prop in arg) {
      if(arg.hasOwnProperty(prop)) {
        dest[prop] = arg[prop];
      }
    }
  }
  return dest;
}

function map(obj, callback, thisArg) {
  if(typeof thisArg !== 'undefined')
    callback = callback.bind(thisArg);

  if(Array.isArray(obj)) {
    var count = 0;
    var length = obj.length;
    var returned = [];

    for(; count < length; count++) {
      returned[count] = callback(obj[count], count, obj);
    }

    return returned;
  } else {
    var count = 0;
    var keys = Object.keys(obj);
    var length = keys.length;
    var returned = {};

    for(; count < length; count++) {
      var key = keys[count];
      returned[key] = callback(obj[key], key, obj);
    }

    return returned;
  }
}

function removeWhere(arr, callback) {
  var returned = arr.slice();
  each(arr, function(value, count, obj) {
    if(callback(value, count, obj))
      returned = returned.splice(0, arr.indexOf(value)).concat(returned.splice(arr.indexOf(value) + 1));
  });
  return returned;
}

function replaceAll(string, query, replacement) {
  if(_.typeOf(query) === 'object') {
    each(query, function(val, key) {
      string = string.split(key).join(val || "");
    });
    return string;
  } else {
    replacement = replacement || "";
    return string.split(query).join(replacement);
  }
}

module.exports = {
  args: args,
  each: each,
  isEmpty: isEmpty,
  mixin: mixin,
  map: map,
  removeWhere: removeWhere,
  replaceAll: replaceAll
};
