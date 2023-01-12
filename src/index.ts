// A collection of useful functions
import * as arr from './arr'
import * as prom from './prom'
import * as fn from './fn'
import * as str from './str'
import * as date from './date'
import * as math from './math'
import * as buf from './buf'
import * as fs from './fs'

// Pause for a certain number of ms, CODE BLOCKING
function syncWait(ms: number) {
  const start = Date.now();
  let now = start;
  while (now - start < ms) { now = Date.now(); }
};

function querify(inJSON: Record<string, any>) {
  if (!inJSON) { return ''; }
  const qString = Object.keys(inJSON).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(inJSON[key])}`).join('&');
  return qString;
};

// https://github.com/beforesemicolon/javascript-solutions/blob/main/type%20check
const isOfType = (() => {
  // create a plain object with no prototype
  const type = Object.create(null);

  // check for null type
  type.null = (x: unknown) => x === null;
  // check for undefined type
  type.undefined = (x: unknown) => x === undefined;
  // check for nil type. Either null or undefined
  type.nil = (x: unknown) => type.null(x) || type.undefined(x);
  // check for strings and string literal type. e.g: 's', "s", `str`, new String()
  type.string = (x: unknown) => !type.nil(x) && (typeof x === 'string' || x instanceof String);
  // check for number or number literal type. e.g: 12, 30.5, new Number()
  type.number = (x: unknown) => !type.nil(x) // NaN & Infinity have typeof "number" and this excludes that
      && ((!Number.isNaN(x) && Number.isFinite(x) && typeof x === 'number') || x instanceof Number);
  // check for boolean or boolean literal type. e.g: true, false, new Boolean()
  type.boolean = (x: unknown) => !type.nil(x) && (typeof x === 'boolean' || x instanceof Boolean);
  // check for array type
  type.array = (x: unknown) => !type.nil(x) && Array.isArray(x);
  // check for object or object literal type. e.g: {}, new Object(), Object.create(null)
  type.object = (x: unknown) => ({}).toString.call(x) === '[object Object]';
  // check for provided type instance
  type.type = (x: unknown, X: any) => !type.nil(x) && x instanceof X;
  // check for set type
  type.set = (x: unknown) => type.type(x, Set);
  // check for map type
  type.map = (x: unknown) => type.type(x, Map);
  // check for date type
  type.date = (x: unknown) => type.type(x, Date);

  return type;
})();

export default {
  arr,
  prom,
  fn,
  str,
  date,
  math,
  buf,
  fs,
  isOfType,
  syncWait,
  querify
}
