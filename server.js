var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var players = {};



app.use(express.static(__dirname + "/public"));


io.on('connection', function (socket) {
    console.log('a user connected');


    // create a new player and add it to our players object
    players[socket.id] = {
        flip: 0,
        x: Math.floor(Math.random() * 200) + 50,
        y: Math.floor(Math.random() * 80) + 50,
        playerId: socket.id
    };
    // send the players object to the new player
    console.log(players);
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);




    
    socket.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnected', socket.id);
    });


    // when a player moves, update the player data
    socket.on('playerMovement', function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });


});


http.listen(8080, function () {
    console.log('Servcer gestartet, listening on port 8080');
});