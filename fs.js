const benFS = {};

const fs = require('fs');

// make Promise version of fs.readdir()
benFS.listDir = function listDir(dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) => {
      if (err) reject(err);
      else resolve(filenames.filter((n) => n[0] !== '.'));
    });
  });
};

benFS.readFile = function readFile(filename, enc = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, enc, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

benFS.writeFile = function writeFile(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = benFS;
