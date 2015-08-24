var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({io: new raspi()});
var motor;

board.on('ready', function() {
  //var motor = new five.Motor(['GPIO18', 'GPIO27', 'GPIO22']);
  motor = new five.Motor({
    pin: 'GPIO18'
  });

//  motor.stop();


//  console.log(motor);
  
  motor.forward(120);
  //motor.on("forward", function() {
    console.log("forward!");
    board.wait(2000, function() {
      console.log("stop");
      motor.stop();
    });
 // });
});


