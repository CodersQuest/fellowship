
let players = require.context('./PlayerTokens/', false, /\.png$/);
let p = [];
players.keys().forEach((player) => {
    player = require('./PlayerTokens'+ player.slice(1));
    p.push(player);
});
let enemies = require.context('./EnemyTokens/', false, /\.png$/);
let e = [];
enemies.keys().forEach((enemy) => {
    enemy = require('./EnemyTokens'+ enemy.slice(1));
    e.push(enemy);
});
module.exports.players = p;// i need to export all items in array as require statements
module.exports.enemies = e;
