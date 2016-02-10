import {argv} from 'yargs';
import debugLogger from 'debug';
import {execSync} from 'child_process';
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
  const picture = execSync('raspistill -w 320 -h 240 -n -e jpg -o -');
  socket.emit(responseEvent, {
    success: true,
    data: picture
  });
});
