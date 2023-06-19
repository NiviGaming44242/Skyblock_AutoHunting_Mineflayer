var c = require('./lib/collections.js');

module.exports = Object.freeze(c.mixin({}, c, require('./lib/helpers.js')));
