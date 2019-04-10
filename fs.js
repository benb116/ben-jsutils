var fs = {};

var fsm;

// make Promise version of fs.readdir()
fs.listDir = function(dirname) {
    fsm = require('fs');
    return new Promise(function(resolve, reject) {
        fsm.readdir(dirname, function(err, filenames){
            if (err) reject(err); 
            else resolve(filenames);
        });
    });
};

// utility function, return Promise
fs.readFile = function(filename, enc) {
    fsm = require('fs');
    enc = enc || 'utf8';
    return new Promise(function(resolve, reject) {
        fsm.readFile(filename, enc, function(err, data){
            if (err) reject(err); 
            else resolve(data);
        });
    });
};

fs.writeFile = function(filename, data) {
    fsm = require('fs');
    return new Promise(function(resolve, reject) {
        fs.writeFile(filename, data, function (err) {
            if (err) reject(err); 
            else resolve();
        });
    });
};

module.exports = fs;