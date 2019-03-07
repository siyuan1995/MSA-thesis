var express = require('express');
var router = express.Router();
var read_crime=require('../Read/Read_Crime');
var MeanCenter=require('./Caculate_Mean_Center');
var divide_data=require('./DivideDataByDivision');
var crime_data;

router.post('/', function (req,res) {
    switch (req.body.crime_type){
        case'assualt':
            crime_data=read_crime('Assualt_Class','Assult.xlsx','Assualt');
            break;
        case'break':
            crime_data=read_crime('break_and_enter_Class','Break_and_enter.xlsx','break_and_enter');
            break;
        case'robbery':
            crime_data=read_crime('Robbery_Class','Robbery.xlsx','Robbery');
            break;
        case'theft':
            crime_data=read_crime('Theft_Over_Class','Theft_Over.xlsx','Theft_Over');
            break;

    }

    var data_arr=divide_data(crime_data);
    var ellipse_center=[];
    var result=[];

    for(let i=0;i<data_arr.length;i++){
        var fourcenters=MeanCenter(data_arr[i]);
        ellipse_center[i]={x:(fourcenters[0].xMean+fourcenters[1].xMean+fourcenters[2].xMean+fourcenters[3].xMean)/4,y:
            (fourcenters[0].yMean+fourcenters[1].yMean+fourcenters[2].yMean+fourcenters[3].yMean)/4,points_num:data_arr[i].length};

    }
    ellipse_center[data_arr.length]=MeanCenter(crime_data);

    for(let i=0;i<17;i++){
        result[i]=Standard_ellipse(data_arr[i],ellipse_center[i]);
    }



    res.send({result:result});



})



var Standard_ellipse=function (data,ellipse_center) {

    var Center_X=ellipse_center.x;
    var Center_y=ellipse_center.y;
    var num=ellipse_center.points_num;
    var Ax=0;
    var Ay=0;
    var B=0;
    var C=0;
    var sumxy=0;
    var summmmmm=0;

    var sumSDEx=0,sumSDEy=0;

    for(let i=0;i<num;i++){

        sumSDEx=sumSDEx+Math.pow((data[i].geometry.coordinates[1]-Center_X),2)
    }


    var SDEx=Math.sqrt(sumSDEx/num);

    for(let i=0;i<num;i++){

        sumSDEy=sumSDEy+Math.pow((data[i].geometry.coordinates[0]-Center_y),2)
    }

    var SDEy=Math.sqrt(sumSDEy/num);



    for(let i=0;i<num;i++){
        Ax=Ax+Math.pow((Center_X-data[i].geometry.coordinates[1]),2);
    }
    for(let i=0;i<num;i++){
        Ay=Ay+Math.pow((Center_y-data[i].geometry.coordinates[0]),2);
    }

    var A=Ax-Ay;
    console.log('A:');
    console.log(A);
  /*  for(let i=0;i<num,i++;){
        let xx=Center_X-data[i].geometry.coordinates[1];
        let yy=Center_y-data[i].geometry.coordinates[0];
        console.log('xx:'+xx);
        console.log('yy:'+yy);
        //sumxy=sumxy+Math.pow(xx*yy,2);
        summmmmm=summmmmm+1;
    }*/



    for(let i=0;i<num;i++){
        let xx=Center_X-data[i].geometry.coordinates[1];
        let yy=Center_y-data[i].geometry.coordinates[0];
        console.log('xx:'+xx);
        console.log('yy:'+yy);
        sumxy=sumxy+Math.pow(xx*yy,2);
        summmmmm=summmmmm+1;
        console.log('summmm'+summmmmm);
    }
    console.log('summmmmmmm:'+summmmmm);////同一个函数写在不同位置作用不同？并且是上下行的关系？





    B=Math.sqrt(Math.pow(A,2)+4*Math.pow(sumxy,2));
    console.log('B:');
    console.log(B);
    C=2*sumxy;
    console.log('C:');
    console.log(C);
    var tanZeta=(A+B)/C;
    var degree=Math.atan(tanZeta);

    var aX=0,aY=0;

    for(let i=0;i<num;i++){

        aX=aX+Math.pow((((Center_X-data[i].geometry.coordinates[1])*Math.cos(degree))-((Center_X-data[i].geometry.coordinates[0])*Math.sin(degree))),2)
    }

    var aerfaX=Math.sqrt(2*aX/num);

    for(let i=0;i<num;i++){

        aY=aY+Math.pow((((Center_X-data[i].geometry.coordinates[1])*Math.sin(degree))+((Center_X-data[i].geometry.coordinates[0])*Math.cos(degree))),2)
    }

    var aerfaY=Math.sqrt(2*aY/num);
    var major;
    var minus;

   /* if(aerfaX-aerfaY>=0){
        major=aerfaX;
        minus=aerfaY;
    }

    else {
        major=aerfaY;
        minus=aerfaX;

    }*/

   if(SDEx-SDEy>0){
       major=SDEx;
       minus=SDEy;
   }else {
       major=SDEy;
       minus=SDEx;
   }


    var result={x:Center_X,y:Center_y,semi_major:major,semi_minus:minus,degree:degree};
    return result;




















}


module.exports=router;