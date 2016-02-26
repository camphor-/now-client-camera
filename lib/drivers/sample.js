import {readFile} from 'fs';

import BaseDriver from './base';

export default class extends BaseDriver {
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
