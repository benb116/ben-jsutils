const fn = {};
const prom = require('./prom');

// Create a new delay timer function
// This returns a delay function that calls a callback after a certain amount of time
// If the returned delay function is called again before the timeout,
// it will reset the timer and begin delaying again
// The callback can be executed immediately by passing a truthy value as the 'immediate' argument
// var d = fn.debounce(); d(function() { dostuff(); }, 1000);
fn.debounce = function debounce(immediate) {
  return (function debounceInner() {
    let timer = 0;
    if (immediate) { return function debounce1(callback) { callback(); }; }
    return function debounce2(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  }());
};

// Returns a function that only allows a different function to run every X ms
// var d = fn.throttle(); d(function() { dostuff(); }, 1000);
fn.throttle = function throttle() {
  return (function throttleInner() {
    let isrunning = 0;
    return function throttle1(callback, ms) {
      if (!isrunning) {
        callback();
        isrunning = 1;
        setTimeout(() => { isrunning = 0; }, ms);
      }
    };
  }());
};

// Execute a promise generating function,
// then only allow it to execute again once the promise has resolved.
fn.waitBeforeRepeat = function waitBeforeRepeat() {
  return (function waitBeforeRepeatInner() {
    let p = Promise.resolve(1);
    return function waitBeforeRepeat1(pGen) {
      prom.promState(p).then((state) => {
        if (state) { p = pGen(); }
      });
    };
  }());
};

// Run a function n times at most
// Can also pass a truthy reset
fn.nLimit = function nLimit(n) {
  return (function nLimitInner() {
    let nrun = 0;
    return function nLimit1(callback, reset) {
      if (reset) { nrun = 0; }
      if (nrun < n) {
        callback();
        nrun += 1;
      }
    };
  }());
};

// Run a function immediately and also set it to repeat every i ms
fn.immediateInterval = function immediateInterval(f, i) {
  f(); return setInterval(f, i);
};

// Run a function at a specific frequency (without drift like setInterval) n times
// var t = ben.fn.emitFreq(function() {...}, 10)
// if n is falsy, run forever
fn.emitFreq = function emitFreq(f, ms, n) {
  return (function emitFreqInner() {
    let nextT = 0;
    let count = 0;
    let t;
    function N() {
      t = setTimeout(() => {
        count += 1;
        nextT += ms;
        if (count > n && n) { return; }
        N();
        f();
      }, nextT - Date.now());
    }

    return {
      start() {
        nextT = Date.now();
        N();
      },
      stop() {
        clearTimeout(t);
      },
    };
  }());
};

module.exports = fn;
