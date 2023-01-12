const fs = require('fs');

// make Promise version of fs.readdir()
export function listDir(dirname: string) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err: Error, filenames: string[]) => {
      if (err) reject(err);
      else resolve(filenames.filter((n) => n[0] !== '.'));
    });
  });
};

export function readFile(filename: string, enc = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, enc, (err: Error, data: string) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

export function writeFile(filename: string, data: any) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filename, data, (err: Error) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
