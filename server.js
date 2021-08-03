var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(8080, function () {
    console.log('Servcer gestartet, listening on port 8080');
});


app.use(express.static(__dirname + "/public"));



io.on('connection', function(socket, name){
    console.log('Ein neuer Client hat den Server betreten');
    io.emit('user join', {for: 'everyone'});
    
    socket.on('disconnect', function(){
        io.emit('user leave', {for: 'everyone'});
        console.log('Ein Nutzer hat den Server verlassen');
    });
});