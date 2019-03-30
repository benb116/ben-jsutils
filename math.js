var math = {};

math.randInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

math.roundDec = function(n, dec) {
    var base = Math.pow(10,dec);
    return Math.round(n*base) / base;
};

module.exports = math;