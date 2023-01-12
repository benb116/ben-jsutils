/** Capitalize first letter of string */
export function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

// https://gist.github.com/jonlabelle/5375315

/** Does a string contain a substring */
export function contains(s: string, substring: string, fromIndex: number) {
  return s.indexOf(substring, fromIndex) !== -1;
};

/** Right pad string with `char` if its' length is smaller than `minLen` */
export function rpad(s: string, minLen: number, ch = ' ') {
  return (s.length < minLen) ? s + repeat(ch, minLen - s.length) : s;
};

/** Left pad string with `char` if its' length is smaller than `minLen` */
export function lpad(s: string, minLen: number, ch = ' ') {
  return ((s.length < minLen) ? repeat(ch, minLen - s.length) + s : s);
};

/** Repeat string n times */
export function repeat(s: string, n: number) {
  return (new Array(n + 1)).join(s);
};

/** Checks if a string is valid JSON. Returns parsed JSON or false. */
export function isValidJSON(s: string) {
  try {
    return JSON.parse(s);
  } catch (err) {
    return false;
  }
};

/** Returns a random alpha-numeric string of length n */
export function randomString(n: number) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = n; i > 0; i -= 1) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
