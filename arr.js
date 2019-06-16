var arr = {};

/* ARRAY FORM */

// Combine two arrays
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

// [[a,b], [c,d], [e,f]] <-> [[a,c,e], [b,d,f]]
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

/* ARRAY MATH */

// Return the full sum of all elements in an array
arr.sum = function(a) {
    return a.reduce(function(total, num) { return total + num; });
};

// Return an array with the cumulative sum at each point
// e.g. a = [1, 2, 3, 4] -> out = [1, 3, 6, 10]
arr.cumsum = function(a) {
    var out = [];
    a.reduce(function(ea,eb,i) { return out[i] = ea+eb; }, 0);
    return out;
};

// Returns a[i+1] - a[i]
arr.diff = function(a) {
    var a2 = a.slice();
    var b = a.slice();
    a2.shift();
    b.pop();
    return a2.map(function(e, i) {
        return e - b[i];
    });
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

arr.linint = function(min, max, dx) {
    var n = Math.floor((max - min) / dx);
    return arr.nInts(n+1).map(function(e) {
        return e*dx + min;
    });
};

arr.linspace = function(min, max, n) {
    var diff = max - min;
    var dx = diff / (n-1);
    return arr.nInts(n).map(function(e) {
        return e*dx + min;
    });
};

/* DEALING WITH ARRAY ELEMENTS */

// Remove an element from an array
// option to remove all instances of that element
arr.remove = function(a, member, all) {
    b = a.slice(); // Splice mutates the array, this copies it
    if (all) {
        return b.filter(function(e) { return e !== member; });
    } else {
        return b.splice(b.indexOf(member));
    }
};

// Does an array contain an element (return true or false)
arr.contains = function(a, e) { return (a.indexOf(e) > -1); };

// Returns all indices of an array where an element is located
arr.findAll = function(a, e) {
    return arr.nInts(a.length).filter(function(i) {
        return a[i] === e;
    });
};

/* DO SOMETHING TO THE WHOLE ARRAY */

// Remove duplicates in an array
arr.uniquify = function(a) {
    return a.filter(function(e, i) {
        return a.indexOf(e) === i;
    });
};

// Return n random elements from an array (n defaults to 1)
arr.randEl = function(a, n) {
    if (!n) { n = 1; }
    if (n === 1) {
        return a[Math.floor(Math.random()*a.length)];
    }
    var b = arr.shuffle(a);
    var out = b.slice(0, n);
    return out;
};

// Returns a random shuffling of an array (does not mutate)
// https://stackoverflow.com/a/2450976/1293256
arr.shuffle = function(a) {
    var array = a.slice();
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
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
arr.reverse = function(a) {
    var l = a.length;
    return a.map(function(e, i) {
        return a[l-i-1];
    });
};

// Sort an array and also return the sorted index array;
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

/* LOGICAL OPERATIONS */

// keep specific elements of an array based on a list of indices
// (Can be used with filter2 to filter one array based on how another was filtered)
arr.mask = function(a, inds) {
    var out = [];
    for (var i = inds.length - 1; i >= 0; i--) {
        var ti = inds[i];
        out.push(a[ti]);
    }
    return out;
};

// remove specific elements of an array based on a list of indices
// (Can be used with filter2 to filter one array based on how another was filtered)
arr.invmask = function(a, inds) {
    var out = a.slice();
    var sind = inds.sort(function(a,b) {return a - b;});
    // console.log(sind)
    for (var i = sind.length - 1; i >= 0; i--) {
        var ti = sind[i];
        out.splice(ti, 1);
    }
    return out;
};

// Return all elements that are contained in all arrays
arr.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    var nA = args.length;
    var t = args[0];
    return t.filter(function(e) {
        for (var i = 1; i < nA; i++) {
            if (!arr.contains(args[i], e)) { return false; }
        }
        return true;
    });
};

// Return all elements that are contained in any array
arr.union = function() {
    var args = Array.prototype.slice.call(arguments);
    return arr.uniquify(args.flat());
};

module.exports = arr;