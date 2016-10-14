
module.exports = exports = {};

//////////////系统事件///////////////
exports.SYS = {
	disconnect:'disconnect'
};

/////////////自定义事件//////////////

exports.S2C = {
	EnterGame:'entergame',
	EnterRoom:'enterroom',
    LeaveRoom:'leaveroom',
    GameStart:'gamestart',
    ErrorMessage:'errormessage'
};

exports.C2S = {
	EnterGame:'entergame',
	EnterRoom:'enterroom',
    LeaveRoom:'leaveroom'
};
