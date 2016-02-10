import {argv} from 'yargs';
import debugLogger from 'debug';
import fs from 'fs';
import io from 'socket.io-client';

const debug = debugLogger('application');

const NAMESPACE = '/camera';

const url = argv._[0] || 'http://localhost:3000';

debug(`Server URL: ${url}`);
debug(`Namespace: ${NAMESPACE}`);

const socket = io(`${url}${NAMESPACE}`);

socket.on('connect', () => {
  debug('connected');
});

socket.on('disconnect', () => {
  debug('disconnected');
});

socket.on('take picture', (data) => {
  debug('take picture');
  const responseEvent = data.responseEvent;

  // TODO: Take a picture w/ Raspberry Pi
  fs.readFile('./test.jpg', (err, data) => {
    if (err) {
      socket.emit(responseEvent, {
        success: false
      });
      return;
    }

    socket.emit(responseEvent, {
      success: true
    });
  });
});
