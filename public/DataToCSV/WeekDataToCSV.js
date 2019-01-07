
var WeekDataToCSV=function (data) {

    var i1 = 0;
    var i2 = 0;
    var i3 = 0;
    var i4 = 0;
    var i5 = 0;
    var i6 = 0;
    var i7 = 0;


    for (var p = 0; p < data.length; p++) {// Problems here to notice: 1. To decide  if strings are the same, use '==='. 2. Some strings may contain blank, use str.replace(/\s+/g,"") to get rid of blanks.
        if (data[p].properties.Weekday&&data[p].properties.Weekday.replace(/\s+/g, "") === 'Monday') {
            i1++;
        }

        else if (data[p].properties.Weekday&&data[p].properties.Weekday.replace(/\s+/g, "") === 'Tuesday') {
            i2++;
        }
        else if (data[p].properties.Weekday&&data[p].properties.Weekday.replace(/\s+/g, "") === 'Wednesday') {
            i3++;
        }
        else if (data[p].properties.Weekday&&data[p].properties.Weekday.replace(/\s+/g, "") === 'Thursday') {
            i4++;
        }
        else if (data[p].properties.Weekday&&data[p].properties.Weekday.replace(/\s+/g, "") === 'Friday') {
            i5++;
        }
        else if (data[p].properties.Weekday&&data[p].properties.Weekday.replace(/\s+/g, "") === 'Saturday') {
            i6++;
        }
        else if (data[p].properties.Weekday&&data[p].properties.Weekday.replace(/\s+/g, "") === 'Sunday') {
            i7++;
        }


    }


    var arr = [{Weekday: 'Monday', frequency: i1}, {Weekday: 'Tuesday', frequency: i2}, {
        Weekday: 'Wednesday',
        frequency: i3
    }, {Weekday: 'Thursday', frequency: i4}, {Weekday: 'Friday', frequency: i5}, {
        Weekday: 'Saturday',
        frequency: i6
    }, {Weekday: 'Sunday', frequency: i7}]

    return arr;




}

module.exports=WeekDataToCSV;