import {argv} from 'yargs';
import debugLogger from 'debug';
import {execSync} from 'child_process';
import {readFile} from 'fs';
import io from 'socket.io-client';

// Constants
const NAMESPACE = '/camera';

// Logger
const debug = debugLogger('application');

// Parse command line arguments
let parseMode = (mode) => {
  const _mode = (mode || '').toLowerCase();
  switch (_mode) {
  case 'raspistill':
    return _mode;
  case 'sample':
    return _mode;
  default:
    return 'sample'
  }
};

const url = argv._[0] || 'http://localhost:3000';
const mode = parseMode(argv.mode);

// Start
debug(`Server URL: ${url}`);
debug(`Namespace: ${NAMESPACE}`);
debug(`Mode: ${mode}`);

const socket = io(`${url}${NAMESPACE}`);

socket.on('connect', () => {
  debug('connected');
});

socket.on('disconnect', () => {
  debug('disconnected');
});

let raspistill = (responseEvent) => {
  try {
    const picture = execSync('raspistill -w 320 -h 240 -n -e jpg -o -');
    debug('success');
    socket.emit(responseEvent, {
      success: true,
      data: picture
    });
  } catch (e) {
    const message = e.toString();
    debug(`error: ${message}`);
    socket.emit(responseEvent, {
      success: false,
      message: message
    });
  }
};

let sampleFile = (responseEvent) => {
  readFile('./test.jpg', (err, data) => {
    if (err) {
      socket.emit(responseEvent, {
        success: false,
        message: err.toString()
      });
      return;
    }
    socket.emit(responseEvent, {
      success: true,
      data: data
    });
  });
};

socket.on('take picture', (data) => {
  debug('take picture');
  const responseEvent = data.responseEvent;
  switch (mode) {
  case 'sample':
    sampleFile(responseEvent);
    break;
  case 'raspistill':
    raspistill(responseEvent);
    break;
  default:
    sampleFile(responseEvent);
    break;
  }
});
