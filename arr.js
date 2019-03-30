var arr = {};

arr.zip = function(a, a2) {
    return a.map(function(e, i) {
        return [e, a2[i]];
    });
};

// Create object with keys and values
arr.objectify = function(a, a2) {
    return a.reduce(function(o, k, i) {
        o[k] = a2[i];
        return o;
    }, {}); 
};

arr.sum = function(a) {
    return a.reduce(function(total, num) { return total + num; });
};

// remove an element from an array
// option to remove all instances of that element
arr.remove = function(a, member, all) {
    b = a.slice(); // Splice mutates the array, this copies it
    if (all) {
        return b.filter(function(e) { return e !== member; });
    } else {
        var index = b.indexOf(member);
        b.splice(index, 1);
        return b;
    }
};

arr.contains = function(a, e) { return (a.indexOf(e) > -1); };

// Remove duplicates in an array
arr.uniquify = function(a) {
    return a.filter(function(e, i) {
        return a.indexOf(e) === i;
    });
};

// [[a,b], [c,d], [e,f]] -> [[a,c,e], [b,d,f]]
arr.transpose = function(a) {
    var d = a.length;
    var b = a[0].length;
    var c = [];
    for (var i = 0; i < b; i++) {
        c.push([]);
        for (var j = 0; j < d; j++) {
            c[i].push(a[j][i]);
        }
    }
    return c;
};

// Return the min of an array and its index
arr.min = function(a) {
    var mv = Math.min.apply(null, a);
    return [mv, a.indexOf(mv)];
};

// Return the max of an array and its index
arr.max = function(a) {
    var mv = Math.max.apply(null, a);
    return [mv, a.indexOf(mv)];
};

// Return an array [0,1,2...n-1]
arr.nInts = function(n) {
    return Array.apply(null, {length: n}).map(Function.call, Number);
};

// Sort an array and also return the sorted index list;
arr.sort2 = function(a) {
    var list = [];
    var nEl = a.length;

    for (var j = 0; j < nEl; j++) {
        list.push({'s': a[j], 'n': j});
    }

    list.sort(function(b, c) {
        return ((b.s < c.s) ? -1 : ((b.s == c.s) ? 0 : 1));
    });

    s3 = new Array(nEl);
    n3 = new Array(nEl);
    for (var k = 0; k < nEl; k++) {
        s3[k] = list[k].s;
        n3[k] = list[k].n;
    }
    return [s3, n3];
};

// Reorder the elements of an array using the given index order
// (Can be used with sort2 to sort one array based on how another was sorted)
arr.reorder = function(a, inds) {
    var out = new Array(a.length);
    for (var i = 0; i < inds.length; i++) {
        out[inds[i]] = a[i];
    }
    return out;
};

// Filter an array based on a function that returns true/false
// Also return the indices of remaining elements
arr.filter2 = function(a, fn) {
    var filta = [];
    var goodInd = [];
    for (var i = 0; i < a.length; i++) {
        if (fn(a[i], i)) {
            filta.push(a[i]);
            goodInd.push(i);
        }
    }
    return [filta, goodInd];
};

// keep specific elements of an array based on a list of indices
// (Can be used with filter2 to filter one array based on how another was filtered)
arr.mask = function(a, inds) {
    return a.filter(function(e, i) {
        return arr.contains(inds, i);
    });
};

// remove specific elements of an array based on a list of indices
// (Can be used with filter2 to filter one array based on how another was filtered)
arr.invmask = function(a, inds) {
    return a.filter(function(e, i) {
        return !arr.contains(inds, i);
    });
};

arr.intersection = function(a1, a2) {
    a1.filter(function(n) {
        return a2.indexOf(n) !== -1;
    });
};

arr.union = function() {
    var args = Array.prototype.slice.call(arguments);
    return arr.uniquify(args.flat());
};

// chainProm executes a set of promises sequentially
// chainProm is run on an array of promises or non-promises
// The zeroth promise resolves as init
// chainProm makes the resolved or rejected values of the previous promise available to a given function
// That function(genF for resolved and catchF for rejected) is also passed the current array element and index
// That function should then return a promise that gets chained and is used for the next iteration
arr.chainProm = function(a, init, genF, catchF) {
    var x = a.reduce(function(prev, cur, i) {
        return prev.then(function(r) {
            // Promise generating functions take the previously returned value, the current value, and the current index
            return genF(r, cur, i);
        }).catch(function(e) {
            return catchF(e, cur, i);
        });
    }, Promise.resolve(init));
    return x;
};

module.exports = arr;