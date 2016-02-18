import {exec} from 'child_process';

const MAX_BUFFER = 1 * 1024 * 1024; // 1MiB

const parseInteger = (string, defaultValue) => {
  const number = Number(string);
  if (Number.isInteger(number)) {
    return number;
  } else {
    return defaultValue;
  }
};

const WIDTH = parseInteger(process.env.RASPISTILL_WIDTH, 320);
const HEIGHT = parseInteger(process.env.RASPISTILL_HEIGHT, 240);

export default () => new Promise((resolve, reject) => {
  exec(`raspistill -w ${WIDTH} -h ${HEIGHT} -n -e jpg -o -`, {
    encoding: 'buffer',
    maxBuffer: MAX_BUFFER
  }, (err, stdout, stderr) => {
    if (err === null) {
      resolve(stdout);
    } else {
      reject(err.toString());
    }
  });
});
