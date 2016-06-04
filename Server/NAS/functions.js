//IdroServer System 2.0 ALPHA
//Functions
//Copyright (c) 2016 EstiNet

//Yay, that file doesnt work/do anything yet!


var terminalCheck = function terminalCheck(){
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
}
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
	return '[' + getDateTime() + ']' + '[' + loglevel + ']' + ' ' + logtext;
}
var shutdown = function shutdown(code){
	console.log(logConsole('IdroServer is shutting down!', 2));
	process.exit(code)
}