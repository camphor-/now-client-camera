'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require('child_process');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAX_BUFFER = 1 * 1024 * 1024; // 1MiB
const WARM_UP_DURATION = 2; // 2 sec

exports.default = class extends _base2.default {
  static get name() {
    return 'imagesnap';
  }

  take() {
    return new Promise((resolve, reject) => {
      (0, _child_process.exec)(`imagesnap -w ${ WARM_UP_DURATION } -`, {
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
};