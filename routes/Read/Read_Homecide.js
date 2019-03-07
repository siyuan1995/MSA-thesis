var express = require('express');
var router = express.Router();
var xlsx=require('xlsx');
var read_crime=require('./Read_Crime');
var Homecide_Class=require('../../public/CrimeData/Homecide_Class');
var workbook=xlsx.readFile('C:/Users/User/Desktop/crime data/CrimeData_xlsx/Homecide.xlsx');// The ERR that 'fs.readFile is not a function' is because the readFile only works on server side, but this code will be ran at client side


/* Find desired cell,the way to get a specific cell is worksheet['row'+'column'] *//*


/* Get the value. After get the specific cell, the value of the cell is cell.v */

router.post('/', function (req, res){
    console.log('get in Read_Homecide');
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var arr=[];
    for(var i=2;i<900;i++){
        var Lat = worksheet['K'+i];// if you want to combine strings, 'string'+number works, instead 'string'+'number' doesn't work
        var Long=worksheet['L'+i];
        var Year=worksheet['E'+i];
        var Month=worksheet['N'+i];
        var Day=worksheet['O'+i];
        var Time=worksheet['Q'+i];
        var Weekday='Not avaliable';
        var Division=worksheet['F'+i];
        var Neighborhood=worksheet['J'+i];
        var Index=i-2;

        if(Month.v==1) {Month.v='January'}
        else if(Month.v==2){Month.v='February'}
        else if(Month.v==3){Month.v='March'}
        else if(Month.v==4){Month.v='April'}
        else if(Month.v==5){Month.v='May'}
        else if(Month.v==6){Month.v='June'}
        else if(Month.v==7){Month.v='July'}
        else if(Month.v==8){Month.v='August'}
        else if(Month.v==9){Month.v='September'}
        else if(Month.v==10){Month.v='October'}
        else if(Month.v==11){Month.v='November'}
        else if(Month.v==12){Month.v='December'}

        if(Lat&&Long&&Year&&Month&&Day&&Time){
            var item=new Homecide_Class.events4crime(Index,Long.v,Lat.v,Year.v,Month.v,Day.v,Time.v,Weekday.v,Division.v,Neighborhood.v,'Homecide');
            //console.log(item.getJsonData())
            arr.push(item.getJsonData());
        }

    }


   res.send(arr);}

)




/*
router.post('/', function (req, res) {
    var arr=read_crime('Homecide_Class','Homecide.xlsx','Homecide')
    res.send(arr);


    }
)*/









module.exports=router;// if you make module.exports={router}, then the export stuff is a object, but if you want to make the router work, ii has to be a router without {}.


















/*module.exports={}*/// If you want to export functions, you can either module.export=function(){} OR module.exports={function_name: function}