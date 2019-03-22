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

module.exports = prom;