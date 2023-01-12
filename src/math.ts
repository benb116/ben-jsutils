// Returns a random integet between min and max (inclusive)
export function randInt(min: number, max: number) {
  const nmin = Math.ceil(min);
  const nmax = Math.floor(max);
  return Math.floor(Math.random() * (nmax - nmin + 1)) + nmin;
};

// Round a number n to dec places
// dec can be negative
export function roundDec(n: number, dec = 2) {
  const rdec = Math.round(dec);
  const base = 10 ** rdec;
  return Math.round(n * base) / base;
};

// Increment a number with a max limit
export function incLim(n: number, min: number, max: number) {
  let newn = n + 1;
  if (newn > max) { newn = min; }
  return n;
};

// Decrement a number with a min limit
export function decLim(n: number, min: number, max: number) {
  let newn = n - 1;
  if (newn < min) { newn = max; }
  return n;
};
