var RaspiCam = require("raspicam");

var cameraOptions = {
    width       : 600,
    height      : 338,
    mode        : "timelapse",
    awb         : 'cloud',
    output      : 'images/camera.jpg',
    q           : 50,
    rot         : 270,
    nopreview   : true,
    timeout     : 1000,
    timelapse   : 9999,
    th          : "0:0:0"
};

var camera = new RaspiCam(cameraOptions);

//to take a snapshot, start a timelapse or video recording
var process_id = camera.start();

//to stop a timelapse or video recording
camera.stop( process_id );

while(true) ;
