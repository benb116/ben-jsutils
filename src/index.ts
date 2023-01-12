// A collection of useful functions
import * as arr from './arr'
import * as prom from './prom'
import * as fn from './fn'
import * as str from './str'
import * as date from './date'
import * as math from './math'
import * as buf from './buf'
import * as fs from './fs'

/** Pause for a certain number of ms, CODE BLOCKING */
function syncWait(ms: number) {
  const start = Date.now();
  let now = start;
  while (now - start < ms) { now = Date.now(); }
};

/** Turn an object into a query string */
function querify(inJSON: Record<string, any>) {
  if (!inJSON) { return ''; }
  const qString = Object.keys(inJSON).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(inJSON[key])}`).join('&');
  return qString;
};

/** Check if a var is a certain type */
// https://github.com/beforesemicolon/javascript-solutions/blob/main/type%20check
const isOfType = Object.create(null);

// check for null type
isOfType.null = (x: unknown) => x === null;
// check for undefined type
isOfType.undefined = (x: unknown) => x === undefined;
// check for nil type. Either null or undefined
isOfType.nil = (x: unknown) => isOfType.null(x) || isOfType.undefined(x);
// check for strings and string literal type. e.g: 's', "s", `str`, new String()
isOfType.string = (x: unknown) => !isOfType.nil(x) && (typeof x === 'string' || x instanceof String);
// check for number or number literal type. e.g: 12, 30.5, new Number()
isOfType.number = (x: unknown) => !isOfType.nil(x) // NaN & Infinity have typeof "number" and this excludes that
    && ((!Number.isNaN(x) && Number.isFinite(x) && typeof x === 'number') || x instanceof Number);
// check for boolean or boolean literal type. e.g: true, false, new Boolean()
isOfType.boolean = (x: unknown) => !isOfType.nil(x) && (typeof x === 'boolean' || x instanceof Boolean);
// check for array type
isOfType.array = (x: unknown) => !isOfType.nil(x) && Array.isArray(x);
// check for object or object literal type. e.g: {}, new Object(), Object.create(null)
isOfType.object = (x: unknown) => ({}).toString.call(x) === '[object Object]';
// check for provided type instance
isOfType.type = (x: unknown, X: any) => !isOfType.nil(x) && x instanceof X;
// check for set type
isOfType.set = (x: unknown) => isOfType.type(x, Set);
// check for map type
isOfType.map = (x: unknown) => isOfType.type(x, Map);
// check for date type
isOfType.date = (x: unknown) => isOfType.type(x, Date);

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
