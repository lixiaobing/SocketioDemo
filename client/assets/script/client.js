var log          = require('log');
var events       = require('events');
var EventHandler = require('eventhandler');
module.exports = exports = {};

//服务器地址
var address = 'http://localhost:3000';


var socket = null;
var eventHandler = new EventHandler() ;




var onEvent = function(eventName,data){
    //log.d('onEvent:',eventName);
    if(eventHandler !== null){
        eventHandler.dispose(eventName,data);
    }
};

var listen = function(eventName){
    log.d('clinet listen:',eventName)
    socket.on(eventName,function(data){
        onEvent(eventName,data);
    });
};

var addAllListener = function(){
    for(var eventName1 in events.SYS){
        listen(events.SYS[eventName1]);
    }
    for(var eventName2 in events.S2C){
        listen(events.S2C[eventName2]);
    }
}

var onConnect = function(){
    log.d('socket is connect');
    //socket.emit('entergame','aaa');
}
var onDisconnect = function(){
    log.d('socket is disconnect');
}
var onError = function(data){
    log.d("error:"+data);
}

var onCreate = function(socket){
    exports.listen(events.SYS.connect,onConnect);
    exports.listen(events.SYS.disconnect,onDisconnect);
    exports.listen(events.SYS.error, onError);
    // socket.on('reconnect', function() {
    //   log.d("reconnect");
    // });
    // socket.on('connecting', function() {
    //   log.d("connecting");
    // });
    // socket.on('connect_failed', function() {
    //   log.d("connect_failed");
    // });
    // socket.on('reconnect_failed', function() {
    //   log.d("reconnect_failed");
    // });
    // socket.on('reconnecting', function() {
    //   log.d("reconnecting");
    // });
    // socket.on('message', function(data) {
    //   log.d("message:"+data);
    // });
    // socket.on('anything', function() {
    //   log.d("anything");
    // });
    
    addAllListener();

};

exports.getEventHandler = function(){
    return eventHandler;
};

exports.connect = function(){
    //log.d('socket=' + socket);
    if(socket === null){
        socket = io.connect(address);
        onCreate(socket);
    }else{
        //TODO 断线后在链接有问题
        //log.d('socket reconnect');
        //socket.connect();
    }
}

exports.disconnect = function(){
    if(socket !== null){
        socket.disconnect();
    }
}
exports.emit = function(eventName,data){
    if(socket !== null){
        log.d('emit:',eventName ,JSON.stringify(data));
        
        socket.emit(eventName,JSON.stringify(data));
    }
}


exports.listen = function(eventName,callfunc){
    eventHandler.listen(eventName,callfunc);
}
exports.unlisten = function(eventName,callfunc){
    eventHandler.unlisten(eventName,callfunc);
}
exports.unlistens = function(eventName){
    eventHandler.unlistens(eventName);
}





// if(cc.sys.isNative){
//     io = SocketIO;
// }else{
//     io = require('socket.io');
// }


//socket native method
/*
send
emit
disconnect
on
*/