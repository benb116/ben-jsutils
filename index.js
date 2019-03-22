// A collection of useful functions
var ben = {};
ben.arr =   require('./arr.js');
ben.prom =  require('./prom.js');
ben.fn =    require('./fn.js');

ben.math = {};

ben.math.randInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

ben.math.roundDec = function(n, dec) {
    var base = Math.pow(10,dec);
    return Math.round(n*base) / base;
};

// Pause for a certain number of ms, CODE BLOCKING
ben.syncWait = function(ms) {
    var start = Date.now();
    var now = start;
    while (now - start < ms) { now = Date.now(); }
};

ben.date = {};

// Return a date object representing the next occurance of a time on a specific weekday
// dayOfWeek = 0 -> Sunday
ben.date.nextDayAndTime = function(dayOfWeek, hour, minute) {
    var now = new Date();
    var result = new Date(
                 now.getFullYear(),
                 now.getMonth(),
                 now.getDate() + (7 + dayOfWeek - now.getDay()) % 7,
                 hour,
                 minute);

    if (result < now) {
        result.setDate(result.getDate() + 7);
    }
    return result;
};

// Return a date object representing the previous occurance of a time on a specific weekday
// dayOfWeek = 0 -> Sunday
ben.date.prevDayAndTime = function(dayOfWeek, hour, minute) {
    var now = new Date();
    var result = new Date(
                 now.getFullYear(),
                 now.getMonth(),
                 now.getDate() + (-7 + dayOfWeek - now.getDay()) % 7,
                 hour,
                 minute);

    if (result > now) {
        result.setDate(result.getDate() - 7);
    }
    return result;
};

module.exports = function(rp) {
    if (rp) { ben.req = require('./req.js')(rp); }
    return ben;
};

// module.exports = ben;