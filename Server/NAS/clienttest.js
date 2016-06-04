// Connect to server
var io = require('socket.io-client')
var socket = io.connect('http://localhost:8080');

socket.on('connect', function () {

    console.log('Connected!\n\tSending query ...');

    socket.emit('MinigameUpdate', 'MG-CTF 1 state inprog', function (data) {
      console.log(data); 
    });

});