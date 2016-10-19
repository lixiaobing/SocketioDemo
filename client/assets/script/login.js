var log          = require('log');
var client       = require('client');
var events       = require('events');
cc.Class({
    extends: cc.Component,

    properties: {
        btnLogin:
        {
            default:null,
            type:cc.Button
        }
    },

    // use this for initialization
    onLoad: function () {
        client.init(events.S2C)
        client.listen(client.Events.connect,function(){
            // var times = new Date().getTime();
            // var userInfo = {};
            // userInfo.id  = Math.floor(Math.random()*times)
            // client.emit(events.C2S.EnterGame,userInfo);
        });
        client.listen(events.S2C.HeartBeat,function(data){
            log.e('rec heartbeat',data);
        });
        client.listen(events.S2C.EnterGame,function(data){
            log.e('rec enterGame',typeof(data),data);
            log.e('rec data.id',data.id);
            //cc.director.loadScene('game');
        });
        client.connect();
        var self = this;
        this.btnLogin.node.on(cc.Node.EventType.TOUCH_START, function(event){
            console.log("btnLogin");
            // cc.director.loadScene('game');
            var times = new Date().getTime();
            var userInfo = {};
            userInfo.id  = Math.floor(Math.random()*times);
            // userInfo     = "{'id':111}";
            log.d('userInfo=',userInfo);
            client.emit(events.C2S.EnterGame,userInfo);
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
