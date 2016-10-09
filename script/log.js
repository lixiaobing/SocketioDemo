


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

// Log.v(tag,message);        //verbose模式,打印最详细的日志 
// Log.d(tag,message);        //debug级别的日志 
// Log.i(tag,message);        //info级别的日志 
// Log.w(tag,message);        //warn级别的日志 
// Log.e(tag,message);        //error级别的日志 


// function format(string) {
//     var args = arguments;
//     var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
//     return String(string).replace(pattern, function(match, index) {
//        return args[index];
//     });
// };
// 

// function dump(obj){ 
// 	var description = ""; 
// 	for(var i in obj){ 
// 		var property=obj[i]; 
// 		description+=i+" = "+property+"\n"; 
// 	} 
// 	console.log(description); 
// };