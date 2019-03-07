//var Assualt_data=require('../../routes/Read_Assualt');// js path problem, single '../' means to go to the upper level of this directory,
// if you want to go the level above the upper level, then add one more '../'


var Spatial_Correlation=function (Assualt,BreakEnter,Homecide,Robbery,TheftOver) {


    var AB=0;
    var AH=0;
    var AR=0;
    var AT=0;
    var BA=0;
    var BH=0;
    var BR=0;
    var BT=0;
    var HA=0;
    var HB=0;
    var HR=0;
    var HT=0;
    var RA=0;
    var RB=0;
    var RH=0;
    var RT=0;
    var TA=0;
    var TB=0;
    var TH=0;
    var TR=0;



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

  /*  for(let i=0;i<Homecide.length;i++){

        var Homecide_assult_arr=[];
        var Homecide_break_arr=[];
        var Homecide_Robbery_arr=[];
        var Homecide_Theft_arr=[];

        for (let i_B = 0; i_B < Assualt.length; i_B++) {
            let d = dis(Homecide[i], Assualt[i_B]);
            if(isNaN(d)==false) {
                Homecide_assult_arr.push(d);
            }
        }
        for(let i_H=0;i_H<BreakEnter.length;i_H++) {

            let d = dis(Homecide[i], BreakEnter[i_H]);
            if(isNaN(d)==false){
                Homecide_break_arr.push(d);
            }
        }
        for(let i_R=0;i_R<Robbery.length;i_R++) {

            let d = dis(Homecide[i], Robbery[i_R]);
            if(isNaN(d)==false) {
                Homecide_Robbery_arr.push(d);
            }
        }
        for(let i_T=0;i_T<TheftOver.length;i_T++) {

            let d = dis(Homecide[i], TheftOver[i_T]);
            if(isNaN(d)==false) {
                Homecide_Theft_arr.push(d);
            }
        }

        let min_HA=Math.min.apply(null,Homecide_assult_arr);
        let min_HB=Math.min.apply(null,Homecide_break_arr);
        let min_HR=Math.min.apply(null,Homecide_Robbery_arr);
        let min_HT=Math.min.apply(null,Homecide_Theft_arr);

        let homecide_minArr=[min_HA,min_HB,min_HR,min_HT];
        let min=Math.min.apply(null,homecide_minArr);
        let min_index=homecide_minArr.indexOf(min);

        switch (min_index) {
            case 0:
                HA++;
                break;
            case 1:
                HB++;
                break;
            case 2:
                HR++;
                break;
            case 3:
                HT++;
                break;

        }

    }// Homecide correlation

    var homecide_arr=[{'HA':HA},{'HB':HB},{'HR':HR},{'HT':HT}];
    console.log(homecide_arr);*/

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

module.exports=Spatial_Correlation;