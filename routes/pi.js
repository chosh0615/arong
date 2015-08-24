var express = require('express');
var router = express.Router();

var GPIO = require('onoff').Gpio;
var led = new GPIO(3, 'out');


router.get('/', function(req, res, next) {
  res.render('door', { title: 'Droowa' });
});


router.get('/open', function(req, res, next) {

  led.writeSync(1);

  res.send({res:"OK"});

});

router.get('/close', function(req, res, next) {
  led.writeSync(0);
  res.send({res:"OK"});

});


var io = require('../socket/socket.js');

// camera
var raspicam = require('raspicam');
var camera_id = 0;
var camera; 

router.get('/camera/on', function(req, res, next) {
  if(camera_id != 0)  {
    res.send({res: "Already ON"});
    return;
  }

  var cameraOptions = {
    width       : 600,
    height      : 338,
    mode        : "timelapse",
    tl          : 1000,
    awb         : 'cloud',
    output      : '/home/pi/doorlock/public/images/camera/camera.jpg', // %04d
    q           : 40,
    //rot         : 270,
    nopreview   : true,
    timeout     : 99999,
    //timelapse   : 9999,
    //verbose   : true,
    th          : "0:0:0"
  };

  camera = new raspicam(cameraOptions);
  camera_id = camera.start(); 
  //console.log("cam id: " + camera_id);

  camera.on('read', function(err, filename) {
    console.log('read:' + filename);
    io.emit('newimage', {url: filename});
  });

  camera.on('exit', function() {
    console.log("Camera TIMEOUT! Restarting camera...");
    camera.start();
  });

  res.send({res: "OK"});
});

router.get('/camera/off', function(req, res, next) {
  camera.stop();
  camera_id = 0;
  res.send({res: "OK"});
});



// servo
//var piblaster = require('pi-blaster.js');
var SERVO_PORT = 'GPIO18';

var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({io: new raspi(), repl:false});

var _currentAngle = 90;
board.on('ready', function() {
  servo = new five.Servo(SERVO_PORT);
  servo.center();
});

router.get('/camera/left', function(req, res, next) {
  _currentAngle = Math.min( 180, _currentAngle + 20 );
  servo.to(_currentAngle);
  res.send({res: "OK"});
});

router.get('/camera/right', function(req, res, next) {
  _currentAngle = Math.max( 0, _currentAngle - 20 );
  servo.to(_currentAngle);
  res.send({res: "OK"});
});



// Motor
var m1_c1_pin = 17, m1_c2_pin = 27;
var m2_c1_pin = 10, m2_c2_pin = 9;

var m1_c1 = new GPIO(m1_c1_pin, 'out');
var m1_c2 = new GPIO(m1_c2_pin, 'out');
var m2_c1 = new GPIO(m2_c1_pin, 'out');
var m2_c2 = new GPIO(m2_c2_pin, 'out');



function motor1_forward() {
  m1_c1.writeSync(1);
  m1_c2.writeSync(0);
}

function motor1_backward() {
  m1_c1.writeSync(0);
  m1_c2.writeSync(1);
}

function motor1_stop() {
  m1_c1.writeSync(0);
  m1_c2.writeSync(0);
}

function motor2_forward() {
  m2_c1.writeSync(1);
  m2_c2.writeSync(0);
}

function motor2_backward() {
  m2_c1.writeSync(0);
  m2_c2.writeSync(1);
}

function motor2_stop() {
  m2_c1.writeSync(0);
  m2_c2.writeSync(0);
}

router.post('/motor/forward', function(req, res, next) {
  console.log('forward');
  motor1_forward();
  motor2_forward();
  res.send({res:"OK"});
});

router.post('/motor/backward', function(req, res, next) {
  console.log('backward');
  motor1_backward();
  motor2_backward();
  res.send({res:"OK"});
});

router.post('/motor/right', function(req, res, next) {
  console.log('right');
  motor1_forward();
  motor2_backward();
  res.send({res:"OK"});
});

router.post('/motor/left', function(req, res, next) {
  console.log('left');
  motor1_backward();
  motor2_forward();
  res.send({res:"OK"});
});

router.post('/motor/stop', function(req, res, next) {
  console.log('stop');
  motor1_stop();
  motor2_stop();
  res.send({res:"OK"});
});


// socket io test

router.get('/msg', function(req, res, next) {

  io.emit('newimage', {path:'eee'});
  res.send({});
});


module.exports = router;

