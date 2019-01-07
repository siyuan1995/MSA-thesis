
var MonthDataToCSV=function (data) {

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




    for(var p=0;p<data.length;p++) {// Problems here to notice: 1. To decide  if strings are the same, use '==='. 2. Some strings may contain blank, use str.replace(/\s+/g,"") to get rid of blanks.
            if(data[p].properties.Month.replace(/\s+/g,"")==='January'){
            i1++;
        }

        else if(data[p].properties.Month.replace(/\s+/g,"")==='February'){
            i2++;
        }
        else if(data[p].properties.Month.replace(/\s+/g,"")==='March'){
            i3++;
        }
        else if(data[p].properties.Month.replace(/\s+/g,"")==='April'){
            i4++;
        }
        else if(data[p].properties.Month.replace(/\s+/g,"")==='May'){
            i5++;
        }
        else if(data[p].properties.Month.replace(/\s+/g,"")==='June'){
            i6++;
        }
        else if(data[p].properties.Month.replace(/\s+/g,"")==='July'){
            i7++;
        }
        else if(data[p].properties.Month.replace(/\s+/g,"")==='August'){
                i8++;
            }
            else if(data[p].properties.Month.replace(/\s+/g,"")==='September'){
                i9++;
            }
            else if(data[p].properties.Month.replace(/\s+/g,"")==='October'){
                i10++;
            }
            else if(data[p].properties.Month.replace(/\s+/g,"")==='November'){
                i11++;
            }
            else if(data[p].properties.Month.replace(/\s+/g,"")==='December'){
                i12++;
            }



    }

    var arr=[{Month:'January',frequency:i1},{Month:'February',frequency:i2},{Month:'March',frequency:i3},{Month:'April',frequency:i4},{Month:'May',frequency:i5},{Month:'June',frequency:i6},{Month:'July',frequency:i7},{Month:'August',frequency:i8},{Month:'September',frequency:i9},{Month:'October',frequency:i10},{Month:'November',frequency:i11},{Month:'December',frequency:i12}]

    return arr;

}

module.exports=MonthDataToCSV;