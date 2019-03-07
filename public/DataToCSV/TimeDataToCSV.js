/*var xlsx=require('xlsx');
var Assualt_Class=require('../public/CrimeData/Assualt_Class');
var workbook=xlsx.readFile('C:/Users/User/Desktop/crime data/CrimeData_xlsx/Assult.xlsx');
var first_sheet_name = workbook.SheetNames[0];
var worksheet = workbook.Sheets[first_sheet_name];
var arr=[];
for(var i=2;i<6;i++){
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
        var item=new Assualt_Class.Assualt_event(Index,Long.v,Lat.v,Year.v,Month.v,Day.v,Time.v,Weekday.v,Division.v,Neighborhood.v,'Assualt');
        //console.log(item.getJsonData())
        arr.push(item.getJsonData());
    }

}*/


var TimeDataToCSV=function (data) {
    var i0=0;
    var i1=0;
    var i2=0;
    var i3=0;
    var i4=0;
    var i5=0;
    var i6=0;
    var i7=0;
    var i8=0;
    var i9=0;
    var i10=0;
    var i11=0;
    var i12=0;
    var i13=0;
    var i14=0;
    var i15=0;
    var i16=0;
    var i17=0;
    var i18=0;
    var i19=0;
    var i20=0;
    var i21=0;
    var i22=0;
    var i23=0;
    var i24=0;


    for(var p=0;p<data.length;p++) {
        switch (data[p].properties.Time) {
            case 0:
                i0++;
                break;
            case 1:
                i1++;
                break;
            case 2:
                i2++;
                break;
            case 3:
                i3++;
                break;
            case 4:
                i4++;
                break;
            case 5:
                i5++;
                break;
            case 6:
                i6++;
                break;
            case 7:
                i7++;
                break;
            case 8:
                i8++;
                break;
            case 9:
                i9++;
                break;
            case 10:
                i10++;
                break;
            case 11:
                i11++;
                break;
            case 12:
                i12++;
                break;
            case 13:
                i13++;
                break;
            case 14:
                i14++;
                break;
            case 15:
                i15++;
                break;
            case 16:
                i16++;
                break;
            case 17:
                i17++;
                break;
            case 18:
                i18++;
                break;
            case 19:
                i19++;
                break;
            case 20:
                i20++;
                break;
            case 21:
                i21++;
                break;
            case 22:
                i22++;
                break;
            case 23:
                i23++;
                break;
            case 24:
                i24++;
                break;





        }
    }

var arr=[{'Dtime':0,'frequency':i0},{'Dtime':1,'frequency':i1},{'Dtime':2,'frequency':i2},{'Dtime':3,'frequency':i3},{'Dtime':4,'frequency':i4},{'Dtime':5,'frequency':i5},{'Dtime':6,'frequency':i6},{'Dtime':7,'frequency':i7},{'Dtime':8,'frequency':i8},{'Dtime':9,'frequency':i9},{'Dtime':10,'frequency':i10},{'Dtime':11,'frequency':i11},{'Dtime':12,'frequency':i12},{'Dtime':13,'frequency':i13},{'Dtime':14,'frequency':i14},{'Dtime':15,'frequency':i15},{'Dtime':16,'frequency':i16},{'Dtime':17,'frequency':i17},{'Dtime':18,'frequency':i18},{'Dtime':19,'frequency':i19},{'Dtime':20,'frequency':i20},{'Dtime':21,'frequency':i21},{'Dtime':22,'frequency':i22},{'Dtime':23,'frequency':i23},{'Dtime':24,'frequency':i24}]
return arr;

}

module.exports=TimeDataToCSV;



