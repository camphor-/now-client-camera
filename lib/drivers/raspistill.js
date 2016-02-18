import {exec} from 'child_process';

const MAX_BUFFER = 1 * 1024 * 1024; // 1MiB

export default () => new Promise((resolve, reject) => {
  exec('raspistill -w 320 -h 240 -n -e jpg -o -', {
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
