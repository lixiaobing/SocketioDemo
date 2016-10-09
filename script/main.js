log = require('./log')
log.level  = log.DEBUG;
var Server = require('./server');
Server.init();
Server.listen(3000);

/////////////////////////////////////
// var array = [0,1,2,2,1,0,1,2,0,0,2,1];
// array.sort(function(a,b)
// 	{	
// 		if (b === 1){
// 			return 1;
// 		}else if(a===1){
// 			return -1;
// 		}
// 		return a-b;
// 	});
// for (var i = 1; i < array.length; i++) {
// 	console.log(i +" = "+array[i]);
// }