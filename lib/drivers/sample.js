import {readFile} from 'fs';

export default class {
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
