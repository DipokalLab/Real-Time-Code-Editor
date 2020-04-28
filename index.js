var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('pub'));

app.get('/', function(req, res) {
    res.render("index");
});


io.on('connection', (socket) => {
    console.log('connected');

    socket.on('chat', (msg, userName) => {
        io.emit('chat1', msg, userName);
    });
    
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
  });

server.listen(4000);
