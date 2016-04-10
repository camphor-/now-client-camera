'use strict';

var _yargs = require('yargs');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _utils = require('./drivers/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants
const NAMESPACE = '/camera';

// Logger
const debug = (0, _debug2.default)('now-client-camera');

const url = _yargs.argv._[0] || 'http://localhost:3000';
const driverClass = (0, _utils.getDriver)(_yargs.argv.driver);
const driver = new driverClass();
const authorization = _yargs.argv.authorization;

// Start
debug(`Server URL: ${ url }`);
debug(`Namespace: ${ NAMESPACE }`);
debug(`Driver: ${ driverClass.name }`);

const extraHeaders = {};
if (authorization) {
  extraHeaders.Authorization = authorization;
}

const socket = (0, _socket2.default)(`${ url }${ NAMESPACE }`, {
  extraHeaders: extraHeaders
});

socket.on('connect', () => {
  debug('connected');
});

socket.on('disconnect', () => {
  debug('disconnected');
});

socket.on('take picture', data => {
  debug('take picture');
  const responseEvent = data.responseEvent;
  driver.take().then(pictureData => {
    debug('success');
    socket.emit(responseEvent, {
      success: true,
      data: pictureData
    });
  }, errorMessage => {
    debug(`error: ${ errorMessage }`);
    socket.emit(responseEvent, {
      success: false,
      message: errorMessage
    });
  });
});