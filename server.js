var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8000;

var players = {};



app.use(express.static(__dirname + "/public"));


io.on('connection', function (socket) {
    console.log('a user connected');

    




    socket.on('loggedIn', function(loginData){
        console.log('a user logged in');
        // create a new player and add it to our players object

        console.log(loginData.username);

        players[socket.id] = {
            direction: 1,
            x: Math.floor(Math.random() * 200) + 50,
            y: Math.floor(Math.random() * 80) + 50,
            playerId: socket.id,
            username: loginData.username,
            healthPoints: 500
        };
        // send the players object to the new player
        console.log(players);
        socket.emit('currentPlayers', players);
        
        // update all other players of the new player
        socket.broadcast.emit('newPlayer', players[socket.id]);
    });






    socket.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnected', socket.id);
    });

    // when a player moves, update the player data
    socket.on('playerMovement', function (movementData) {
        if(players[socket.id]){
            players[socket.id].x = movementData.x;
            players[socket.id].y = movementData.y;
            players[socket.id].direction = movementData.direction;
            // emit a message to all players about the player that moved
            socket.broadcast.emit('playerMoved', players[socket.id]);
        }
    });

    socket.on('playerAnimation', function (animationData) {
        if(players[socket.id]){
            players[socket.id].animation = animationData.animation;
            socket.broadcast.emit('playerNewAnimation', players[socket.id]);
        }
    });

    socket.on('playerHitted', function (hitData){
        //Check ob hitData.playerId is in list
        if(players[socket.id]){
            console.log(hitData.playerId + " / " + hitData.damage);
            //in hitData is the playerID and the healthpoints
            players[hitData.playerId].healthPoints -= hitData.damage;
            //console.log(players[hitData.playerId]);
            if(players[hitData.playerId].healthPoints > 0){
                socket.broadcast.emit('playerHealthUpdate', players[hitData.playerId]);
                socket.emit('playerHealthUpdate', players[hitData.playerId]);
            }else{
                socket.broadcast.emit('playerDied', players[hitData.playerId]);
                socket.emit('playerDied', players[hitData.playerId]);
                delete players[hitData.playerId];
                console.log("player dead");
                console.log(players);
            }
        }
        
    });

});


http.listen(port, function () {
    console.log('Server gestartet, er lauscht auf dem Port ' + port);
});