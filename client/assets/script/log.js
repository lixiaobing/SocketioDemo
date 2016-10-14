module.exports = exports = {};

exports.VERBOS = 0;
exports.DEBUG  = 1;
exports.INFO   = 2;
exports.WARN   = 3;
exports.ERROR  = 4;
//日志等级
exports.level  = exports.VERBOS;

var LevelTips = ['verbose','debug','info','warn','error'];

var log = function(level,args)
{
	args.unshift(LevelTips[level]+": ");
	console.log.apply(console,args);
}

exports.v = function(){
	// if (exports.level <= exports.VERBOS){
		var args = Array.prototype.slice.call(arguments);
		log(exports.VERBOS,args);
	// }
};

exports.d = function(){
	if (exports.level <= exports.DEBUG){
		var args = Array.prototype.slice.call(arguments);
		log(exports.DEBUG,args);
	}
};

exports.i = function(){
	if (exports.level <= exports.INFO){
		var args = Array.prototype.slice.call(arguments);
		log(exports.INFO,args);
	}
};

exports.w = function(){
	if (exports.level <= exports.WARN){
		var args = Array.prototype.slice.call(arguments);
		log(exports.WARN,args);
	}
};
exports.e = function(){
	if (exports.level <= exports.ERROR){
		var args = Array.prototype.slice.call(arguments);
		log(exports.ERROR,args);
	}
};
