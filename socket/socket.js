var app = require('http').createServer();
var io = require('socket.io').listen(app);

io.sockets.on('connect', function(socket) {
  socket.emit('news', {hello:'world'});
  socket.emit('newimage', {url:'pathworld'});
});


app.listen(3300);
console.log("Socket listening on 3300...");

module.exports = io;

