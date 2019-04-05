// A collection of useful functions
var ben     = {};
ben.arr     = require('./arr.js');
ben.prom    = require('./prom.js');
ben.fn      = require('./fn.js');
ben.str     = require('./str.js');
ben.date    = require('./date.js');
ben.math    = require('./math.js');
ben.req     = require('./req.js');
ben.buf 	= require('./buf.js');

// Pause for a certain number of ms, CODE BLOCKING
ben.syncWait = function(ms) {
    var start = Date.now();
    var now = start;
    while (now - start < ms) { now = Date.now(); }
};

module.exports = ben;