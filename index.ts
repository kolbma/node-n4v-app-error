import * as util from 'util';

// instanceof is broken when class extends Error type
// https://github.com/Microsoft/TypeScript/issues/13965

export class AppError extends Error {
  // tslint:disable-next-line:variable-name
  __proto__: Error;

  constructor(arg1?: string | Error, ...params: any[]) {
    const INSTANCE_PROTO = new.target.prototype;
    let message;
    if (arg1 && typeof (arg1) === 'string') {
      message = arg1;
      if (params.length > 0) {
        message = util.format(message, ...params);
      }
    } else if (arg1 && arg1 instanceof Error) {
      if (params.length > 1) {
        message = util.format(params[0], ...(params.slice(1)));
      } else {
        message = params[0];
      }
      message += ' (caused by: ' + arg1.message + ')';
    } else if (typeof arg1 === 'object') {
      message = new Error(JSON.stringify(arg1));
    } else {
      try {
        message = new Error(arg1.toString());
      } catch (err) {
      }
    }
    if (message) {
      super(message);
    } else {
      super();
    }
    this.__proto__ = INSTANCE_PROTO;
    if (arg1 instanceof Error) {
      this.stack += ' (caused by: ' + arg1.stack + ')';
    }
    this.name = 'AppError';
    if (this.message.startsWith('Error: ')) {
      if (params.length > 1) {
        this.message = util.format(params[0], ...(params.slice(1))) + ' (caused by: ' + this.message + ')';
      } else {
        this.message = params[0] + ' (caused by: ' + this.message + ')';
      }
    }
  }
}
