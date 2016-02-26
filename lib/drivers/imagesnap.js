import {exec} from 'child_process';

const MAX_BUFFER = 1 * 1024 * 1024; // 1MiB
const WARM_UP_DURATION = 2; // 2 sec

export default () => new Promise((resolve, reject) => {
  exec(`imagesnap -w ${WARM_UP_DURATION} -`, {
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
