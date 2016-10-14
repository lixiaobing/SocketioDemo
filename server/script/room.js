//房间 
module.exports = exports = Room;
var MAX_PLAYER_COUNT = 2;
function Room(id){
	this.id = id;
	this.players = [];
	this.data = [];
	for (var i = 15*15 - 1; i >= 0; i--) {
		this.data.push(0);
	}
	log.d("data :length " + this.data.length);
};

Room.prototype.clearChessboard = function(){
	for (var i = this.data.length - 1; i >= 0; i--) {
		this.data[i] = 0;
	}
};

Room.prototype.getPlayerCount = function(){
	return this.players.length;
};
//
Room.prototype.isMaxPlayer = function(){
	return this.players.length >= MAX_PLAYER_COUNT;
};
//向房间里添加一个玩家
Room.prototype.addPlayers = function(player) {
	this.players.push(player);
	//通知其他玩家有玩家加入游戏
};
//房间里删除一个玩家
Room.prototype.removePlayers = function(player) {
    for (var index = 0 ;index < this.players.length;index++ )
    {
        if (this.players[index] === player)
        {
            this.players.splice(index ,1);
        }
    }
};