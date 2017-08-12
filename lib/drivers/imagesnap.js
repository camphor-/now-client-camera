const { exec } = require('child_process');

const BaseDriver = require('./base');

const MAX_BUFFER = 1 * 1024 * 1024; // 1MiB
const WARM_UP_DURATION = 2; // 2 sec

class ImagesnapDriver extends BaseDriver {
  static get name() {
    return 'imagesnap';
  }

  take() {
    return new Promise((resolve, reject) => {
      exec(`imagesnap -w ${WARM_UP_DURATION} -`, {
        encoding: 'buffer',
        maxBuffer: MAX_BUFFER,
      }, (err, stdout) => {
        if (err === null) {
          resolve(stdout);
        } else {
          reject(err.toString());
        }
      });
    });
  }
}

module.exports = ImagesnapDriver;
