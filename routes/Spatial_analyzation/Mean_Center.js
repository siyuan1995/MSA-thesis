var express = require('express');
var router = express.Router();
var read_crime=require('../Read/Read_Crime');
var MeanCenter=require('./Caculate_Mean_Center');
var divide_data=require('./DivideDataByDivision');
var crime_data;





router.post('/',function (req,res) {
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
    var result=[];
    for(let i=0;i<data_arr.length;i++){
        result[i]=MeanCenter(data_arr[i]);
    }
    result[data_arr.length]=MeanCenter(crime_data);


/*    var result=MeanCenter(crime_data);
    console.log(req.body.crime_type);*/
    res.send(result);
})


/*var MeanCenter=function (data) {
     var X_Mean,Y_Mean;
     //var mean_0=0,mean_1=0,mean_2=0,mean_3=0,mean_4=0,mean_5=0,mean_6=0,mean_7=0,mean_8=0,mean_9=0,mean_10=0,mean_11=0,mean_12=0,mean_13=0,mean_14=0,mean_15=0,mean_16=0,mean_17=0,mean_18=0,mean_19=0,mean_20=0,mean_21=0,mean_22=0,mean_23=0;
     var xSum=[];
     var ySum=[];
     var num=[]
     var result=[];
     for(let i=0;i<24;i++){
         xSum[i]=0;
         ySum[i]=0;
         num[i]=0;


     }
     for(let i=0;i<data.length;i++) {
         switch (data[i].properties.Time) {
             case 0:
                 xSum[0]=xSum[0]+data[i].geometry.coordinates[0];
                 ySum[0]=ySum[0]+data[i].geometry.coordinates[1];
                 num[0]=num[0]+1;
                 break;
             case 1:
                 xSum[0]=xSum[0]+data[i].geometry.coordinates[0];
                 ySum[0]=ySum[0]+data[i].geometry.coordinates[1];
                 num[0]=num[0]+1;
                 break;
             case 2:
                 xSum[0]=xSum[0]+data[i].geometry.coordinates[0];
                 ySum[0]=ySum[0]+data[i].geometry.coordinates[1];
                 num[0]=num[0]+1;
                 break;

             case 3:
                 xSum[0]=xSum[0]+data[i].geometry.coordinates[0];
                 ySum[0]=ySum[0]+data[i].geometry.coordinates[1];
                 num[0]=num[0]+1;
                 break;

             case 4:
                 xSum[0]=xSum[0]+data[i].geometry.coordinates[0];
                 ySum[0]=ySum[0]+data[i].geometry.coordinates[1];
                 num[0]=num[0]+1;
                 break;

             case 5:
                 xSum[0]=xSum[0]+data[i].geometry.coordinates[0];
                 ySum[0]=ySum[0]+data[i].geometry.coordinates[1];
                 num[0]=num[0]+1;
                 break;

             case 6:
                 xSum[1]=xSum[1]+data[i].geometry.coordinates[0];
                 ySum[1]=ySum[1]+data[i].geometry.coordinates[1];
                 num[1]=num[1]+1;
                 break;

             case 7:
                 xSum[1]=xSum[1]+data[i].geometry.coordinates[0];
                 ySum[1]=ySum[1]+data[i].geometry.coordinates[1];
                 num[1]=num[1]+1;
                 break;

             case 8:
                 xSum[1]=xSum[1]+data[i].geometry.coordinates[0];
                 ySum[1]=ySum[1]+data[i].geometry.coordinates[1];
                 num[1]=num[1]+1;
                 break;

             case 9:
                 xSum[1]=xSum[1]+data[i].geometry.coordinates[0];
                 ySum[1]=ySum[1]+data[i].geometry.coordinates[1];
                 num[1]=num[1]+1;
                 break;

             case 10:
                 xSum[1]=xSum[1]+data[i].geometry.coordinates[0];
                 ySum[1]=ySum[1]+data[i].geometry.coordinates[1];
                 num[1]=num[1]+1;
                 break;

             case 11:
                 xSum[1]=xSum[1]+data[i].geometry.coordinates[0];
                 ySum[1]=ySum[1]+data[i].geometry.coordinates[1];
                 num[1]=num[1]+1;
                 break;
             case 12:
                 xSum[2]=xSum[2]+data[i].geometry.coordinates[0];
                 ySum[2]=ySum[2]+data[i].geometry.coordinates[1];
                 num[2]=num[2]+1;
                 break;

             case 13:
                 xSum[2]=xSum[2]+data[i].geometry.coordinates[0];
                 ySum[2]=ySum[2]+data[i].geometry.coordinates[1];
                 num[2]=num[2]+1;
                 break;

             case 14:
                 xSum[2]=xSum[2]+data[i].geometry.coordinates[0];
                 ySum[2]=ySum[2]+data[i].geometry.coordinates[1];
                 num[2]=num[2]+1;
                 break;
             case 15:
                 xSum[2]=xSum[2]+data[i].geometry.coordinates[0];
                 ySum[2]=ySum[2]+data[i].geometry.coordinates[1];
                 num[2]=num[2]+1;
                 break;
             case 16:
                 xSum[2]=xSum[2]+data[i].geometry.coordinates[0];
                 ySum[2]=ySum[2]+data[i].geometry.coordinates[1];
                 num[2]=num[2]+1;
                 break;
             case 17:
                 xSum[2]=xSum[2]+data[i].geometry.coordinates[0];
                 ySum[2]=ySum[2]+data[i].geometry.coordinates[1];
                 num[2]=num[2]+1;
                 break;
             case 18:
                 xSum[3]=xSum[3]+data[i].geometry.coordinates[0];
                 ySum[3]=ySum[3]+data[i].geometry.coordinates[1];
                 num[3]=num[3]+1;
                 break;
             case 19:
                 xSum[3]=xSum[3]+data[i].geometry.coordinates[0];
                 ySum[3]=ySum[3]+data[i].geometry.coordinates[1];
                 num[3]=num[3]+1;
                 break;
             case 20:
                 xSum[3]=xSum[3]+data[i].geometry.coordinates[0];
                 ySum[3]=ySum[3]+data[i].geometry.coordinates[1];
                 num[3]=num[3]+1;
                 break;
             case 21:
                 xSum[3]=xSum[3]+data[i].geometry.coordinates[0];
                 ySum[3]=ySum[3]+data[i].geometry.coordinates[1];
                 num[3]=num[3]+1;
                 break;
             case 22:
                 xSum[3]=xSum[3]+data[i].geometry.coordinates[0];
                 ySum[3]=ySum[3]+data[i].geometry.coordinates[1];
                 num[3]=num[3]+1;
                 break;
             case 23:
                 xSum[3]=xSum[3]+data[i].geometry.coordinates[0];
                 ySum[3]=ySum[3]+data[i].geometry.coordinates[1];
                 num[3]=num[3]+1;
                 break;


         }

     }

     for(let i=0;i<4;i++){
         result[i]={xMean:xSum[i]/num[i],yMean:ySum[i]/num[i]};
     }

     return result;

}*/

