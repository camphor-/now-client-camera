'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseDriver = function BaseDriver() {
  _classCallCheck(this, BaseDriver);

  if (new.target === BaseDriver) {
    throw new TypeError('Cannot instantiate BaseDriver class');
  }

  if (this.take === undefined) {
    throw new TypeError('Must override "take" method');
  }
};

exports.default = BaseDriver;