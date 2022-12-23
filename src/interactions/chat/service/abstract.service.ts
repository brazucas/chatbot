abstract class AbstractService {
  static instance: any;

  constructor() {
    AbstractService.instance = this;
  }

  static getInstance<T>(): T {
    if (!AbstractService.instance) {
      AbstractService.instance = new (<any> this.constructor)();
    }

    return AbstractService.instance;
  }
}

export default AbstractService;
