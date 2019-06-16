var math = {};

math.randInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

math.roundDec = function(n, dec) {
    dec = (dec || 2);
    var base = Math.pow(10,dec);
    return Math.round(n*base) / base;
};

math.incLim = function(n, min, max) {
    n += 1;
    if (n > max) { n = min; }
    return n;
};

module.exports = math;