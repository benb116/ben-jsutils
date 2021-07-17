const str = {};

str.capitalize = function capitalize(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

// https://gist.github.com/jonlabelle/5375315

// Does a string contain a substring
str.contains = function contains(s, substring, fromIndex) {
  return s.indexOf(substring, fromIndex) !== -1;
};

// Right pad string with `char` if its' length is smaller than `minLen`
str.rpad = function rpad(s, minLen, ch = ' ') {
  return (s.length < minLen) ? s + str.repeat(ch, minLen - s.length) : s;
};

// Left pad string with `char` if its' length is smaller than `minLen`
str.lpad = function lpad(s, minLen, ch = ' ') {
  return ((s.length < minLen) ? str.repeat(ch, minLen - s.length) + s : s);
};

// Repeat string n times
str.repeat = function repeat(s, n) {
  return (new Array(n + 1)).join(s);
};

// Checks if a string is valid JSON. Returns parsed JSON or false.
str.isValidJSON = function isValidJSON(s) {
  try {
    return JSON.parse(s);
  } catch (err) {
    return false;
  }
};

// Returns a random alpha-numeric string of length n
str.randomString = function randomString(n) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = n; i > 0; i -= 1) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

module.exports = str;
