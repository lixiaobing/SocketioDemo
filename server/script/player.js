//房间 
module.exports = exports = Player;

function Player(id,client){
	this.id = id;
	this.client = client;
	this.name = "aa";
};
//载入数据
Player.prototype.load = function(){
	
};
Player.prototype.getClient = function(){
	return this.client;
};