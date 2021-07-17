const logTimeStamp = require('log-timestamp');

// A collection of useful functions
const ben = {};
ben.arr = require('./arr');
ben.prom = require('./prom');
ben.fn = require('./fn');
ben.str = require('./str');
ben.date = require('./date');
ben.math = require('./math');
ben.req = require('./req');
ben.buf = require('./buf');
ben.fs = require('./fs');

// Pause for a certain number of ms, CODE BLOCKING
ben.syncWait = function syncWait(ms) {
  const start = Date.now();
  let now = start;
  while (now - start < ms) { now = Date.now(); }
};

// Prepends a timestamp string to each console.log statement
// 2019-04-10T20:39:19.023Z1554928759023Q ({date}T{time}Z{timestamp}Q)
// Truthy argument will shift to local time
ben.logTS = function logTS(shift = 0) {
  const tzoffset = (new Date()).getTimezoneOffset() * 60000 * shift; // offset in milliseconds
  logTimeStamp(() => `${(new Date(Date.now() - tzoffset)).toISOString() + (Date.now())}Q %s`);
};

// https://github.com/beforesemicolon/javascript-solutions/blob/main/type%20check
ben.isOfType = (() => {
  // create a plain object with no prototype
  const type = Object.create(null);

  // check for null type
  type.null = (x) => x === null;
  // check for undefined type
  type.undefined = (x) => x === undefined;
  // check for nil type. Either null or undefined
  type.nil = (x) => type.null(x) || type.undefined(x);
  // check for strings and string literal type. e.g: 's', "s", `str`, new String()
  type.string = (x) => !type.nil(x) && (typeof x === 'string' || x instanceof String);
  // check for number or number literal type. e.g: 12, 30.5, new Number()
  type.number = (x) => !type.nil(x) // NaN & Infinity have typeof "number" and this excludes that
      && ((!Number.isNaN(x) && Number.isFinite(x) && typeof x === 'number') || x instanceof Number);
  // check for boolean or boolean literal type. e.g: true, false, new Boolean()
  type.boolean = (x) => !type.nil(x) && (typeof x === 'boolean' || x instanceof Boolean);
  // check for array type
  type.array = (x) => !type.nil(x) && Array.isArray(x);
  // check for object or object literal type. e.g: {}, new Object(), Object.create(null)
  type.object = (x) => ({}).toString.call(x) === '[object Object]';
  // check for provided type instance
  type.type = (x, X) => !type.nil(x) && x instanceof X;
  // check for set type
  type.set = (x) => type.type(x, Set);
  // check for map type
  type.map = (x) => type.type(x, Map);
  // check for date type
  type.date = (x) => type.type(x, Date);

  return type;
})();

module.exports = ben;
