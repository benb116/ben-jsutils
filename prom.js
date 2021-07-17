const prom = {};

// Returns a promise that resolves with the state of a given promise
// 0 = pending, 1 = fulfilled, 2 = rejected;
// var p = new Promise(...); ben.prom.promState(p).then(function(s) { // state = 0, 1, or 2 })
prom.promState = function promState(p) {
  const uniqueValue = Math.random().toString(36).replace(/[^a-z]+/g, '');
  return Promise.race([
    p,
    Promise.resolve(uniqueValue),
  ])
    .then((res) => ((res !== uniqueValue) ? 1 : 0))
    .catch(() => 2);
};

// Wait ms before continuing a promise chain
// promObj.then(ben.prom.delay(1000)).then(function(outputOfpromObj){});
// ben.prom.delay(2000)(init).then(function(init) { ... });
prom.delay = function delay(ms) {
  return function delayInner(input) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms, input);
    });
  };
};

// Returns a promise that resolves as the input promise or rejects after a timeout
prom.timeout = function timeout(P, ms, msg = 'Promise timed out') {
  const pt = new Promise((resolve, reject) => {
    setTimeout(reject, ms, msg);
  });
  return Promise.race([P, pt]);
};

// Returns a promise that resolves at the specified datetime object
// promObj.then(ben.prom.atDateTime(d)).then(function(outputOfpromObj){});
// ben.prom.atDateTime(d)(init).then(function(init) { ... });
prom.atDateTime = function atDateTime(d) {
  const ms = d.getTime() - Date.now();
  return prom.delay(ms);
};

// Execute an array of promises sequentially
prom.seqProm = function seqProm(pArr) {
  return pArr.reduce((chain, cur) => chain.then(cur), Promise.resolve());
};

// chainProm executes a set of promises sequentially
// chainProm is run on an array of promises or non-promises
// The zeroth promise resolves as init
// chainProm makes the resolved or rejected values of the previous promise
// available to a given function
// That function(thenF for resolved and catchF for rejected)
// is also passed the current array element and index
// That function should then return a promise that gets chained and is used for the next iteration
prom.chainProm = function chainProm(a, init, thenF, catchF) {
  // Promise generating functions take
  // the previously returned value, the current value, and the current index
  return a
    .reduce((chain, cur, i) => chain
      .then((r) => thenF(r, cur, i))
      .catch((e) => catchF(e, cur, i)),
    Promise.resolve(init));
};

/*

var abc = [1, 2, 3, 4]

function thenFunc(prev, cur, ind) {
    prev <- the fulfilled value from the previous promise
    cur <- the current element of abc
    ind <- the index of the current element of abc

    return Promise(function(resolve, reject) { <- Example promise that acts on inputs
        resolve(prev + cur * ind)
    });
}

ben.prom.chainProm(abc, 3, thenFunc).then(console.log)
- First pass
    prev = 3 (from init)
    cur = 1
    ind = 0
    resolves as = 3
- Second pass
    prev = 3
    cur = 2
    ind = 1
    resolves as = 5
- Third pass
    prev = 5
    cur = 3
    ind = 2
    resolves as = 11
- Fourth pass
    prev = 11
    cur = 4
    ind = 3
    resolves as = 23

log output = 23

*/

// If a promise returns an array, use multiThen to create a promise.all
// where each promise acts on one of the array elements
prom.multiThen = function multiThen(fn) {
  return function multiThenInner(a) { return Promise.all(a.map((e) => fn(e))); };
};

// PromThatReturnsArray()
// .then(ben.prom.multiThen(FnThatActsOnOneElement))
// .then(function(ArrayOfResultsFromFn) { ... })

module.exports = prom;
