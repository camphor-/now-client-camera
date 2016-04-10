'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDriver = getDriver;

var _imagesnap = require('./imagesnap');

var _imagesnap2 = _interopRequireDefault(_imagesnap);

var _raspistill = require('./raspistill');

var _raspistill2 = _interopRequireDefault(_raspistill);

var _sample = require('./sample');

var _sample2 = _interopRequireDefault(_sample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DRIVERS_LIST = [_imagesnap2.default, _raspistill2.default, _sample2.default];
const DRIVERS = (() => {
  const drivers = {};
  DRIVERS_LIST.forEach(d => drivers[d.name.toLowerCase()] = d);
  return drivers;
})();

function getDriver(name) {
  return DRIVERS[(name || '').toLowerCase().toLowerCase()] || _sample2.default;
}