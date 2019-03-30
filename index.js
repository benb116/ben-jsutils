// A collection of useful functions
var ben = {};
ben.arr =   require('./arr.js');
ben.prom =  require('./prom.js');
ben.fn =    require('./fn.js');
ben.str =   require('./str.js');
ben.date =  require('./date.js');
ben.math =  require('./math.js');

// Pause for a certain number of ms, CODE BLOCKING
ben.syncWait = function(ms) {
    var start = Date.now();
    var now = start;
    while (now - start < ms) { now = Date.now(); }
};

module.exports = function(rp) {
    if (rp) { ben.req = require('./req.js')(rp); }
    return ben;
};