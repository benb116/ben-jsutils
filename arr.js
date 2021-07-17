/* eslint-disable no-param-reassign */
const arr = {};

/* ARRAY FORM */

// Combine two arrays
arr.zip = function zip(a, a2) {
  return a.map((e, i) => [e, a2[i]]);
};

// Create object with keys and values
arr.objectify = function objectify(a, a2) {
  return a.reduce((o, k, i) => {
    o[k] = a2[i];
    return o;
  }, {});
};

// [[a,b], [c,d], [e,f]] <-> [[a,c,e], [b,d,f]]
arr.transpose = function transpose(a) {
  const d = a.length;
  const b = a[0].length;
  const c = [];
  for (let i = 0; i < b; i += 1) {
    c.push([]);
    for (let j = 0; j < d; j += 1) {
      c[i].push(a[j][i]);
    }
  }
  return c;
};

/* ARRAY MATH */

// Return the full sum of all elements in an array
arr.sum = function sum(a) {
  return a.reduce((total, num) => total + num);
};

// Return an array with the cumulative sum at each point
// e.g. a = [1, 2, 3, 4] -> out = [1, 3, 6, 10]
arr.cumsum = function cumsum(a) {
  const out = [];
  a.reduce((ea, eb, i) => {
    out[i] = ea + eb;
    return out[i];
  }, 0);
  return out;
};

// Returns a[i+1] - a[i]
arr.diff = function diff(a) {
  const a2 = a.slice();
  const b = a.slice();
  a2.shift();
  b.pop();
  return a2.map((e, i) => e - b[i]);
};

// Returns average of array values
arr.average = (nList) => (nList.reduce((avg, n) => avg + n, 0)) / nList.length;

// Return the min of an array and its index
arr.min = function min(a) {
  const mv = Math.min.apply(null, a);
  return [mv, a.indexOf(mv)];
};

// Return the max of an array and its index
arr.max = function max(a) {
  const mv = Math.max.apply(null, a);
  return [mv, a.indexOf(mv)];
};

// Return an array [0,1,2...n-1]
arr.nInts = function nInts(n) {
  return Array(n).fill().map((x, i) => i);
};

arr.linint = function linint(min, max, dx) {
  const n = Math.floor((max - min) / dx);
  return arr.nInts(n + 1).map((e) => e * dx + min);
};

arr.linspace = function linspace(min, max, n) {
  const diff = max - min;
  const dx = diff / (n - 1);
  return arr.nInts(n).map((e) => e * dx + min);
};

/* DEALING WITH ARRAY ELEMENTS */

// Remove an element from an array
// option to remove all instances of that element
arr.remove = function remove(a, member, all) {
  const b = a.slice(); // Splice mutates the array, this copies it
  if (all) {
    return b.filter((e) => e !== member);
  }
  return b.splice(b.indexOf(member));
};

// Does an array contain an element (return true or false)
arr.contains = function contains(a, e) { return (a.indexOf(e) > -1); };

// Returns all indices of an array where an element is located
arr.findAll = function findAll(a, e) {
  return arr.nInts(a.length).filter((i) => a[i] === e);
};

/* DO SOMETHING TO THE WHOLE ARRAY */

// Remove duplicates in an array
arr.uniquify = function uniquify(a) {
  return a.filter((e, i) => a.indexOf(e) === i);
};

// Return n random elements from an array (n defaults to 1)
arr.randEl = function randEl(a, n) {
  if (!n) { n = 1; }
  if (n === 1) {
    return a[Math.floor(Math.random() * a.length)];
  }
  const b = arr.shuffle(a);
  const out = b.slice(0, n);
  return out;
};

// Returns a random shuffling of an array (does not mutate)
// https://stackoverflow.com/a/2450976/1293256
arr.shuffle = function shuffle(a) {
  const array = a.slice();
  let currentIndex = array.length;
  let temporaryValue; let
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

// Reverse the order of an array ([1,2,3,4] => [4,3,2,1])
arr.reverse = function reverse(a) {
  const l = a.length;
  return a.map((e, i) => a[l - i - 1]);
};

// Sort an array and also return the sorted index array;
arr.sort2 = function sort2(a) {
  const list = [];
  const nEl = a.length;

  for (let j = 0; j < nEl; j += 1) {
    list.push({ s: a[j], n: j });
  }

  list.sort((b, c) => {
    if (b.s < c.s) return -1;
    if (b.s === c.s) return 0;
    return 1;
  });

  const s3 = new Array(nEl);
  const n3 = new Array(nEl);
  for (let k = 0; k < nEl; k += 1) {
    s3[k] = list[k].s;
    n3[k] = list[k].n;
  }
  return [s3, n3];
};

// Reorder the elements of an array using the given index order
// (Can be used with sort2 to sort one array based on how another was sorted)
arr.reorder = function reorder(a, inds) {
  const out = new Array(a.length);
  for (let i = 0; i < inds.length; i += 1) {
    out[inds[i]] = a[i];
  }
  return out;
};

// Filter an array based on a function that returns true/false
// Also return the indices of remaining elements
arr.filter2 = function filter2(a, fn) {
  const filta = [];
  const goodInd = [];
  for (let i = 0; i < a.length; i += 1) {
    if (fn(a[i], i)) {
      filta.push(a[i]);
      goodInd.push(i);
    }
  }
  return [filta, goodInd];
};

/* LOGICAL OPERATIONS */

// keep specific elements of an array based on a list of indices
// (Can be used with filter2 to filter one array based on how another was filtered)
arr.mask = function mask(a, inds) {
  const out = [];
  for (let i = inds.length - 1; i >= 0; i -= 1) {
    const ti = inds[i];
    out.push(a[ti]);
  }
  return out;
};

// remove specific elements of an array based on a list of indices
// (Can be used with filter2 to filter one array based on how another was filtered)
arr.invmask = function invmask(ar, inds) {
  const out = ar.slice();
  const sind = inds.sort((a, b) => a - b);
  // console.log(sind)
  for (let i = sind.length - 1; i >= 0; i -= 1) {
    const ti = sind[i];
    out.splice(ti, 1);
  }
  return out;
};

// Return all elements that are contained in all arrays
arr.intersection = function intersection(...args) {
  const arrs = Array.prototype.slice.call(args);
  const nA = arrs.length;
  const t = arrs[0];
  return t.filter((e) => {
    for (let i = 1; i < nA; i += 1) {
      if (!arr.contains(arrs[i], e)) { return false; }
    }
    return true;
  });
};

// Return all elements that are contained in any array
arr.union = function union(...args) {
  const arrs = Array.prototype.slice.call(args);
  return arr.uniquify(arrs.flat());
};

module.exports = arr;
