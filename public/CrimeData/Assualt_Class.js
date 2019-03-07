var Crime=require('./Crime');
var Crime_event=Crime.Crime_event;// when you call Crime_event, just Crime.Crime_event, no () after Crime_event, because the 'Crime_event' is what you export, not Crime_event()
var Crime_Assualt=function (Index,Lat,Longt,Year,Month,Day,Time,Weekday,Division,Neighborhood,Crime_type) {

Crime_event.call(this,Index,Lat,Longt,Year,Month,Day,Time,Weekday,Division,Neighborhood,Crime_type);

//这地方是js中的继承，call的作用是将一个函数的对象的上下文从初始的上下文改变为由thisObj指定的新对象，如果没有提供thisObj参数，那么global对象被用作thisObj
//call 语法：call([thisObj[,arg1[, arg2[, [,.argN]]]]])
    //这个地方就是将Crime_event的上下文变成了this的上下文，this是什么，this就是这个Crime_Assualt,所以现在这个Crime_Assualt的上下文就变成了Crime_event的上下文，
    //换句话说，就是这个Crime_Assualt继承了Crime_event

}


console.log(Crime_event);

module.exports={events4crime: Crime_Assualt};
