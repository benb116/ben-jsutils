# ben-jsutils

My personal collection of useful JS utilities. Functions are broken down into categories:

* [Arrays](https://github.com/benb116/ben-jsutils/blob/master/arr.js)
* [Promises](https://github.com/benb116/ben-jsutils/blob/master/prom.js)
* [Functions](https://github.com/benb116/ben-jsutils/blob/master/fn.js)
* [Strings](https://github.com/benb116/ben-jsutils/blob/master/str.js)
* [Math](https://github.com/benb116/ben-jsutils/blob/master/math.js)
* [Dates](https://github.com/benb116/ben-jsutils/blob/master/date.js)
* [Requests](https://github.com/benb116/ben-jsutils/blob/master/req.js)

There are some general use functions in the [main](https://github.com/benb116/ben-jsutils/blob/master/index.js) file.

To import these functions, run
```javascript
var ben = require('ben-jsutils');
```

To use a function (for example, sort an array), run
```javascript
var arr1 = [4, 2, 3, 5, 7, 1];
var sorted = ben.arr.sort2(arr1); // [[1, 2, 3, 4, 5, 7], [5, 1, 2, 0, 3, 4]]
```