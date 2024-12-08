const fs = require('fs');
const path = require('path');

const readJsonFile = (filePath) => {
  const fullPath = path.resolve(__dirname, filePath);
  return new Promise((resolve, reject) => {
    fs.readFile(fullPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        readJsonFile, // Register the task
      });

      // Always return the config object
      return config;
    },
    baseUrl: 'https://www.amazon.com',
  },
};
