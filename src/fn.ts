// Create a new delay timer function
// This returns a delay function that calls a callback after a certain amount of time
// If the returned delay function is called again before the timeout,
// it will reset the timer and begin delaying again
// The callback can be executed immediately by passing a truthy value as the 'immediate' argument

// var d = fn.debounce(); d(function() { dostuff(); }, 1000);
export function debounce(immediate: boolean) {
  return (function debounceInner() {
    let timer = 0;
    if (immediate) { return function debounce1(callback: Function) { callback(); }; }
    return function debounce2(callback: Function, ms: number) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  }());
};

// Returns a function that only allows a different function to run every X ms
// var d = fn.throttle(); d(function() { dostuff(); }, 1000);
export function throttle() {
  return (function throttleInner() {
    let isrunning = 0;
    return function throttle1(callback: Function, ms: number) {
      if (!isrunning) {
        callback();
        isrunning = 1;
        setTimeout(() => { isrunning = 0; }, ms);
      }
    };
  }());
};

// Run a function n times at most
// Can also pass a truthy reset
export function nLimit(n: number) {
  return (function nLimitInner() {
    let nrun = 0;
    return function nLimit1(callback: Function, reset: boolean) {
      if (reset) { nrun = 0; }
      if (nrun < n) {
        callback();
        nrun += 1;
      }
    };
  }());
};

// Run a function immediately and also set it to repeat every i ms
export function immediateInterval(f: Function, i: number) {
  f(); return setInterval(f, i);
};

// Run a function at a specific frequency (without drift like setInterval) n times
// var t = ben.fn.emitFreq(function() {...}, 10)
// if n is falsy, run forever
export function emitFreq(f: Function, ms: number, n: number) {
  return (function emitFreqInner() {
    let nextT = 0;
    let count = 0;
    let t: ReturnType<typeof setTimeout>;
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
