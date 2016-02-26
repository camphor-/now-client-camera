export default class BaseDriver {
  constructor() {
    if (new.target === BaseDriver) { // eslint-disable-line
      throw new TypeError('Cannot instantiate BaseDriver class');
    }

    if (this.take === undefined) {
      throw new TypeError('Must override "take" method');
    }
  }
}
