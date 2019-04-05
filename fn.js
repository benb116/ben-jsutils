var fn = {};
var prom = require('./prom.js');

// Create a new delay timer function
// This returns a delay function that calls a callback after a certain amount of time
// If the returned delay function is called again before the timeout, it will reset the timer and begin delaying again
// The callback can be executed immediately by passing a truthy value as the 'immediate' argument
// var d = fn.debounce(); d(function() { dostuff(); }, 1000);
fn.debounce = function(immediate) {
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
fn.throttle = function(ms) {
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
fn.waitBeforeRepeat = function() {
    return (function() {
        var p = Promise.resolve(1);
        return function(pGen) {
            prom.promState(p).then(function(state) {
                if (state) { p = pGen(); }
            });
        };
    })();
};

// Run a function n times at most
// Can also pass a truthy reset
fn.nLimit = function(n) {
    return (function() {
        var nrun = 0;
        return function(callback, reset) {
            if (reset) { nrun = 0; }
            if (nrun < n) {
                callback();
                nrun++;
            }
        };
    })();
};

// Run a function immediately and also set it to repeat
fn.immedateInterval = function(f, i) {
    f(); setInterval(f, i);
};


module.exports = fn;