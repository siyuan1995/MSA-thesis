var express = require('express');
var router = express.Router();
var xlsx=require('xlsx');
var break_Class=require('../public/CrimeData/break_and_enter_Class');
var workbook=xlsx.readFile('C:/Users/User/Desktop/crime data/CrimeData_xlsx/Break_and_enter.xlsx');// The ERR that 'fs.readFile is not a function' is because the readFile only works on server side, but this code will be ran at client side


/* Find desired cell,the way to get a specific cell is worksheet['row'+'column'] *//*


/* Get the value. After get the specific cell, the value of the cell is cell.v */

router.post('/', function (req, res){
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var arr=[];
    for(var i=2;i<1000;i++){
        var Lat = worksheet['AA'+i];// if you want to combine strings, 'string'+number works, instead 'string'+'number' doesn't work
        var Long=worksheet['AB'+i];
        var Year=worksheet['Q'+i];
        var Month=worksheet['R'+i];
        var Day=worksheet['S'+i];
        var Time=worksheet['V'+i];
        var Weekday=worksheet['U'+i];
        var Division=worksheet['X'+i];
        var Neighborhood=worksheet['Z'+i];
        var Index=i-2;

        if(Lat&&Long&&Year&&Month&&Day&&Time){
            var item=new break_Class.break_event(Index,Long.v,Lat.v,Year.v,Month.v,Day.v,Time.v,Weekday.v,Division.v,Neighborhood.v,'break_and_enter');
            //console.log(item.getJsonData())
            arr.push(item.getJsonData());
        }

    }
    res.send(arr);}

)










//module.exports={Assualt_Data:arr};
module.exports=router;// if you make module.exports={router}, then the export stuff is a object, but if you want to make the router work, ii has to be a router without {}.


















/*module.exports={}*/// If you want to export functions, you can either module.export=function(){} OR module.exports={function_name: function}