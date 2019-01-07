var DivisonDataToCSV=function (data) {

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


    for(var p=0;p<data.length;p++) {// Problems here to notice: 1. To decide  if strings are the same, use '==='. 2. Some strings may contain blank, use str.replace(/\s+/g,"") to get rid of blanks.
        if(data[p].properties.Division.replace(/\s+/g,"")==='D11'){
            i1++;
        }

        else if(data[p].properties.Division.replace(/\s+/g,"")==='D12'){
            i2++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D13'){
            i3++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D14'){
            i4++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D51'){
            i5++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D52'){
            i6++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D53'){
            i7++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D54'){
            i8++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D55'){
            i9++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D22'){
            i10++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D23'){
            i11++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D31'){
            i12++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D32'){
            i13++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D33'){
            i14++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D41'){
            i15++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D42'){
            i16++;
        }
        else if(data[p].properties.Division.replace(/\s+/g,"")==='D43'){
            i17++;
        }



    }

    var arr={'children':    [{Division:'D11',frequency:i1},{Division:'D12',frequency:i2},{Division:'D13',frequency:i3},{Division:'D14',frequency:i4},{Division:'D51',frequency:i5},{Division:'D52',frequency:i6},{Division:'D53',frequency:i7},{Division:'D54',frequency:i8},{Division:'D55',frequency:i9},{Division:'D22',frequency:i10},{Division:'D23',frequency:i11},{Division:'D31',frequency:i12},{Division:'D32',frequency:i13},{Division:'D33',frequency:i14},{Division:'D41',frequency:i15},{Division:'D42',frequency:i16},{Division:'D43',frequency:i17}]}

    return arr;



}


module.exports=DivisonDataToCSV;