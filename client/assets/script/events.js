
module.exports = exports = {};
//////////////系统事件///////////////
exports.SYS = {
	disconnect:'disconnect',
	connect:'connect',
	error:'error'
};
/////////////自定义事件//////////////
exports.S2C = {
    HeartBeat:'heartbeat',
	EnterGame:'entergame',
	EnterRoom:'enterroom',
    LeaveRoom:'leaveroom',
    GameStart:'gamestart',
    ErrorMessage:'errormessage'
};
exports.C2S = {
    HeartBeat:'heartbeat',
	EnterGame:'entergame',
	EnterRoom:'enterroom',
    LeaveRoom:'leaveroom',

};
