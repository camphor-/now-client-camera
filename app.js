import {argv} from 'yargs';
import debugLogger from 'debug';
import io from 'socket.io-client';

import imagesnap from './lib/drivers/imagesnap';
import raspistill from './lib/drivers/raspistill';
import sampleFile from './lib/drivers/sample';

// Constants
const NAMESPACE = '/camera';

// Logger
const debug = debugLogger('now-client-camera');

// Parse command line arguments
let parseDriver = (driver) => {
  const _driver = (driver || '').toLowerCase();
  switch (_driver) {
  case 'raspistill':
    return _driver;
  case 'imagesnap':
    return _driver;
  case 'sample':
    return _driver;
  default:
    return 'sample';
  }
};

const url = argv._[0] || 'http://localhost:3000';
const driver = parseDriver(argv.driver);
const authorization = argv.authorization;

// Start
debug(`Server URL: ${url}`);
debug(`Namespace: ${NAMESPACE}`);
debug(`Driver: ${driver}`);

const extraHeaders = {};
if (authorization) {
  extraHeaders.Authorization = authorization;
}

const socket = io(`${url}${NAMESPACE}`, {
  extraHeaders: extraHeaders
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
  (() => {
    switch (driver) {
    case 'imagesnap':
      return imagesnap;
    case 'sample':
      return sampleFile;
    case 'raspistill':
      return raspistill;
    default:
      return sampleFile;
    }
  })()().then(
    (pictureData) => {
      debug('success');
      socket.emit(responseEvent, {
        success: true,
        data: pictureData
      });
    },
    (errorMessage) => {
      debug(`error: ${errorMessage}`);
      socket.emit(responseEvent, {
        success: false,
        message: errorMessage
      });
    }
  );
});
