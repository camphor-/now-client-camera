import {argv} from 'yargs';
import debugLogger from 'debug';
import io from 'socket.io-client';

import {getDriver} from './drivers/utils';

// Constants
const NAMESPACE = '/camera';

// Logger
const debug = debugLogger('now-client-camera');

const url = argv._[0] || 'http://localhost:3000';
const driverClass = getDriver(argv.driver);
const driver = new driverClass();
const authorization = argv.authorization;

// Start
debug(`Server URL: ${url}`);
debug(`Namespace: ${NAMESPACE}`);
debug(`Driver: ${driverClass.name}`);

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
  driver.take().then(
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
