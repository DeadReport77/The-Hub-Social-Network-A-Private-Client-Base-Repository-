var sIO = {};

sIO.on = (function(){
    var messages = {};
    var speedLimit = 5; //5ms
    return function(message, handler) {
        messages[message] = messages[message] || {};
        if(messages[message].timestamp && new Date().getTime() - messages[message].timestamp < speedLimit) return false;
        else messages[message].timestamp = new Date().getTime();

        handler();
        return true;
        //execute code, Ex:
    }
}());

//sIO.on("hello",function(){console.log("it works");});

//sIO.on("hi",function(){console.log("it works too");});

var i = 0;
for(; i < 3; i++)
console.log(sIO.on("hello",function(){
    console.log("works!");
}));

setInterval(function(){
    console.log(sIO.on("help",function(){}));
}, 5);