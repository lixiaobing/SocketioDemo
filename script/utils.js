
function dump(obj){ 
	var description = ""; 
	for(var i in obj){ 
		var property=obj[i]; 
		description+=i+" = "+property+"\n"; 
	} 
	console.log(description); 
};
