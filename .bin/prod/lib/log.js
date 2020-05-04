'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Log {
    constructor() {}
    Show(path) {
        console.log(`[Server]   ${path}`.green);
    }
    Error(path) {
        console.log(`[Error]    ${path}`.red);
    }
    Info(path) {
        console.log(`[Info]     ${path}`.yellow);
    }
}
exports.default = Log;
//# sourceMappingURL=log.js.map