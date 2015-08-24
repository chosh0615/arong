var cv = require('opencv');

cv.readImage("/home/pi/doorlock/test/camera.jpg", function(err, im){
  im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
    console.log("Detected");
    for (var i=0;i<faces.length; i++){
      var x = faces[i]
      im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
    }
    im.save('/home/pi/doorlock/test/camera_face.jpg');
  });
});
