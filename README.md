# now-client-camera

[![Build Status](https://travis-ci.org/camphor-/now-client-camera.svg?branch=master)](https://travis-ci.org/camphor-/now-client-camera)
[![Dependency Status](https://david-dm.org/camphor-/now-client-camera.svg)](https://david-dm.org/camphor-/now-client-camera)
[![devDependency Status](https://david-dm.org/camphor-/now-client-camera/dev-status.svg)](https://david-dm.org/camphor-/now-client-camera#info=devDependencies)

## Run
Examples:
- `npm start -- --driver=raspistill http://192.168.1.128:3000`
- `DEBUG=now-client-camera npm start -- --driver=sample http://192.168.1.128:3000`
- `npm start -- --driver=sample --authorization='Basic <token>' http://192.168.1.128:3000`

### Drivers
- `raspistill` - Raspberry Pi Camera Module
- `sample` - Sample JPEG image
