'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _base2.default {
  static get name() {
    return 'sample';
  }

  take() {
    return new Promise((resolve, reject) => {
      (0, _fs.readFile)('./test.jpg', (err, data) => {
        if (err) {
          reject(err.toString());
        } else {
          resolve(data);
        }
      });
    });
  }
};