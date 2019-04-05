var prom = {};

// Returns a promise that resolves with the state of a given promise
// 0 = pending, 1 = fulfilled, 2 = rejected;
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

module.exports = prom;