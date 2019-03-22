var arr = {};

arr.zip = function(arr, arr2) {
    return arr.map(function(e, i) {
        return [e, arr2[i]];
    });
};

arr.objectify = function(arr, arr2) {
    return arr.reduce(function(o, k, i) {
        o[k] = arr2[i];
        return o;
    }, {}); 
};

arr.sum = function(arr) {
    return arr.reduce(function(total, num) { return total + num; });
};

arr.remove = function(arr, member) {
    var index = arr.indexOf(member);
    if (index > -1) { arr.splice(index, 1); }
    return arr;
};

arr.uniquify = function(arr) {
    return arr.filter(function(e, i) {
        return arr.indexOf(e) === i;
    });
};

arr.transpose = function(arr) {
    var a = arr.length;
    var b = arr[0].length;
    var c = [];
    for (var i = 0; i < b; i++) {
        c.push([]);
        for (var j = 0; j < a; j++) {
            c[i].push(arr[j][i]);
        }
    }
    return c;
};

arr.min = function(arr) {
    return Math.min.apply(null, arr);
};

arr.max = function(arr) {
    return Math.max.apply(null, arr);
};

// Sort an array and also return the sorted index list;
arr.sort2 = function(arr) {
    var list = [];
    var nEl = arr.length;

    for (var j = 0; j < nEl; j++) {
        list.push({'s': arr[j], 'n': j});
    }

    list.sort(function(a, b) {
        return ((a.s < b.s) ? -1 : ((a.s == b.s) ? 0 : 1));
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
arr.reorder = function(arr, inds) {
    var outarr = new Array(arr.length);
    for (var i = 0; i < inds.length; i++) {
        outarr[inds[i]] = arr[i];
    }
    return outarr;
};

// chainProm executes a set of promises sequentially
// chainProm is run on an array of promises or non-promises
// The zeroth promise resolves as init
// chainProm makes the resolved or rejected values of the previous promise available to a given function
// That function(genF for resolved and catchF for rejected) is also passed the current array element and index
// That function should then return a promise that gets chained and is used for the next iteration
arr.chainProm = function(arr, init, genF, catchF) {
    var x = arr.reduce(function(prev, cur, i) {
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