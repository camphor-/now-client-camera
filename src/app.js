const { argv } = require('yargs');
const debugLogger = require('debug');
const io = require('socket.io-client');

const { getDriver } = require('./drivers/utils');

// Constants
const NAMESPACE = '/camera';

// Logger
const debug = debugLogger('now-client-camera');

const url = argv._[0] || 'http://localhost:3000';
const DriverClass = getDriver(argv.driver);
const driver = new DriverClass();
const authorization = argv.authorization;

// Start
debug(`Server URL: ${url}`);
debug(`Namespace: ${NAMESPACE}`);
debug(`Driver: ${DriverClass.name}`);

const extraHeaders = {};
if (authorization) {
  extraHeaders.Authorization = authorization;
}

const socket = io(`${url}${NAMESPACE}`, {
  extraHeaders,
});

socket.on('connect', () => {
  debug('connected');
});

socket.on('disconnect', () => {
  debug('disconnected');
});

socket.on('take picture', (data) => {
  debug('take picture');
  const responseEvent = data.responseEvent;
  driver.take().then(
    (pictureData) => {
      debug('success');
      socket.emit(responseEvent, {
        success: true,
        data: pictureData,
      });
    },
    (errorMessage) => {
      debug(`error: ${errorMessage}`);
      socket.emit(responseEvent, {
        success: false,
        message: errorMessage,
      });
    }
  );
});
