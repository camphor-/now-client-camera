import {exec} from 'child_process';

import BaseDriver from './base';

const MAX_BUFFER = 1 * 1024 * 1024; // 1MiB
const WARM_UP_DURATION = 2; // 2 sec

export default class extends BaseDriver {
  static get name() {
    return 'imagesnap';
  }

  take() {
    return new Promise((resolve, reject) => {
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
  }
}
