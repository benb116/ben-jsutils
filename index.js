// A collection of useful functions
var ben = {};
ben.arr = require('./arr.js');

// Create a new delay timer function
// This returns a delay function that calls a callback after a certain amount of time
// If the returned delay function is called again before the timeout, it will reset the timer and begin delaying again
// The callback can be executed immediately by passing a truthy value as the 'immediate' argument
ben.debounce = function(immediate) {
    return (function() {
        var timer = 0;
        if (immediate) { return function(callback) { callback(); }; }
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
};

// Returns a function that only allows a function to run every X ms
ben.throttle = function(ms) {
    return (function() {
        var isrunning = 0;
        return function(callback, ms) {
            var timer = 0;
            if (!isrunning) {
                callback();
                isrunning = 1;
                setTimeout(function() { isrunning = 0; }, ms);
            }
        };
    })();
};

// Execute a promise generating function,
// then only allow it to execute again once the promise has resolved.
ben.waitBeforeRepeat = function() {
    return (function() {
        var p = Promise.resolve(1);
        return function(pGen) {
             ben.prom.promState(p).then(function(state) {
                if (state) { p = pGen(); }
            });
        };
    })();
};

ben.math = {};

ben.math.randInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

ben.prom = {};

// Returns a promise that resolves with the state of a given promise
// 0 = pending, 1 = fulfilled, 2 = rejected;
ben.prom.promState = function(p) {
    var uniqueValue = Math.random().toString(36).replace(/[^a-z]+/g, '');
    return Promise.race([p, Promise.resolve(uniqueValue)]).then(function(res) {
        return res !== uniqueValue;
    }).catch(function(err) {
        return 2;
    });
};

// Pause for a certain number of ms, CODE BLOCKING
ben.syncWait = function(ms) {
    var start = Date.now();
    var now = start;
    while (now - start < ms) { now = Date.now(); }
};

// Run a function immediately and also set it to repeat
ben.immedateInterval = function(f, i) {
    f(); setInterval(f, i);
};

ben.date = {};

// Return a date object representing the next occurance of a time on a specific weekday
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