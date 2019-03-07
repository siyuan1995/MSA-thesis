var express = require('express');
var router = express.Router();
var xlsx=require('xlsx');
var Assualt_Class=require('../../public/CrimeData/Assualt_Class');
var break_and_enter_Class=require('../../public/CrimeData/break_and_enter_Class');
var Robbery_Class=require('../../public/CrimeData/Robbery_Class');
var Theft_Over_Class=require('../../public/CrimeData/Theft_Over_Class');

/*var assualt_workbook=xlsx.readFile('C:/Users/User/Desktop/crime data/CrimeData_xlsx/Assult.xlsx');
var break_workbook=xlsx.readFile('C:/Users/User/Desktop/crime data/CrimeData_xlsx/Break_and_enter.xlsx');
var robbery_workbook=xlsx.readFile('C:/Users/User/Desktop/crime data/CrimeData_xlsx/Robbery.xlsx');
var theft_workbook=xlsx.readFile('C:/Users/User/Desktop/crime data/CrimeData_xlsx/Theft_Over.xlsx');*/



/*var assualtC=function(){
    var assualt_sname = assualt_workbook.SheetNames[0];
    var a_worksheet = assualt_workbook.Sheets[assualt_sname];
    var assualt_arr=[];
    for(var i=2;i<1000;i++){
        var Lat = a_worksheet['AA'+i];// if you want to combine strings, 'string'+number works, instead 'string'+'number' doesn't work
        var Long=a_worksheet['AB'+i];
        var Year=a_worksheet['Q'+i];
        var Month=a_worksheet['R'+i];
        var Day=a_worksheet['S'+i];
        var Time=a_worksheet['V'+i];
        var Weekday=a_worksheet['U'+i];
        var Division=a_worksheet['X'+i];
        var Neighborhood=a_worksheet['Z'+i];
        var Index=i-2;

        if(Lat&&Long&&Year&&Month&&Day&&Time&&Weekday&&Division&&Neighborhood){
            var item=new Assualt_Class.Assualt_event(Index,Long.v,Lat.v,Year.v,Month.v,Day.v,Time.v,Weekday.v,Division.v,Neighborhood.v,'Assualt');
            //console.log(item.getJsonData())
            assualt_arr.push(item.getJsonData());
        }

    }

    return assualt_arr;
}

var breakC=function(){
    var break_sname = break_workbook.SheetNames[0];
    var b_worksheet = break_workbook.Sheets[break_sname];
    var break_arr=[];
    for(var i=2;i<1000;i++){
        var Lat = b_worksheet['AA'+i];// if you want to combine strings, 'string'+number works, instead 'string'+'number' doesn't work
        var Long=b_worksheet['AB'+i];
        var Year=b_worksheet['Q'+i];
        var Month=b_worksheet['R'+i];
        var Day=b_worksheet['S'+i];
        var Time=b_worksheet['V'+i];
        var Weekday=b_worksheet['U'+i];
        var Division=b_worksheet['X'+i];
        var Neighborhood=b_worksheet['Z'+i];
        var Index=i-2;

        if(Lat&&Long&&Year&&Month&&Day&&Time&&Weekday&&Division&&Neighborhood){
            var item=new Assualt_Class.Assualt_event(Index,Long.v,Lat.v,Year.v,Month.v,Day.v,Time.v,Weekday.v,Division.v,Neighborhood.v,'Assualt');
            //console.log(item.getJsonData())
            break_arr.push(item.getJsonData());
        }

    }

    return break_arr;
}

var robberyC=function(){

    var robbery_sname = robbery_workbook.SheetNames[0];
    var r_worksheet = robbery_workbook.Sheets[robbery_sname];
    var robbery_arr=[];
    for(var i=2;i<1000;i++){
        var Lat = r_worksheet['AA'+i];// if you want to combine strings, 'string'+number works, instead 'string'+'number' doesn't work
        var Long=r_worksheet['AB'+i];
        var Year=r_worksheet['Q'+i];
        var Month=r_worksheet['R'+i];
        var Day=r_worksheet['S'+i];
        var Time=r_worksheet['V'+i];
        var Weekday=r_worksheet['U'+i];
        var Division=r_worksheet['X'+i];
        var Neighborhood=r_worksheet['Z'+i];
        var Index=i-2;

        if(Lat&&Long&&Year&&Month&&Day&&Time&&Weekday&&Division&&Neighborhood){
            var item=new Assualt_Class.Assualt_event(Index,Long.v,Lat.v,Year.v,Month.v,Day.v,Time.v,Weekday.v,Division.v,Neighborhood.v,'Assualt');
            //console.log(item.getJsonData())
            robbery_arr.push(item.getJsonData());
        }

    }

    return robbery_arr;
}

var theftC=function(){

    var t_sname = theft_workbook.SheetNames[0];
    var t_worksheet = theft_workbook.Sheets[t_sname];
    var theft_arr=[];
    for(var i=2;i<1000;i++){
        var Lat = t_worksheet['AA'+i];// if you want to combine strings, 'string'+number works, instead 'string'+'number' doesn't work
        var Long=t_worksheet['AB'+i];
        var Year=t_worksheet['Q'+i];
        var Month=t_worksheet['R'+i];
        var Day=t_worksheet['S'+i];
        var Time=t_worksheet['V'+i];
        var Weekday=t_worksheet['U'+i];
        var Division=t_worksheet['X'+i];
        var Neighborhood=t_worksheet['Z'+i];
        var Index=i-2;

        if(Lat&&Long&&Year&&Month&&Day&&Time&&Weekday&&Division&&Neighborhood){
            var item=new Assualt_Class.Assualt_event(Index,Long.v,Lat.v,Year.v,Month.v,Day.v,Time.v,Weekday.v,Division.v,Neighborhood.v,'Assualt');
            //console.log(item.getJsonData())
            theft_arr.push(item.getJsonData());
        }

    }
    return theft_arr;
}*/

router.post('/', function (req, res){

/*var assualt_arr=assualtC();
var break_arr=breakC();
var robbery_arr=robberyC();
var theft_arr=theftC();*/

/*
var Crime_arr=[{name:'assualt_arr',values:assualt_arr},{name:'break_arr',values:break_arr},{name:'robbery_arr',values:robbery_arr},{name:'theft_arr',values:theft_arr}];
*/





    //res.set('Cache-Control', 'public, max-age=31557600');
    res.send('Crime_arr');}

)


module.exports=router;