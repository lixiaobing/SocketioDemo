
var Client  = require('./client');

var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
app.use(express.static(__dirname + '/pages'));

module.exports = exports = {};
var Server = module.exports
var clinets = {};
var onSocketConnect = function(socket) {
  var client = Server.addClient(socket);
  client.on(Client.Events.disconnect, function(target,data) {
      log.d("["+client.getSessionId()+"] disconnect");
      client.destory();
      Server.removeClient(client);
  });
  client.ready();
};

Server.init = function () {
   io.on('connection',onSocketConnect);
};
Server.listen = function (port) {
   http.listen(port, function(){
      log.v('Server listening on : '+ port);
   });
};
Server.addClient = function(socket){
  var client = new Client(io,socket);
  clinets[socket.id] = client;
  log.d('clinet['+socket.id +'] connceted!');
  return client;
};
Server.removeClient = function(client){
  var id = client.getSessionId();
  if (clinets.hasOwnProperty(id)) {
    delete clinets[id];
  } else {
    log.d('ignoring remove for '+ id);
  }
};

Server.getClient = function(socketId){
   return clinets[socketId];
};


// connect：连接成功
// connecting：正在连接
// disconnect：断开连接
// connect_failed：连接失败
// error：错误发生，并且无法被其他事件类型所处理
// message：同服务器端message事件
// anything：同服务器端anything事件
// reconnect_failed：重连失败
// reconnect：成功重连
// reconnecting：正在重连
// 
// ////////////////////////////////////////////////
   // socket.on('connecting', function() {
   //     console.log("connecting");
   // });
   // socket.on('connect_failed', function() {
   //     console.log("connect_failed");
   // });

   // socket.on('error', function() {
   //     console.log("error");
   // });

   // socket.on('message', function() {
   //     console.log("message");
   // });
   // socket.on('anything', function() {
   //     console.log("anything");
   // });
   // socket.on('reconnect_failed', function() {
   //     console.log("reconnect_failed");
   // });
   // socket.on('reconnect', function() {
   //     console.log("reconnect");
   // });
   // socket.on('reconnecting', function() {
   //     console.log("reconnecting");
   // });