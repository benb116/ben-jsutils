const math = {};

// Returns a random integet between min and max (inclusive)
math.randInt = function randInt(min, max) {
  const nmin = Math.ceil(min);
  const nmax = Math.floor(max);
  return Math.floor(Math.random() * (nmax - nmin + 1)) + nmin;
};

// Round a number n to dec places
// dec can be negative
math.roundDec = function roundDec(n, dec = 2) {
  const rdec = Math.round(dec);
  const base = 10 ** rdec;
  return Math.round(n * base) / base;
};

// Increment a number with a max limit
math.incLim = function incLim(n, min, max) {
  let newn = n + 1;
  if (newn > max) { newn = min; }
  return n;
};

// Decrement a number with a min limit
math.decLim = function decLim(n, min, max) {
  let newn = n - 1;
  if (newn < min) { newn = max; }
  return n;
};

module.exports = math;
