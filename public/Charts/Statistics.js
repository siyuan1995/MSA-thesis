

var Statistics=function (TimeData,WeekData,MonthData,DivisionData,dom,judge) {

    d3.select('#statisticTable').remove();
    var arrTime;
    var maxTime;
    var maxTimeIndex;
    var minTime;
    var minTimeIndex;

    if(judge==0){// this is statistics for single crime type
        var i0=0,i1=0,i2=0,i3=0,i4=0,i5=0,i6=0,i7=0,i8=0,i9=0,i10=0,i11=0,i12=0,i13=0,i14=0,i15=0,i16=0,i17=0,i18=0,i19=0,i20=0,i21=0,i22=0,i23=0;

        for(var p=0;p<TimeData.length;p++) {
            switch (TimeData[p].properties.Time) {//TimeData[p].properties.Time
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

            }

        }

        arrTime=[i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23]
        maxTime=Math.max(i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23);
        maxTimeIndex=arrTime.indexOf(maxTime);
        minTime=Math.min(i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23);
        minTimeIndex=arrTime.indexOf(minTime);
    }

    if(judge==1){//this is statistics for all crimes

        arrTime=TimeData;
        maxTime=Math.max.apply(null,arrTime);
        maxTimeIndex=arrTime.indexOf(maxTime);
        minTime=Math.min.apply(null,arrTime);
        minTimeIndex=arrTime.indexOf(minTime);

    }
/*
    var i0=0,i1=0,i2=0,i3=0,i4=0,i5=0,i6=0,i7=0,i8=0,i9=0,i10=0,i11=0,i12=0,i13=0,i14=0,i15=0,i16=0,i17=0,i18=0,i19=0,i20=0,i21=0,i22=0,i23=0;

    for(var p=0;p<TimeData.length;p++) {
        switch (TimeData[p].properties.Time) {//TimeData[p].properties.Time
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

        }

    }

    var arrTime=[i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23]
    var maxTime=Math.max(i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23);
    var maxTimeIndex=arrTime.indexOf(maxTime);
    var minTime=Math.min(i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23);
    var minTimeIndex=arrTime.indexOf(minTime);*/

    var arrWeekday=[WeekData[0].frequency,WeekData[1].frequency,WeekData[2].frequency,WeekData[3].frequency,WeekData[4].frequency,WeekData[5].frequency,WeekData[6].frequency]
    var maxWeekday=Math.max(WeekData[0].frequency,WeekData[1].frequency,WeekData[2].frequency,WeekData[3].frequency,WeekData[4].frequency,WeekData[5].frequency,WeekData[6].frequency);
    var maxWeekdayIndex=arrWeekday.indexOf(maxWeekday);
    var minWeekday=Math.min(WeekData[0].frequency,WeekData[1].frequency,WeekData[2].frequency,WeekData[3].frequency,WeekData[4].frequency,WeekData[5].frequency,WeekData[6].frequency);
    var minWeekdayIndex=arrWeekday.indexOf(minWeekday);

    var arrMonth=[MonthData[0].frequency,MonthData[1].frequency,MonthData[2].frequency,MonthData[3].frequency,MonthData[4].frequency,MonthData[5].frequency,MonthData[6].frequency,MonthData[7].frequency,MonthData[8].frequency,MonthData[9].frequency,MonthData[10].frequency,MonthData[11].frequency,];
    var maxMonth=Math.max(MonthData[0].frequency,MonthData[1].frequency,MonthData[2].frequency,MonthData[3].frequency,MonthData[4].frequency,MonthData[5].frequency,MonthData[6].frequency,MonthData[7].frequency,MonthData[8].frequency,MonthData[9].frequency,MonthData[10].frequency,MonthData[11].frequency);
    var maxMonthIndex=arrMonth.indexOf(maxMonth);
    var minMonth=Math.min(MonthData[0].frequency,MonthData[1].frequency,MonthData[2].frequency,MonthData[3].frequency,MonthData[4].frequency,MonthData[5].frequency,MonthData[6].frequency,MonthData[7].frequency,MonthData[8].frequency,MonthData[9].frequency,MonthData[10].frequency,MonthData[11].frequency);
    var minMonthIndex=arrMonth.indexOf(minMonth);

    var arrDivision=[DivisionData.children[0].frequency,DivisionData.children[1].frequency,DivisionData.children[2].frequency,DivisionData.children[3].frequency,DivisionData.children[4].frequency,DivisionData.children[5].frequency,DivisionData.children[6].frequency,DivisionData.children[7].frequency,DivisionData.children[8].frequency,DivisionData.children[9].frequency,DivisionData.children[10].frequency,DivisionData.children[11].frequency,DivisionData.children[12].frequency,DivisionData.children[13].frequency,DivisionData.children[14].frequency,DivisionData.children[15].frequency,DivisionData.children[16].frequency]
    var maxDivision=Math.max(DivisionData.children[0].frequency,DivisionData.children[1].frequency,DivisionData.children[2].frequency,DivisionData.children[3].frequency,DivisionData.children[4].frequency,DivisionData.children[5].frequency,DivisionData.children[6].frequency,DivisionData.children[7].frequency,DivisionData.children[8].frequency,DivisionData.children[9].frequency,DivisionData.children[10].frequency,DivisionData.children[11].frequency,DivisionData.children[12].frequency,DivisionData.children[13].frequency,DivisionData.children[14].frequency,DivisionData.children[15].frequency,DivisionData.children[16].frequency)
    var maxDivisionIndex=arrDivision.indexOf(maxDivision);
    var minDivision=Math.min(DivisionData.children[0].frequency,DivisionData.children[1].frequency,DivisionData.children[2].frequency,DivisionData.children[3].frequency,DivisionData.children[4].frequency,DivisionData.children[5].frequency,DivisionData.children[6].frequency,DivisionData.children[7].frequency,DivisionData.children[8].frequency,DivisionData.children[9].frequency,DivisionData.children[10].frequency,DivisionData.children[11].frequency,DivisionData.children[12].frequency,DivisionData.children[13].frequency,DivisionData.children[14].frequency,DivisionData.children[15].frequency,DivisionData.children[16].frequency)
    var minDivisionIndex=arrDivision.indexOf(minDivision);

    // To get a min value of an array, use Math.min.apply(null,arr), or Math.min(a1,a2,a3...an).


    var dat4table=[
        {Item:'Daytime',max:maxTimeIndex,min:minTimeIndex},
        {Item:'Weekday',max:maxWeekdayIndex, min:minWeekdayIndex},
        {Item:'Month',max:maxMonthIndex,min:minMonthIndex},
        {Item:'Division',max:maxDivisionIndex,min:minDivisionIndex}
        ];

    function tabulate(data, columns) {
        var table = d3.select('#'+dom).append('table').attr('id','statisticTable')
   /*     var thead = table.append('thead').attr('font-size',20).attr('class','tablehead');
        var	tbody = table.append('tbody').attr('font-size',20).attr('class','tablebody');*/

        var thead = table.append('thead').attr('class','myThead');
        var	tbody = table.append('tbody').attr('class','myTbody');


        // append the header row
        thead.append('tr')
            .selectAll('th')
            .data(columns).enter()
            .append('th')
            .text(function (column) { return column; });

        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr');

        // create a cell in each row for each column
        var cells = rows.selectAll('td')
            .data(function (row) {
                return columns.map(function (column) {
                    return {column: column, value: row[column]};
                });
            })
            .enter()
            .append('td')
            .text(function (d) { return d.value; });

        return table;
    }

    // render the table(s)
    tabulate(dat4table, ['Item', 'max','min']); // 2 column table
















}

module.exports=Statistics;