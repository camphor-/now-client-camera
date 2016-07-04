export default class BaseDriver {
  constructor() {
    if (new.target === BaseDriver) {
      throw new TypeError('Cannot instantiate BaseDriver class');
    }
  }
}
