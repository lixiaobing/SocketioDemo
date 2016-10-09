module.exports = exports = Client;
var Events = {
  //系统级消息
  disconnect:'disconnect',  

  askdisconnect:'askdisconnect',//客户端请求退出
  entergame:'entergame',//进入游戏
};
exports.Events = Events;
function Client(io,socket){
	this.socket = socket;
	this.io     = io;
	this.eventNames = {};

};
Client.prototype.getSessionId = function(){
	return this.socket.id;
};
//自定义消息
Client.prototype.addEventListener = function(){
   var self = this 
   this.on(Events.askdisconnect, function(data) {
      log.d("["+self.socket.id+"] askdisconnect");
      self.disconnect();
   });
   this.on(Events.entergame, function(data) {
      log.d("["+self.socket.id+"] entergame");
   });

   //this.removeListener('cmd_disconnect');
   return this;
};
Client.prototype.disconnect = function(){
    this.socket.disconnect();
};
Client.prototype.on = function(eventName, callback){
 	this.eventNames[eventName] = callback;
    this.socket.on(eventName,function(data){
    		callback(data);
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



