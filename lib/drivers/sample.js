import {readFile} from 'fs';

export default () => new Promise((resolve, reject) => {
  readFile('./test.jpg', (err, data) => {
    if (err) {
      reject(err.toString());
    } else {
      resolve(data);
    }
  });
});
