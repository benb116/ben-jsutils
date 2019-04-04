var str = {};

str.capitalize = function(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
};

// https://gist.github.com/jonlabelle/5375315

// Does a string contain a substring
str.contains = function(s, substring, fromIndex){
    return s.indexOf(substring, fromIndex) !== -1;
};

// Right pad string with `char` if its' length is smaller than `minLen`
str.rpad = function(s, minLen, ch) {
    ch = ch || ' ';
    return (s.length < minLen) ? s + repeat(ch, minLen - s.length) : s;
};

// Left pad string with `char` if its' length is smaller than `minLen`
str.lpad = function(s, minLen, ch) {
    ch = ch || ' ';
    return ((s.length < minLen) ? repeat(ch, minLen - s.length) + s : s);
};

// Repeat string n times
str.repeat = function(s, n){
    return (new Array(n + 1)).join(s);
};

// Checks if a string is valid JSON. Returns parsed JSON or false.
str.isValidJSON = function(s) {
    try {
        return JSON.parse(s);
    } catch(err) {
        return false;
    }
};

// Returns a random alpha-numeric string of length n
str.randomString = function(n) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = n; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

module.exports = str;