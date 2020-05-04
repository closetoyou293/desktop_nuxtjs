'use strict';

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Server = new _core2.default();

Server.Models = [{ name: 'Users', path: require('./model/user') }, { name: 'Setting', path: require('./model/setting') }];

Server.APIs = [{ name: 'auth', path: require('./api/auth') }, { name: 'setting', path: require('./api/setting') }];

Server.Sockets = [{ name: 'game', path: require('./socket/game') }];

Server.Run();
//# sourceMappingURL=index.js.map