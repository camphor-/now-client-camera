const ImagesnapDriver = require('./imagesnap');
const RaspistillDriver = require('./raspistill');
const SampleDriver = require('./sample');

const DRIVERS_LIST = [ImagesnapDriver, RaspistillDriver, SampleDriver];
const DRIVERS = (() => {
  const drivers = {};
  for (const d of DRIVERS_LIST) {
    drivers[d.name.toLowerCase()] = d;
  }
  return drivers;
})();

function getDriver(name) {
  return DRIVERS[(name || '').toLowerCase().toLowerCase()] || SampleDriver;
}

module.exports = {
  getDriver,
};
