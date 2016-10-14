//Game
var Room  = require('./room')
var Event = require('./event')
module.exports = exports = Game;
var ROOM_COUNT = 10;

function Game(){
	this.roomList = [];
	this.init();
};

Game.prototype.init = function(){
	for (var index = 0 ;index < ROOM_COUNT ;index ++){
		var room = new Room(index);
		this.roomList.push(room)
	}
	log.d("create room " + ROOM_COUNT);
};

//游戏包chuli游戏包处理
Game.prototype.handle = function(package){
	var eventName = package.eventName;
	log.d("handle event:",eventName);
	switch(eventName){
		case Event.C2S.EnterGame:
			this.onEnterGame(package);
		break;
		case Event.C2S.EnterRoom:
			this.onEnterRoom(package);
		break;
		case Event.C2S.LeaveRoom:
			this.onLeaveRoom(package);
		break;
	}
};
Game.prototype.onEnterGame = function(package){
	log.d('onEnterGame data  type:', typeof(package.data),package.data);
	var client  = package.target;
	var data    = JSON.parse(package.data);
    //var data    = eval("("+package.data+")");
	var respose = {};
	respose.name  = client.getSessionId();
	respose.id    = data.id;
	respose.level = 1;
	respose.score = 0;
	client.emit(Event.S2C.EnterGame,respose);
	//判断游戏是否可以开始
};
Game.prototype.onEnterRoom = function(package){
	log.d('onEnterRoom');
	var client  = package.target;
	var room = this.findWaitRoom();

	var respose = {};

	client.emit(Event.S2C.EnterRoom,respose);
	//判断游戏是否可以开始
};
Game.prototype.onLeaveRoom = function(package){
	log.d('onLeaveRoom');
};
//房间排序
Game.prototype.sortRoom = function(){
	this.roomList.sort(function(room1,room2){
		var a = room1.getPlayerCount();
		var b = room2.getPlayerCount();
		if (b === 1){
			return 1;
		}else if(a===1){
			return -1;
		}
		return a-b;
	});
}


//房间排序
Game.prototype.findWaitRoom = function(){
	this.sortRoom();
	var room;
	for (var index = 0 ; index < this.roomList.length ;index ++){
		room = this.roomList[index]
		if (!room.isMaxPlayer()){
			return room;
		}
	}
	return null;
}

// //向房间里添加一个玩家
// Game.prototype.addPlayers = function(player) {
// 	this.players.push(player);
// };
// //房间里删除一个玩家
// Game.prototype.removePlayers = function(player) {
//     for (var index = 0 ;index < this.players.length;index++ )
//     {
//         if (this.players[index] === player)
//         {
//             this.players.splice(index ,1);
//         }
//     }
// };