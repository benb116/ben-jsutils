/* ARRAY FORM */

// Combine two arrays
export function zip(a: any[], a2: any[]) {
  return a.map((e, i) => [e, a2[i]]);
};

// Create object with keys and values
export function objectify(a: any[], a2: any[]) {
  return a.reduce((o, k, i) => {
    o[k] = a2[i];
    return o;
  }, {});
};

// [[a,b], [c,d], [e,f]] <-> [[a,c,e], [b,d,f]]
export function transpose(a: any[]) {
  const d = a.length;
  const b = a[0].length;
  const c = new Array(b);
  for (let i = 0; i < b; i += 1) {
    c[i] = [];
    for (let j = 0; j < d; j += 1) {
      c[i].push(a[j][i]);
    }
  }
  return c;
};

/* ARRAY MATH */

// Return the full sum of all elements in an array
export function sum(a: number[]) {
  return a.reduce((total, num) => total + num);
};

// Return an array with the cumulative sum at each point
// e.g. a = [1, 2, 3, 4] -> out = [1, 3, 6, 10]
export function cumsum(a: number[]) {
  const out: number[] = [];
  a.reduce((ea: number, eb: number, i: number) => {
    const sum = ea + eb
    out[i] = sum;
    return sum;
  }, 0);
  return out;
};

// Returns a[i+1] - a[i]
export function diff(a: number[]) {
  const out: number[] = new Array(a.length - 1);
  for(let i = 1; i < a.length; i++) {
    const right = a[i]
    const left = a[i - 1]
    out[i-1] = (right && left) ? right - left : 0;
  }
  return out;
};

// Returns average of array values
export function average(nList: number[]) {
  return nList.reduce((avg, n) => avg + n, 0) / nList.length;
}

// Return the min of an array and its index
export function min(a: number[]) {
  const mv = Math.min.apply(null, a);
  return [mv, a.indexOf(mv)];
};

// Return the max of an array and its index
export function max(a: number[]) {
  const mv = Math.max.apply(null, a);
  return [mv, a.indexOf(mv)];
};

// Return an array [0,1,2...n-1]
export function nInts(n: number) {
  return Array(n).fill(undefined).map((_x, i) => i);
};

export function linint(min: number, max: number, dx: number) {
  const n = Math.floor((max - min) / dx);
  return Array(n).fill(undefined).map((_e, i) => i * dx + min);
};

export function linspace(min: number, max: number, n: number) {
  const diff = max - min;
  const dx = diff / (n - 1);
  return Array(n).fill(undefined).map((_e, i) => i * dx + min);
};

/* DEALING WITH ARRAY ELEMENTS */

// Remove an element from an array
// option to remove all instances of that element
export function remove(a: any[], member: any, all: boolean) {
  const b = a.slice(); // Splice mutates the array, this copies it
  if (all) {
    return b.filter((e) => e !== member);
  }
  return b.splice(b.indexOf(member));
};

// Does an array contain an element (return true or false)
export function contains(a: any[], e: any) { return (a.indexOf(e) > -1); };

// Returns all indices of an array where an element is located
export function findAll(a: any[], e: any) {
  return nInts(a.length).filter((i) => a[i] === e);
};

/* DO SOMETHING TO THE WHOLE ARRAY */

// Remove duplicates in an array
export function uniquify(a: any[]) {
  return a.filter((e, i) => a.indexOf(e) === i);
};

// Return n random elements from an array (n defaults to 1)
export function randEl(a: any[], n: number) {
  if (!n) { n = 1; }
  if (n === 1) {
    return a[Math.floor(Math.random() * a.length)];
  }
  const b = shuffle(a);
  const out = b.slice(0, n);
  return out;
};

// Returns a random shuffling of an array (does not mutate)
// https://stackoverflow.com/a/2450976/1293256
export function shuffle(a: any[]) {
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
export function reverse(a: any[]) {
  const l = a.length;
  return a.map((_e, i) => a[l - i - 1]);
};

// Sort an array and also return the sorted index array;
export function sort2(a: any[]) {
  const nEl = a.length;
  const list = new Array(nEl);

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
export function reorder(a: any[], inds: any[]) {
  const out = new Array(a.length);
  for (let i = 0; i < inds.length; i += 1) {
    out[inds[i]] = a[i];
  }
  return out;
};

// Filter an array based on a function that returns true/false
// Also return the indices of remaining elements
export function filter2(a: any[], fn: Function) {
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
export function mask(a: any[], inds: any[]) {
  const out = [];
  for (let i = inds.length - 1; i >= 0; i -= 1) {
    const ti = inds[i];
    out.push(a[ti]);
  }
  return out;
};

// remove specific elements of an array based on a list of indices
// (Can be used with filter2 to filter one array based on how another was filtered)
export function invmask(ar: any[], inds: any[]) {
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
export function intersection(...args: any[][]) {
  const arrs = Array.prototype.slice.call(args);
  const nA = arrs.length;
  const t = arrs[0];
  return t.filter((e: any) => {
    for (let i = 1; i < nA; i += 1) {
      if (!contains(arrs[i], e)) { return false; }
    }
    return true;
  });
};

// Return all elements that are contained in any array
export function union(...args: any[][]) {
  const arrs = Array.prototype.slice.call(args);
  return uniquify(arrs.flat());
};
