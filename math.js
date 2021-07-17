var math = {};

// Returns a random integet between min and max (inclusive)
math.randInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Round a number n to dec places
// dec can be negative
math.roundDec = function(n, dec) {
    if (dec === undefined || dec === null) {
        dec = 2;
    } else {
        dec = Math.round(dec);
    }
    var base = Math.pow(10,dec);
    return Math.round(n*base) / base;
};

// Increment a number with a max limit
math.incLim = function(n, min, max) {
    n += 1;
    if (n > max) { n = min; }
    return n;
};

// Decrement a number with a min limit
math.incLim = function(n, min, max) {
    n -= 1;
    if (n < min) { n = max; }
    return n;
};

module.exports = math;