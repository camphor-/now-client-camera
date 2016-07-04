import ImagesnapDriver from './imagesnap';
import RaspistillDriver from './raspistill';
import SampleDriver from './sample';

const DRIVERS_LIST = [ImagesnapDriver, RaspistillDriver, SampleDriver];
const DRIVERS = (() => {
  const drivers = {};
  for (const d of DRIVERS_LIST) {
    drivers[d.name.toLowerCase()] = d;
  }
  return drivers;
})();

export function getDriver(name) {
  return DRIVERS[(name || '').toLowerCase().toLowerCase()] || SampleDriver;
}