/*var divide_data=function(data){
    var arr=[]
   for (let i=0;i<17;i++){
       arr[i]=new Array();
   }
    for(let i=0;i<data.length;i++){
        switch(data[i].properties.Division)
        {
            case 'D11':
                arr[0].push(data[i]);
                break;
            case 'D12':
                arr[1].push(data[i]);
                break;
            case 'D13':
                arr[2].push(data[i]);
                break;
            case 'D14':
                arr[3].push(data[i]);
                break;
            case 'D51':
                arr[4].push(data[i]);
                break;
            case 'D52':
                arr[5].push(data[i]);
                break;
            case 'D53':
                arr[6].push(data[i]);
                break;
            case 'D54':
                arr[7].push(data[i]);
                break;
            case 'D55':
                arr[8].push(data[i]);
                break;
            case 'D22':
                arr[9].push(data[i]);
                break;
            case 'D23':
                arr[10].push(data[i]);
                break;
            case 'D31':
                arr[11].push(data[i]);
                break;
            case 'D32':
                arr[12].push(data[i]);
                break;
            case 'D33':
                arr[13].push(data[i]);
                break;
            case 'D41':
                arr[14].push(data[i]);
                break;
            case 'D42':
                arr[15].push(data[i]);
                break;
            case 'D43':
                arr[16].push(data[i]);
                break;

        }

    }

    return arr;

}*/

module.exports=router;