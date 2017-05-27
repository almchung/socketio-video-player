var express = require('express');
var socketIO = require('socket.io');
var path = require('path');

var connectCounter = 0;

const PORT = process.env.PORT || 8877;
const INDEX = __dirname + '/index.html';

var app = express()
  .get('/', function(req, res){  res.sendFile(__dirname + '/index.html');
})
  .use(express.static('public'))
  .use(express.static('files'))
  .use('/public', express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log('Listening on ${ PORT }'));

const io = socketIO(app);

io.sockets.on('connection', function(client){
  client.emit('broadcast', { description: ' connected!'});
  
  client.on('join', function(data){
    console.log(data);
    client.emit('broadcast', { description: data});
  });
  
  client.on('button-pushed', function(data){
    console.log("The puppet-master pushed the big play button!");
    client.emit('play');
    io.sockets.emit('play');
  });
});

    /*var Room = "";
    client.on("setNickAndRoom", function(nick, fn){
        client.join(nick.room);
        Room = nick.room;
        client.broadcast.to(Room).emit('count', "Connected:" + " " + count);
        fn({msg :"Connected:" + " " + count});
    });*/

/*http.listen(3000, function(){
  console.log('listening on localhost:3000');
});*/