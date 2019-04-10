// A collection of useful functions
var ben     = {};
ben.arr     = require('./arr.js');
ben.prom    = require('./prom.js');
ben.fn      = require('./fn.js');
ben.str     = require('./str.js');
ben.date    = require('./date.js');
ben.math    = require('./math.js');
ben.req     = require('./req.js');
ben.buf     = require('./buf.js');
ben.fs      = require('./fs.js');

// Pause for a certain number of ms, CODE BLOCKING
ben.syncWait = function(ms) {
    var start = Date.now();
    var now = start;
    while (now - start < ms) { now = Date.now(); }
};

// Prepends a timestamp string to each console.log statement
// 2019-04-09T13:04:39.947Z1554829479947Q ({date}T{time}Z{timestamp}Q)
ben.logTS = function() {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    require('log-timestamp')(function() { return (new Date(Date.now() - tzoffset)).toISOString() + Date.now() +'Q %s'; });
};

module.exports = ben;