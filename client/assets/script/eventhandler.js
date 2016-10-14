var log        = require('log');
var events     = require('events');
module.exports = exports = EventHandler;
function EventHandler(){
    this.listeners = {};
    for(var sys_event in events.SYS){
       this.listeners[events.SYS[sys_event]] =[];
    }
    for(var event in events.S2C){
       this.listeners[events.S2C[event]] =[];
    }
}
EventHandler.prototype.listen = function(eventName,callfunc){
    if(this.listeners.hasOwnProperty(eventName)){
        var callFuncList = this.listeners[eventName];
        callFuncList.push(callfunc);
    }else{
        log.e('event:',eventName,' unknow!');
    }
}
EventHandler.prototype.unlisten = function(eventName,callfunc){
    if(this.listeners.hasOwnProperty(eventName)){
        var callFuncList = this.listeners[eventName];
        for(var index = callFuncList.length - 1 ; index > 0;index--){
            if(_callFunc === callfunc){
                callFuncList.splice(index,1);
            }
        }
    }
}
EventHandler.prototype.unlistens = function(eventName){
    if(this.listeners.hasOwnProperty(eventName)){
        this.listeners[eventName]=[];
    }
}
EventHandler.prototype.dispose = function(eventName,data){
    log.d('dispose event:',eventName,'>',data)
    if(this.listeners.hasOwnProperty(eventName)){
        var callFuncList = this.listeners[eventName];
        //log.e('event',eventName,'callFuncList size:',callFuncList.length);
        for(var index in callFuncList){
            callFuncList[index](data);
           // log.e('event index:',index,'callFuncList size:',callFuncList.length);
        }
    }else{
        log.e('event:',eventName,' unknow!');
    }
}


// javascript 里清空数组的三种方式
// 方式1，splice
// var ary = [1,2,3,4];
// ary.splice(0,ary.length);
// console.log(ary); // 输出 []，空数组，即被清空了
// 方式2，length赋值为0
// var ary = [1,2,3,4];
// ary.length = 0;
// console.log(ary); // 输出 []，空数组，即被清空了
// 目前 Prototype中数组的 clear 和mootools库中数组的 empty 使用这种方式清空数组。  
// 方式3，赋值为[]
// var ary = [1,2,3,4];
// ary = []; // 赋值为一个空数组以达到清空原数组
// 这里其实并不能说是严格意义的清空数组，只是将ary重新赋值为空数组，之前的数组如果没有引用在指向它将等待垃圾回收。
// Ext库Ext.CompositeElementLite类的 clear 使用这种方式清空。




