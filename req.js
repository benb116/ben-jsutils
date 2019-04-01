var req = {};

var request;
var rp;

function loadRP() {
    request = require('request');
    rp = require('request-promise');
}

// This function returns a request promise nested within an outer promise.
// The inner promise is the request promise that returns the raw data from the request
// The inner promise is then'ed with the success function and "then" arguments or catch'ed with the fail function
// The outer promise wraps the inner function and it's then/catch
// The outer promise resolves with the manipulated and formatted data or rejects with the error
req.reqProm = function(type, url, head, form, thenF, catchF, thenArg) {
    var innerPromise;
    if (type === 0 || type.toUpperCase() === 'GET') {
        innerPromise = req.get(url, head, form);
    } else {
        innerPromise = req.post(url, head, form);
    }

    var outerPromise = new Promise(function(resolve, reject) {
        innerPromise.then(function(body) {
            resolve(thenF(body, thenArg));
        }).catch(function(err) {
            reject(catchF(err));
        });
    });

    return outerPromise;
};

req.postHeaders = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Host": "",
    "Origin": "",
    "Pragma": "no-cache",
    "Referer": "",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
};

req.getHeaders = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Host": "",
    "Referer": "",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
};

// Turn an object's keys & values into a uri query
req.querify = function(inJSON) {
    if (!inJSON) {return '';}
    var qString = Object.keys(inJSON).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(inJSON[key]);
    }).join('&');
    return qString;
};

// Returns a promise for a POST request with headers and formData
req.post = function(url, headers, formData) {
    loadRP();
    var POSTHead = Object.assign(req.postHeaders, headers);
    POSTHead['Content-Length'] = req.querify(formData).length;
    var options = {
        method: 'POST',
        uri: url,
        form: formData,
        headers: POSTHead,
        json: true // Automatically stringifies the body to JSON
    };
    return rp(options);
};

// Returns a promise for a GET request with headers and querys
req.get = function(url, headers, form) {
    loadRP();
    var GETHead = Object.assign(req.getHeaders, headers);
    var qString = '';
    if (form) {qString = '?'+req.querify(form);}

    var options = {
        method: 'GET',
        uri: url+qString,
        headers: GETHead,
        json: true // Automatically stringifies the body to JSON
    };
    return rp(options);
};

module.exports = req;