var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var parser = require('body-parser');

app.use(parser.json());
app.use(parser.urlencoded());

app.get('/', function(req, res){
  res.sendFile(__dirname +'/index.html');
});

app.post('/', function(req, res){
  io.emit('message',JSON.stringify(req.body));
  res.json(req.body);
});

io.on('connection', function(socket){

  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('message', function(msg){
	socket.broadcast.emit(msg);
  });
});

http.listen(8000, function(){
  console.log('listening http');
});