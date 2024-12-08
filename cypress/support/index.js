const fs = require('fs');
const path = require('path');

export default (on, config) => {
  on('task', {
    readJsonFile(filePath) {
      const fullPath = path.resolve(__dirname, '..', filePath);
      return new Promise((resolve, reject) => {
        fs.readFile(fullPath, 'utf8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
        });
      });
    },
  });

  return config; // Important: Return the config object
};