'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Init = Init;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nuxt = require('nuxt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Init() {
    const configNuxt = require(_path2.default.resolve('./nuxt.config.js'));
    configNuxt.dev = !(process.env.NODE_ENV === 'production');
    const nuxt = new _nuxt.Nuxt(configNuxt);

    return new Promise((res, rej) => {
        if (configNuxt.dev) {
            const builder = new _nuxt.Builder(nuxt);
            builder.build().then(() => {
                res(nuxt);
            });
        } else {
            res(nuxt);
        }
    });
}
//# sourceMappingURL=nuxt_init.js.map