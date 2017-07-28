const { exec } = require('child_process');

const BaseDriver = require('./base');

const MAX_BUFFER = 1 * 1024 * 1024; // 1MiB

const parseInteger = (string, defaultValue) => {
  const number = Number(string);
  if (!Number.isInteger(number)) {
    return defaultValue;
  }
  return number;
};

const WIDTH = parseInteger(process.env.RASPISTILL_WIDTH, 320);
const HEIGHT = parseInteger(process.env.RASPISTILL_HEIGHT, 240);

class RaspistillDriver extends BaseDriver {
  static get name() {
    return 'raspistill';
  }

  take() {
    return new Promise((resolve, reject) => {
      exec(`raspistill -w ${WIDTH} -h ${HEIGHT} -n -e jpg -o -`, {
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

module.exports = RaspistillDriver;
