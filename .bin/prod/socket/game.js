'use strict';

const Players = {};
const tickLengthMs = 1000 / 60;

module.exports = io => {
    io.on('connect', client => {
        //New Player
        client.on('NewPlayer', () => {
            Players[client.id] = {};
            Players[client.id].id = client.id;
            Players[client.id].postion = {
                x: 15,
                now: 'turn'
            };
        });

        //Player Move
        client.on('UpdateMove', data => {
            if (!Players[client.id]) return false;

            if (data == 'left') {
                if (Players[client.id].postion.x <= 0) return Players[client.id].postion.x = 0;
                Players[client.id].postion.x = Players[client.id].postion.x - 2;
                Players[client.id].postion.now = 'left';
                return;
            }
            if (data == 'right') {
                if (Players[client.id].postion.x >= 400) return Players[client.id].postion.x = 400;
                Players[client.id].postion.x = Players[client.id].postion.x + 2;
                Players[client.id].postion.now = 'right';
                return;
            }
            if (data == 'turn') {
                if (Players[client.id].postion.now == 'turn') return false;
                Players[client.id].postion.now = 'turn';
                return;
            }
        });

        //Player Disconnect
        client.on('disconnect', () => {
            delete Players[client.id];
            io.emit('Disconnect', client.id);
        });
    });

    let previousTick = Date.now();
    let gameLoop = function () {
        let now = Date.now();

        if (previousTick + tickLengthMs <= now) {
            previousTick = now;

            //Logic
            io.emit('Loop', Players);
        }

        if (Date.now() - previousTick < tickLengthMs - 16) {
            setTimeout(gameLoop);
        } else {
            setImmediate(gameLoop);
        }
    };
    gameLoop();
};
//# sourceMappingURL=game.js.map