var prom = {};

// Returns a promise that resolves with the state of a given promise
// 0 = pending, 1 = fulfilled, 2 = rejected;
// var p = new Promise(...); ben.prom.promState(p).then(function(s) { // state = 0, 1, or 2 })
prom.promState = function(p) {
    var uniqueValue = Math.random().toString(36).replace(/[^a-z]+/g, '');
    return Promise.race([p, Promise.resolve(uniqueValue)]).then(function(res) {
        return res !== uniqueValue;
    }).catch(function(err) {
        return 2;
    });
};

// Wait ms before continuing a promise chain
// promObj.then(ben.prom.delay(1000)).then(function(outputOfpromObj){});
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
        setTimeout(reject, ms, 'Promise timed out after '+ms+' ms');
    });
    return Promise.race([P, pt]);
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
// That function(genF for resolved and catchF for rejected) is also passed the current array element and index
// That function should then return a promise that gets chained and is used for the next iteration
prom.chainProm = function(a, init, genF, catchF) {
    var x = a.reduce(function(prev, cur, i) {
        return prev.then(function(r) {
            // Promise generating functions take the previously returned value, the current value, and the current index
            return genF(r, cur, i);
        }).catch(function(e) {
            return catchF(e, cur, i);
        });
    }, Promise.resolve(init));
    return x;
};

module.exports = prom;