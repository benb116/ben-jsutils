# ben-jsutils

My personal collection of useful JS utilities. Functions are broken down into categories:

* [Arrays](https://github.com/benb116/ben-jsutils/blob/master/src/arr.js)
* [Promises](https://github.com/benb116/ben-jsutils/blob/master/src/prom.js)
* [Functions](https://github.com/benb116/ben-jsutils/blob/master/src/fn.js)
* [Strings](https://github.com/benb116/ben-jsutils/blob/master/src/str.js)
* [Math](https://github.com/benb116/ben-jsutils/blob/master/src/math.js)
* [Dates](https://github.com/benb116/ben-jsutils/blob/master/src/date.js)
* [Requests](https://github.com/benb116/ben-jsutils/blob/master/src/req.js)
* [Buffers](https://github.com/benb116/ben-jsutils/blob/master/src/buf.js)
* [Filesystem](https://github.com/benb116/ben-jsutils/blob/master/src/fs.js)

There are some general use functions in the [main](https://github.com/benb116/ben-jsutils/blob/master/src/index.ts) file.

To import these functions, run
```javascript
import ben from 'ben-jsutils'
```

To use a function (for example, sort an array), run
```javascript
const arr1 = [4, 2, 3, 5, 7, 1];
const sorted = ben.arr.sort2(arr1); // [[1, 2, 3, 4, 5, 7], [5, 1, 2, 0, 3, 4]]
```