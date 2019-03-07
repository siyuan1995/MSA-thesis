var express = require('express');
var router = express.Router();
var read_crime=require('../Read/Read_Crime');
var assualt=read_crime('Assualt_Class','Assult.xlsx','Assualt');
var breakEnter=read_crime('break_and_enter_Class','Break_and_enter.xlsx','break_and_enter');
var robbery=read_crime('Robbery_Class','Robbery.xlsx','Robbery');
var theft=read_crime('Theft_Over_Class','Theft_Over.xlsx','Theft_Over');


router.post('/',function (req,res) {

    var result1=Spatial_Correlation1(assualt,breakEnter,robbery,theft);
    var result2=Spatial_Correlation2(assualt,breakEnter,robbery,theft)


    res.send({result1:result1,result2:result2});}

)

var Spatial_Correlation1=function (Assualt,BreakEnter,Robbery,TheftOver) {

    var AB=0,AH=0,AR=0,AT=0,BA=0,BH=0,BR=0,BT=0,HA=0,HB=0,HR=0,HT=0,RA=0,RB=0,RH=0, RT=0, TA=0, TB=0, TH=0,TR=0;

    for(var i=0;i<Assualt.length;i++) {

        var assult_Break_arr=[];
        var assult_Homecide_arr=[];
        var assult_Robbery_arr=[];
        var assult_Theft_arr=[];

        for (var i_B = 0; i_B < BreakEnter.length; i_B++) {
            var d_AB = dis(Assualt[i], BreakEnter[i_B]);
            if(isNaN(d_AB)==false) {
                assult_Break_arr.push(d_AB);
            }
        }
        /* for(var i_H=0;i_H<Homecide.length;i_H++) {

             var d_AH = dis(Assualt[i], Homecide[i_H]);
             if(isNaN(d_AH)==false){
                 assult_Homecide_arr.push(d_AH);
             }
         }*/
        for(var i_R=0;i_R<Robbery.length;i_R++) {

            var d_AR = dis(Assualt[i], Robbery[i_R]);
            if(isNaN(d_AR)==false) {
                assult_Robbery_arr.push(d_AR);
            }
        }
        for(var i_T=0;i_T<TheftOver.length;i_T++) {

            var d_AT = dis(Assualt[i], TheftOver[i_T]);
            if(isNaN(d_AT)==false) {
                assult_Theft_arr.push(d_AT);
            }
        }

        var min_AB=Math.min.apply(null,assult_Break_arr);
        //var min_AH=Math.min.apply(null,assult_Homecide_arr);
        var min_AR=Math.min.apply(null,assult_Robbery_arr);
        var min_AT=Math.min.apply(null,assult_Theft_arr);

        var assult_minArr=[min_AB,min_AR,min_AT];
        //var assult_minArr=[min_AB,min_AR,min_AT];
        var min=Math.min.apply(null,assult_minArr);
        var min_index=assult_minArr.indexOf(min);

        switch (min_index) {
            case 0:
                AB++;
                break;
            /*case 1:
                AH++;
                break;*/
            case 1:
                AR++;
                break;
            case 2:
                AT++;
                break;

        }


    }// Assualt correlation

    var assult_arr=[{'AB':AB},{'AH':AH},{'AR':AR},{'AT':AT}];
    console.log(assult_arr);

    /////////////////////////////////////////////////////////

    for(let i=0;i<BreakEnter.length;i++){

        var break_assult_arr=[];
        var break_Homecide_arr=[];
        var break_Robbery_arr=[];
        var break_Theft_arr=[];

        for (let i_B = 0; i_B < Assualt.length; i_B++) {
            let d = dis(BreakEnter[i], Assualt[i_B]);
            if(isNaN(d)==false) {
                break_assult_arr.push(d);
            }
        }
        /* for(let i_H=0;i_H<Homecide.length;i_H++) {

             let d = dis(BreakEnter[i], Homecide[i_H]);
             if(isNaN(d)==false){
                 break_Homecide_arr.push(d);
             }
         }*/
        for(let i_R=0;i_R<Robbery.length;i_R++) {

            let d = dis(BreakEnter[i], Robbery[i_R]);
            if(isNaN(d)==false) {
                break_Robbery_arr.push(d);
            }
        }
        for(let i_T=0;i_T<TheftOver.length;i_T++) {

            let d = dis(BreakEnter[i], TheftOver[i_T]);
            if(isNaN(d)==false) {
                break_Theft_arr.push(d);
            }
        }

        let min_BA=Math.min.apply(null,break_assult_arr);
        //let min_BH=Math.min.apply(null,break_Homecide_arr);
        let min_BR=Math.min.apply(null,break_Robbery_arr);
        let min_BT=Math.min.apply(null,break_Theft_arr);

        let break_minArr=[min_BA,min_BR,min_BT];
        let min=Math.min.apply(null,break_minArr);
        let min_index=break_minArr.indexOf(min);

        switch (min_index) {
            case 0:
                BA++;
                break;
            /*case 1:
                BH++;
                break;*/
            case 1:
                BR++;
                break;
            case 2:
                BT++;
                break;

        }

    }// Break_Enter correlation

    var break_arr=[{'BA':BA},{'BH':BH},{'BR':BR},{'BT':BT}];
    console.log(break_arr);

    /////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////

    for(let i=0;i<Robbery.length;i++){

        var Robbery_assult_arr=[];
        var Robbery_break_arr=[];
        var Robbery_homecide_arr=[];
        var Robbery_Theft_arr=[];

        for (let i_B = 0; i_B < Assualt.length; i_B++) {
            let d = dis(Robbery[i], Assualt[i_B]);
            if(isNaN(d)==false) {
                Robbery_assult_arr.push(d);
            }
        }
        for(let i_H=0;i_H<BreakEnter.length;i_H++) {

            let d = dis(Robbery[i], BreakEnter[i_H]);
            if(isNaN(d)==false){
                Robbery_break_arr.push(d);
            }
        }
        /*      for(let i_R=0;i_R<Robbery.length;i_R++) {

                  let d = dis(Robbery[i], Homecide[i_R]);
                  if(isNaN(d)==false) {
                      Robbery_homecide_arr.push(d);
                  }
              }*/
        for(let i_T=0;i_T<TheftOver.length;i_T++) {

            let d = dis(Robbery[i], TheftOver[i_T]);
            if(isNaN(d)==false) {
                Robbery_Theft_arr.push(d);
            }
        }

        let min_RA=Math.min.apply(null,Robbery_assult_arr);
        let min_RB=Math.min.apply(null,Robbery_break_arr);
        //let min_RH=Math.min.apply(null,Robbery_homecide_arr);
        let min_RT=Math.min.apply(null,Robbery_Theft_arr);

        let robbery_minArr=[min_RA,min_RB,min_RT];
        let min=Math.min.apply(null,robbery_minArr);
        let min_index=robbery_minArr.indexOf(min);

        switch (min_index) {
            case 0:
                RA++;
                break;
            case 1:
                RB++;
                break;
            /* case 2:
                 RH++;
                 break;*/
            case 2:
                RT++;
                break;

        }

    }// Robbery correlation

    var robbery_arr=[{'RA':RA},{'RB':RB},{'RH':RH},{'RT':RT}];
    console.log(robbery_arr);

    //////////////////////////////////////////////////////////////////////////

    for(let i=0;i<TheftOver.length;i++){

        var Theft_assult_arr=[];
        var Theft_break_arr=[];
        var Theft_homecide_arr=[];
        var Theft_robbery_arr=[];

        for (let i_B = 0; i_B < Assualt.length; i_B++) {
            let d = dis(TheftOver[i], Assualt[i_B]);
            if(isNaN(d)==false) {
                Theft_assult_arr.push(d);
            }
        }
        for(let i_H=0;i_H<BreakEnter.length;i_H++) {

            let d = dis(TheftOver[i], BreakEnter[i_H]);
            if(isNaN(d)==false){
                Theft_break_arr.push(d);
            }
        }
        for(let i_R=0;i_R<Robbery.length;i_R++) {

            let d = dis(TheftOver[i], Robbery[i_R]);
            if(isNaN(d)==false) {
                Theft_robbery_arr.push(d);
            }
        }/*
        for(let i_T=0;i_T<Homecide.length;i_T++) {

            let d = dis(TheftOver[i], Homecide[i_T]);
            if(isNaN(d)==false) {
                Theft_homecide_arr.push(d);
            }
        }*/

        let min_TA=Math.min.apply(null,Theft_assult_arr);
        let min_TB=Math.min.apply(null,Theft_break_arr);
        //let min_TH=Math.min.apply(null,Theft_homecide_arr);
        let min_TR=Math.min.apply(null,Theft_robbery_arr);

        let Theft_minArr=[min_TA,min_TB,min_TR];
        let min=Math.min.apply(null,Theft_minArr);
        let min_index=Theft_minArr.indexOf(min);

        switch (min_index) {
            case 0:
                TA++;
                break;
            case 1:
                TB++;
                break;
            /*  case 2:
                  TH++;
                  break;*/
            case 2:
                TR++;
                break;

        }

    }// Theft correlation

    var Theft_arr=[{'TA':TA},{'TB':TB},{'TH':TH},{'TR':TR}];
    console.log(Theft_arr);

    var Crime_arr=[assult_arr,break_arr,robbery_arr,Theft_arr];


    return Crime_arr;

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

var getRad=function (d) {
    var PI = Math.PI;
    return d*PI/180.0;
}
var dis=function(p1,p2){
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

/*var Spatial_Correlation2=function(Assualt,BreakEnter,Robbery,TheftOver){

    var ass_value=0,break_value=0,robbery_value=0,theft_value=0;

    var array_no_assualt=BreakEnter.concat(Robbery,TheftOver);
    var array_no_break=Assualt.concat(Robbery,TheftOver);
    var array_no_robbery=BreakEnter.concat(Assualt,TheftOver);
    var array_no_theft=BreakEnter.concat(Robbery,Assualt);



    for(let i=0;i<Assualt.length;i++){
        let arr_i=[];
        for(let j=0;j<array_no_assualt.length;j++)
        {
            let dis=dis(Assualt[i],array_no_assualt[j]);
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





    }

    /!*for(let i=0;i<BreakEnter.length;i++){
        let arr_i=[];
        for(let j=0;j<array_no_assualt.length;j++)
        {
            let dis=dis(Assualt[i],array_no_assualt[j]);
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





    }

    for(let i=0;i<Robbery.length;i++){
        let arr_i=[];
        for(let j=0;j<array_no_assualt.length;j++)
        {
            let dis=dis(Assualt[i],array_no_assualt[j]);
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





    }

    for(let i=0;i<TheftOver.length;i++){
        let arr_i=[];
        for(let j=0;j<array_no_assualt.length;j++)
        {
            let dis=dis(Assualt[i],array_no_assualt[j]);
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





    }*!/

    return{breakvalue:break_value,robbervalue:robbery_value,theftvalue:theft_value}

}*/


module.exports=router;