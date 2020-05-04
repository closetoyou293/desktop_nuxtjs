import Core from './core';

const Server = new Core();

Server.Models = [
    {name: 'Users', path: require('./model/user')},
    {name: 'Setting', path: require('./model/setting')},
];

Server.APIs = [
    {name: 'auth', path: require('./api/auth')},
    {name: 'setting', path: require('./api/setting')},
];

Server.Run();