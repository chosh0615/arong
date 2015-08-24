var GPIO = require('onoff').Gpio;

var n1 = new GPIO(17, 'out');
var n2 = new GPIO(27, 'out');

n1.writeSync(1);
n2.writeSync(0);

