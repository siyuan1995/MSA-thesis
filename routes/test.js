var express = require('express');
var router = express.Router();
var read_crime=require('./Read/Read_Crime');
var assualt=read_crime('Assualt_Class','Assult.xlsx','Assualt');
var breakEnter=read_crime('break_and_enter_Class','Break_and_enter.xlsx','break_and_enter');
var robbery=read_crime('Robbery_Class','Robbery.xlsx','Robbery');
var theft=read_crime('Theft_Over_Class','Theft_Over.xlsx','Theft_Over');


var getRad=function (d) {
    var PI = Math.PI;
    return d*PI/180.0;
}
var getdis=function(p1,p2){
    if(p1.geometry.coordinates&&p2.geometry.coordinates) {
        var lat1 = p1.geometry.coordinates[1];
        var lat2 = p2.geometry.coordinates[1];
        var lng1 = p1.geometry.coordinates[0];
        var lng2 = p2.geometry.coordinates[0];


        var f = getRad((lat1 + lat2) / 2);
        var g = getRad((lat1 - lat2) / 2);
        var l = getRad((lng1 - lng2) / 2);
        var sg = Math.sin(g);
        var sl = Math.sin(l);
        var sf = Math.sin(f);
        var s, c, w, r, d, h1, h2;
        var a = 6378137.0;//The Radius of eath in meter.
        var fl = 1 / 298.257;
        sg = sg * sg;
        sl = sl * sl;
        sf = sf * sf;
        s = sg * (1 - sl) + (1 - sf) * sl;
        c = (1 - sg) * (1 - sl) + sf * sl;
        w = Math.atan(Math.sqrt(s / c));
        r = Math.sqrt(s * c) / w;
        d = 2 * w * a;
        h1 = (3 * r - 1) / 2 / c;
        h2 = (3 * r + 1) / 2 / s;
        s = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
        s = s / 1000;
        s = s.toFixed(2);//指定小数点后的位数。
        return s;
    }
    else return NaN;
}

var Spatial_Correlation2=function(Assualt,BreakEnter,Robbery,TheftOver){

    var break_value=0,robbery_value=0,theft_value=0;
    var brk_ass_value=0,brk_rob_valu=0,brk_theft_value=0;
    var rob_ass_value=0,rob_brk_value=0,rob_theft_value=0;
    var theft_ass_value=0,theft_brk_value=0,theft_rob_value=0;

    var array_no_assualt=BreakEnter.concat(Robbery,TheftOver);
    var array_no_break=Assualt.concat(Robbery,TheftOver);
    var array_no_robbery=BreakEnter.concat(Assualt,TheftOver);
    var array_no_theft=BreakEnter.concat(Robbery,Assualt);



    for(let i=0;i<Assualt.length;i++){
        let arr_i=[];
        for(let j=0;j<array_no_assualt.length;j++)
        {
            let dis=getdis(Assualt[i],array_no_assualt[j]);
            if(isNaN(dis)==false){
                let obj={
                    distance:dis,
                    crime_type:array_no_assualt[j].properties.Crime_type,
                    index:j
                }
                arr_i.push(obj);}
        }
        arr_i.sort(function (a,b) {
            return a.distance-b.distance // js array sort method
        });



        for(let k=0;k<3;k++){
            if(arr_i[k].crime_type=='break_and_enter'){
                break_value=break_value+1/arr_i[k].distance;
            }
            if(arr_i[k].crime_type=='Robbery'){
                robbery_value=robbery_value+1/arr_i[k].distance;
            }
            if(arr_i[k].crime_type=='Theft_Over'){
                theft_value=theft_value+1/arr_i[k].distance;
            }

        }





    }// caculation for assualt

    for(let i=0;i<BreakEnter.length;i++){
        let arr_i=[];
        for(let j=0;j<array_no_break.length;j++)
        {
            let dis=getdis(BreakEnter[i],array_no_break[j]);
            if(isNaN(dis)==false){
                let obj={
                    distance:dis,
                    crime_type:array_no_break[j].properties.Crime_type,
                    index:j
                }
                arr_i.push(obj);}
        }
        arr_i.sort(function (a,b) {
            return a.distance-b.distance // js array sort method
        });

        for(let k=0;k<3;k++){
            if(arr_i[k].crime_type=='Assualt'){
                brk_ass_value=brk_ass_value+1/arr_i[k].distance;
            }
            if(arr_i[k].crime_type=='Robbery'){
                brk_rob_valu=brk_rob_valu+1/arr_i[k].distance;
            }
            if(arr_i[k].crime_type=='Theft_Over'){
                brk_theft_value=brk_theft_value+1/arr_i[k].distance;
            }

        }





    }// caculation for break_Enter

    for(let i=0;i<Robbery.length;i++){
        let arr_i=[];
        for(let j=0;j<array_no_robbery.length;j++)
        {
            let dis=getdis(Robbery[i],array_no_robbery[j]);
            if(isNaN(dis)==false){
                let obj={
                    distance:dis,
                    crime_type:array_no_robbery[j].properties.Crime_type,
                    index:j
                }
                arr_i.push(obj);}
        }
        arr_i.sort(function (a,b) {
            return a.distance-b.distance // js array sort method
        });

        for(let k=0;k<3;k++){
            if(arr_i[k].crime_type=='break_and_enter'){
                rob_brk_value=rob_brk_value+1/arr_i[k].distance;
            }
            if(arr_i[k].crime_type=='Assualt'){
                rob_ass_value=rob_ass_value+1/arr_i[k].distance;
            }
            if(arr_i[k].crime_type=='Theft_Over'){
                rob_theft_value=rob_theft_value+1/arr_i[k].distance;
            }

        }





    }// caculation for robbery

    for(let i=0;i<TheftOver.length;i++){
        let arr_i=[];
        for(let j=0;j<array_no_theft.length;j++)
        {
            let dis=getdis(TheftOver[i],array_no_theft[j]);
            if(isNaN(dis)==false){
                let obj={
                    distance:dis,
                    crime_type:array_no_theft[j].properties.Crime_type,
                    index:j
                }
                arr_i.push(obj);}
        }
        arr_i.sort(function (a,b) {
            return a.distance-b.distance // js array sort method
        });

        for(let k=0;k<3;k++){
            if(arr_i[k].crime_type=='break_and_enter'){
                theft_brk_value=theft_brk_value+1/arr_i[k].distance;
            }
            if(arr_i[k].crime_type=='Robbery'){
                theft_rob_value=theft_rob_value+1/arr_i[k].distance;
            }
            if(arr_i[k].crime_type=='Assualt'){
                theft_ass_value=theft_ass_value+1/arr_i[k].distance;
            }

        }





    }// caculation for theft

    return{
        ass_breakvalue:break_value,ass_robbervalue:robbery_value,ass_theftvalue:theft_value,
        brk_ass_value:brk_ass_value,brk_rob_valu:brk_rob_valu,brk_theft_value:brk_theft_value,
        rob_ass_value:rob_ass_value,rob_brk_value:rob_brk_value,rob_theft_value:rob_theft_value,
        theft_ass_value:theft_ass_value,theft_brk_value:theft_brk_value,theft_rob_value:theft_rob_value

    }

}

var result2=Spatial_Correlation2(assualt,breakEnter,robbery,theft);

console.log(result2);