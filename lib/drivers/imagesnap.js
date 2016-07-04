'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _child_process = require('child_process');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_BUFFER = 1 * 1024 * 1024; // 1MiB
var WARM_UP_DURATION = 2; // 2 sec

var _class = function (_BaseDriver) {
  _inherits(_class, _BaseDriver);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'take',
    value: function take() {
      return new Promise(function (resolve, reject) {
        (0, _child_process.exec)('imagesnap -w ' + WARM_UP_DURATION + ' -', {
          encoding: 'buffer',
          maxBuffer: MAX_BUFFER
        }, function (err, stdout) {
          if (err === null) {
            resolve(stdout);
          } else {
            reject(err.toString());
          }
        });
      });
    }
  }], [{
    key: 'name',
    get: function get() {
      return 'imagesnap';
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;