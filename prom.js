var prom = {};

// Returns a promise that resolves with the state of a given promise
// 0 = pending, 1 = fulfilled, 2 = rejected;
// var p = new Promise(...); ben.prom.promState(p).then(function(s) { // state = 0, 1, or 2 })
prom.promState = function(p) {
    var uniqueValue = Math.random().toString(36).replace(/[^a-z]+/g, '');
    return Promise.race([p, Promise.resolve(uniqueValue)]).then(function(res) {
        return (res !== uniqueValue) ? 1 : 0;
    }).catch(function(err) {
        return 2;
    });
};

// Wait ms before continuing a promise chain
// promObj.then(ben.prom.delay(1000)).then(function(outputOfpromObj){});
// ben.prom.delay(2000)(init).then(function(init) { ... });
prom.delay = function(ms) {
    return function(input) {
        return new Promise(function(resolve, reject) {
            setTimeout(resolve, ms, input);
        });
    };
};

// Returns a promise that resolves as the input promise or rejects after a timeout
prom.timeout = function(P, ms) {
    var pt = new Promise(function(resolve, reject) {
        setTimeout(reject, ms, 'Promise timed out');
    });
    return Promise.race([P, pt]);
};

// Returns a promise that resolves at the specified datetime object
// promObj.then(ben.prom.atDateTime(d)).then(function(outputOfpromObj){});
// ben.prom.atDateTime(d)(init).then(function(init) { ... });
prom.atDateTime = function(d) {
    var ms = d.getTime() - Date.now();
    return prom.delay(ms);
};

// Execute an array of promises sequentially
prom.seqProm = function(pArr) {
    return pArr.reduce(function(chain, cur) {
        chain.then(cur);
    }, Promise.resolve());
};

// chainProm executes a set of promises sequentially
// chainProm is run on an array of promises or non-promises
// The zeroth promise resolves as init
// chainProm makes the resolved or rejected values of the previous promise available to a given function
// That function(thenF for resolved and catchF for rejected) is also passed the current array element and index
// That function should then return a promise that gets chained and is used for the next iteration
prom.chainProm = function(a, init, thenF, catchF) {
    return a.reduce(function(chain, cur, i) {
        return chain.then(function(r) {
            // Promise generating functions take the previously returned value, the current value, and the current index
            return thenF(r, cur, i);
        }).catch(function(e) {
            return catchF(e, cur, i);
        });
    }, Promise.resolve(init));
};

module.exports = prom;