// IdroServer System 2.0 - ALPHA
// Copyright (c) 2016 EstiNet
var net = require('net');
var events = require('events');
var eventEmitter = new events.EventEmitter();
const chalk = require('chalk');
var readline = require('readline');
var clc = require('cli-color');

var port = 6000;
var versionFull = "2.0 Alpha"
var versionNumber = 2.;

var NodeRSA = require('node-rsa');
console.log(logConsole('Loading RSA key...', 3));
//Change this key in production use!
var key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
                      'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n'+
                      'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n'+
                      'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n'+
                      'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n'+
                      'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n'+
                      'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n'+
                      'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n'+
                      '-----END RSA PRIVATE KEY-----');
console.log(logConsole('Done loading RSA Key!', 3));

/* Is this really nessessary?
console.log(logConsole('Starting terminal check, you should see the text "test" in various colors and formats.', 3));
console.log(chalk.bold('test'));
console.log(chalk.dim('test'));
console.log(chalk.italic('test'));
console.log(chalk.underline('test'));
console.log(chalk.inverse('test'));
console.log(chalk.strikethrough('test'));
console.log(chalk.red('test'));
console.log(chalk.green('test'));
console.log(chalk.blue('test'));
console.log(chalk.magenta('test'));
console.log(chalk.cyan('test'));
console.log(chalk.white('test'));
console.log(chalk.gray('test'));
console.log(chalk.bgBlack('test'));
console.log(chalk.bgRed('test'));
console.log(chalk.bgGreen('test'));
console.log(chalk.bgYellow('test'));
console.log(chalk.bgBlue('test'));
console.log(chalk.bgMagenta('test'));
console.log(chalk.bgCyan('test'));
console.log(chalk.bgWhite('test'));

console.log(logConsole('Terminal check complete!', 3));
*/


console.log(logConsole('Starting IdroServer System ' + versionFull + '...', 3));

//Get the current date+time
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
function logConsole(logtext, level) {
	//Return a stylized console log.
	//DEBUG is 0
	//ERROR is 1
	//WARNING is 2
	//INFO is 3
	
	switch(level) {
		case 0:
			loglevel = chalk.blue('DEBUG');
			break;
		case 1:
			loglevel = chalk.red('ERROR');
			break;
		case 2:
			loglevel = chalk.yellow('WARNING');
			break;
		case 3:
			loglevel = chalk.green('INFO');
			break;
		default:
			loglevel = chalk.magenta('UNKOWN');
			break;
	}
	//process.stdout.write(clc.move.up(1));
	//process.stdout.write(clc.erase.line);
	return '[' + getDateTime() + ']' + '[' + loglevel + ']' + ' ' + logtext;
	//process.stdout.write(chalk.cyan("> "));
}

//Old code from System 1.0
/*
io.sockets.on('connection', function(socket) { 

    console.log(logConsole('Client connection initilizaed.', 3));

    // Disconnect listener
    socket.on('disconnect', function() {
        console.log(logConsole('Client disconnected.', 3));
    });

    socket.on('MinigameUpdate', function (data, fn) {
        //console.log(data);
        console.log(logConsole('\tSending minigame update to hub servers:', 3));
        //fn('\tMinigame-CTF-GameInProgress-No');
		fn('\tDataRecived');
		serverdata = data;
		console.log(logConsole('\t' + serverdata, 3));
		if(serverdata == 'MG-CTF 1 state inprog'){
			console.log(logConsole('CTF Minigame, Server 1, is now in progress!', 3));
		}
		eventEmitter.emit('MinigameUpdate');
    });

});
*/

var server = net.createServer(function (c)
{ //'connection' listener
    console.log(logConsole('Client connection initilizaed.', 3));
	c.write('Connected to IdroServer System ' + versionFull + '.\r\n')
	c.write('OK')
    c.on('data', function (rawData)
    {
        console.log(logConsole(rawData, 0));   
		c.write('DATA OK');
		//Convert incoming data to string.
		var data = rawData.toString('utf-8');
		
		//console.log(key); nope this doesnt work
		var encrypted = key.encrypt(rawData, 'base64');
		console.log('encrypted: ', encrypted);
		var decrypted = key.decrypt(encrypted, 'utf8');
		console.log('decrypted: ', decrypted);
		
		//console.log(logConsole(data, 3)); 
		
		if(data == 'MG-CTF 1 state inprog'){
			console.log(logConsole('CTF Minigame, Server 1, is now in progress!', 3));
			c.write('STATE SET OK');
		}
		eventEmitter.emit('MinigameUpdate');

    });
	
    c.on('end', function ()
    {
        console.log(logConsole('Client disconnected.', 3));
    });
});

var minigameUpdate = function minigameUpdate(){
	console.log(logConsole('minigameUpdate event recived!', 0));
}

eventEmitter.on('MinigameUpdate', minigameUpdate);
console.log(logConsole('This is a test message! woot!', 0));

server.listen(port, function ()
{ 
    console.log(logConsole('IdroServer System ' + versionFull + ' is listening on port ' + chalk.magenta(port), 3));
	process.stdout.write(chalk.cyan("> "));
});

var shutdown = function shutdown(code){
	console.log(logConsole('IdroServer is shutting down!', 2));
	process.exit(code)
}


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (cmd) {
	process.stdout.write(clc.move.up(1));
	process.stdout.write(clc.erase.line);
	switch(cmd) {
		case 'help':
			console.log(logConsole('Help is a WIP.', 3));
			break;
		case 'stop':
			shutdown(0)
		case 'version':
			console.log(logConsole('This is IdroServer System ' +  versionFull + ' running on port ' + port, 2));
			break;
		default:
			console.log(logConsole('Unknown command: ' + cmd, 2));
			break;
			
	}
	process.stdout.write(chalk.cyan("> "));
});