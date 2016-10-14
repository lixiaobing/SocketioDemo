var Event  = require('./event')
var Player = require('./player')
module.exports = exports = Client;

function Client(io,socket,game){
	this.socket = socket;
  this.game   = game;
	this.io     = io;
	this.player = null;
  // this.eventNames = {};
   

};
//绑定到player
Client.prototype.bindPlayer = function(id){
  this.player = new Player(id,this);
};

Client.prototype.getSessionId = function(){
	return this.socket.id;
};
//自定义消息
Client.prototype.addEventListener = function(){
   var self = this ;
   // this.on(Events.askdisconnect, function(package) {
   //    log.d("["+self.getSessionId()+"] askdisconnect");
   //    self.disconnect();
   // });
   // this.on(Events.entergame, function(data) {
   //    log.d("["+self.getSessionId()+"] entergame");
   //    self.emit(Events.entergame,{id:11111,name:'leebing'});
   // });
   
   // this.listen(Event.C2S.EnterRoom);
   // this.listen(Event.C2S.LeaveRoom);
   for (var event in Event.C2S){
      this.listen(Event.C2S[event]);
   }
   return this;
};
Client.prototype.disconnect = function(){
    this.socket.disconnect();
};
Client.prototype.on = function(eventName, callback){
  var self = this;
 	// this.eventNames[eventName] = true;
  this.socket.on(eventName,function(data){
      var package = {target:self,event:eventName,data:data};
      callback(package);
  	});
};

Client.prototype.listen = function(eventName){
  var self = this;
  // this.eventNames[eventName] = true;
  this.socket.on(eventName,function(data){
      var package = {target:self,eventName:eventName,data:data};
      self.game.handle(package)
    });
};
Client.prototype.emit= function(cmd,data){
	this.socket.emit(cmd,data);
	return this;
};
//准备就绪通知客户端连接成功
Client.prototype.ready= function(cmd,data){
	this.addEventListener();
	this.emit('connected','client connect Success!');
	return this;
};

Client.prototype.destory= function(cmd,data){
	log.d("client ["+this.getSessionId() + "]  destoryed!")
	//执行清理操作
	return this;
};


//
// Client.prototype.removeListener = function(eventName){
// 	if (this.eventNames.hasOwnProperty(eventName)) {
// 		this.socket.removeListener(this.eventNames[eventName]);
// 		delete this.eventNames[eventName];
// 	}
// };



