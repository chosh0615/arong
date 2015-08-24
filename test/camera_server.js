var express = require('express');
var app     = express();
var http    = require('http').Server(app);
 
app.use(express.static(__dirname + '/images'));
http.listen(8888, function(){
    console.log('Running...');
});
 
var cameraOptions = {
    width       : 600,
    height      : 338,
    mode        : "timelapse",
    tl		: 1000,
    awb         : 'cloud',
    output      : 'test/images/camera_%04d.jpg',
    q           : 50,
    //rot         : 270,
    nopreview   : true,
    timeout     : 99999,
    //timelapse   : 9999,
    //verbose	: true,
    th          : "0:0:0"
};
 
var camera = new require("raspicam")(cameraOptions);
camera.start();
 
app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/images/camera.jpg');
});

