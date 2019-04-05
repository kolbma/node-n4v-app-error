"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
// instanceof is broken when class extends Error type
// https://github.com/Microsoft/TypeScript/issues/13965
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(arg1) {
        var _newTarget = this.constructor;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var _this = this;
        var INSTANCE_PROTO = _newTarget.prototype;
        var message;
        if (arg1 && typeof (arg1) === 'string') {
            message = arg1;
            if (params.length > 0) {
                message = util.format.apply(util, [message].concat(params));
            }
        }
        else if (arg1 && arg1 instanceof Error) {
            if (params.length > 1) {
                message = util.format.apply(util, [params[0]].concat((params.slice(1))));
            }
            else {
                message = params[0];
            }
            message += ' (caused by: ' + arg1.message + ')';
        }
        else if (typeof arg1 === 'object') {
            message = new Error(JSON.stringify(arg1));
        }
        else {
            try {
                message = new Error(arg1.toString());
                // tslint:disable-next-line: no-empty
            }
            catch (err) {
            }
        }
        if (message) {
            _this = _super.call(this, message.toString()) || this;
        }
        else {
            _this = _super.call(this) || this;
        }
        _this.__proto__ = INSTANCE_PROTO;
        if (arg1 instanceof Error) {
            _this.stack += ' (caused by: ' + arg1.stack + ')';
        }
        _this.name = 'AppError';
        if (_this.message.startsWith('Error: ')) {
            if (params.length > 1) {
                _this.message = util.format.apply(util, [params[0]].concat((params.slice(1)))) + ' (caused by: ' + _this.message + ')';
            }
            else {
                _this.message = params[0] + ' (caused by: ' + _this.message + ')';
            }
        }
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
//# sourceMappingURL=index.js.map