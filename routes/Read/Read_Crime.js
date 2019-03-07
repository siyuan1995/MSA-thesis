var read_crime=function (crime_class_name,crime_path,crime_name)  {
    var xlsx=require('xlsx');
    var Crime_class=require('../../public/CrimeData/'+crime_class_name);
    var workbook=xlsx.readFile('C:/Users/User/Desktop/crime data/CrimeData_xlsx/'+crime_path);
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var arr=[];
    for(var i=2;i<4000;i++){
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

        if(Lat&&Long&&Year&&Month&&Day&&Time&&Weekday&&Division&&Neighborhood){
            var item=new Crime_class.events4crime(Index,Long.v,Lat.v,Year.v,Month.v,Day.v,Time.v,Weekday.v,Division.v,Neighborhood.v,crime_name);
            //console.log(item.getJsonData())
            arr.push(item.getJsonData());//Assualt
        }

    }
    return arr;

}

module.exports=read_crime;