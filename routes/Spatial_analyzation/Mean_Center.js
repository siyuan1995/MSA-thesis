var express = require('express');
var router = express.Router();
var read_crime=require('../Read/Read_Crime');
var MeanCenter=require('./Caculate_Mean_Center');
var divide_data=require('./DivideDataByDivision');
var crime_data;


router.post('/',function (req,res) {
    switch (req.body.crime_type){
        case'assualt':
            crime_data=read_crime('Assualt_Class','Assult.xlsx','Assualt',4000);
            break;
        case'break':
            crime_data=read_crime('break_and_enter_Class','Break_and_enter.xlsx','break_and_enter',4000);
            break;
        case'robbery':
            crime_data=read_crime('Robbery_Class','Robbery.xlsx','Robbery',4000);
            break;
        case'theft':
            crime_data=read_crime('Theft_Over_Class','Theft_Over.xlsx','Theft_Over',4000);
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



module.exports=router;