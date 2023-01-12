import fs from 'fs'


/** List all files in a directory */
export function listDir(dirname: string, showHidden = false) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err: Error | null, filenames: string[]) => {
      if (err) reject(err);
      else resolve(filenames.filter((n) => n[0] !== '.' || showHidden));
    });
  });
};

/** Read a file */
export function readFile(filename: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err: Error | null, data: Buffer | string) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

/** Write a file */
export function writeFile(filename: string, data: any) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filename, data, (err: Error | null) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
