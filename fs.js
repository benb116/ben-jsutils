var ben_fs = {};

var fs;

// make Promise version of fs.readdir()
ben_fs.listDir = function(dirname) {
    fs = require('fs');
    return new Promise(function(resolve, reject) {
        fs.readdir(dirname, function(err, filenames){
            if (err) reject(err); 
            else resolve(filenames.filter(n => n[0] !== '.'));
        });
    });
};

ben_fs.readFile = function(filename, enc) {
    fs = require('fs');
    enc = enc || 'utf8';
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, enc, function(err, data){
            if (err) reject(err); 
            else resolve(data);
        });
    });
};

ben_fs.writeFile = function(filename, data) {
    fs = require('fs');
    return new Promise(function(resolve, reject) {
        fs.writeFile(filename, data, function (err) {
            if (err) reject(err); 
            else resolve();
        });
    });
};

module.exports = ben_fs;