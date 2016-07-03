'use strict';

var _yargs = require('yargs');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _utils = require('./drivers/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants
var NAMESPACE = '/camera';

// Logger
var debug = (0, _debug2.default)('now-client-camera');

var url = _yargs.argv._[0] || 'http://localhost:3000';
var driverClass = (0, _utils.getDriver)(_yargs.argv.driver);
var driver = new driverClass();
var authorization = _yargs.argv.authorization;

// Start
debug('Server URL: ' + url);
debug('Namespace: ' + NAMESPACE);
debug('Driver: ' + driverClass.name);

var extraHeaders = {};
if (authorization) {
  extraHeaders.Authorization = authorization;
}

var socket = (0, _socket2.default)('' + url + NAMESPACE, {
  extraHeaders: extraHeaders
});

socket.on('connect', function () {
  debug('connected');
});

socket.on('disconnect', function () {
  debug('disconnected');
});

socket.on('take picture', function (data) {
  debug('take picture');
  var responseEvent = data.responseEvent;
  driver.take().then(function (pictureData) {
    debug('success');
    socket.emit(responseEvent, {
      success: true,
      data: pictureData
    });
  }, function (errorMessage) {
    debug('error: ' + errorMessage);
    socket.emit(responseEvent, {
      success: false,
      message: errorMessage
    });
  });
});