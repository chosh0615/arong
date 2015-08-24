var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({io: new raspi()});

board.on('ready', function() {
	
	var esc = new five.ESC(12);

	esc.speed(100);


});


