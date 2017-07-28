const { readFile } = require('fs');

const BaseDriver = require('./base');

class SampleDriver extends BaseDriver {
  static get name() {
    return 'sample';
  }

  take() {
    return new Promise((resolve, reject) => {
      readFile('./test.jpg', (err, data) => {
        if (err) {
          reject(err.toString());
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = SampleDriver;
