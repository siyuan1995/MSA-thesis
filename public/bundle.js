(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var DayChart=function (data,dom) {

    d3.select('#del').remove();
    d3.select('#delAllChart').remove();


    for (var i = 0; i < data.length; i++) {

    data[i].Dtime = new Date(data[i].Dtime);
    data[i].frequency = +data[i].frequency;
    }

    var outerWidth = 780;
    var outerHeight = 350;
    var margin = { left: 40, top: 5, right: 5, bottom: 30 };
    var innerWidth  = outerWidth  - margin.left - margin.right;
    var innerHeight = outerHeight - margin.top  - margin.bottom;
    var svg = d3.select('#'+dom).append('svg')
        .attr("width", outerWidth)
        .attr('id','del')
        .attr("height", outerHeight);
    var g = svg.append("g")//this is the g contains xAxis and yAxis
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var path = g.append("path")
        .attr('fill','none')
        .attr('stroke','lightskyblue')
        .attr('stroke-width',3)



    var xAxisG = g.append("g")
        .attr("transform", "translate(0," + innerHeight + ")")
        .attr('stroke-width',1)
        .attr('stroke','lightskyblue')
        //.attr('class','axisBlue');// this place if you want to change the color of axis, you have to set the class, and the class has to be 'axisColor line' and 'axisColor path'

    var yAxisG = g.append("g")
        .attr('stroke-width',1)
        .attr('stroke','lightskyblue')
        //.attr('class','axisBlue');

    var xScale = d3.scaleLinear().range([0, innerWidth]);
    var yScale = d3.scaleLinear().range([innerHeight, 0]);

    xScale.domain(d3.extent(data, function (d){ return d.Dtime; }));// d3.extent(),returns the minimum and maximum value in the given iterable using natural order
    yScale.domain(d3.extent(data, function (d){ return d.frequency; }));

    var xAxis = d3.axisBottom(xScale)
        .ticks(21)
    //.classed('axisBlue',true)
    //.attr('class','axisBlue')


    var yAxis = d3.axisLeft(yScale)
        .ticks(11)
    //.classed('axisBlue',true)
    //.attr('class','axisBlue')

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);


    svg.append("text")
        .attr("transform",
            "translate(" + (innerWidth/2) + " ," +
            (innerHeight + margin.top + 30) + ")")
        .style("text-anchor", "middle")
        .text("Time");
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x",0-(innerHeight/2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Frequency");





/*    svg.append("g")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(d3.axisBottom(xScale));

    // Add the Y Axis
    svg.append("g")
        .attr("class", "axisRed")
        .call(d3.axisLeft(yScale));*/




    var line = d3.line()
        .x(function(d) { return xScale(d.Dtime); })
        .y(function(d) { return yScale(d.frequency); });




    path.attr("d", line(data));

    svg.append("g").selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(d) {
            return xScale(d.Dtime)+40;
        })
        .attr("y", function(d) {
            return yScale(d.frequency);
        })
        .attr("fill", "cornflowerblue")
        .text(function(d) {
            return d.frequency
        });





    // this function parses the data property and make all the properties to numbers. Cause even the data in your file is number is still need to be converted to numbers.









}

module.exports=DayChart;
},{}],2:[function(require,module,exports){
var DayChart_All=function (assualtC,breakC,robberyC,theftC,dom) {

    d3.select('#delAllChart').remove();
    d3.select('#del').remove();

    var a_arr=[];
    var b_arr=[];
    var r_arr=[];
    var t_arr=[];

    var lineOpacity = "0.85";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "1.5px";
    var lineStrokeHover = "5px";

    assualtC.forEach(function (d) {
        d.Dtime=new Date(d.Dtime);
        d.frequency=+d.frequency;
        a_arr.push(d.frequency);
    })

    breakC.forEach(function (d) {
        d.Dtime=new Date(d.Dtime);
        d.frequency=+d.frequency;
        b_arr.push(d.frequency)
    })

    robberyC.forEach(function (d) {
        d.Dtime=new Date(d.Dtime);
        d.frequency=+d.frequency;
        r_arr.push(d.frequency);
    })

    theftC.forEach(function (d) {
        d.Dtime=new Date(d.Dtime);
        d.frequency=+d.frequency;
        t_arr.push(d.frequency)
    })

    var yMax0=Math.max.apply(null,a_arr);
    var yMax1=Math.max.apply(null,b_arr);
    var yMax2=Math.max.apply(null,r_arr);
    var yMax3=Math.max.apply(null,t_arr);
    var yMax=Math.max(yMax0,yMax1,yMax2,yMax3);

    console.log(yMax0+','+yMax1+','+yMax2+','+yMax3+','+yMax);




    var outerWidth = 780;
    var outerHeight = 350;
    var margin = { left: 40, top: 5, right: 5, bottom: 30 };
    var innerWidth  = outerWidth  - margin.left - margin.right;
    var innerHeight = outerHeight - margin.top  - margin.bottom;

    var svg = d3.select('#'+dom).append('svg')
        .attr("width", outerWidth)
        .attr('id','delAllChart')
        .attr("height", outerHeight);

    var g = svg.append("g")//this is the g contains xAxis and yAxis
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxisG = g.append("g")
        .attr("transform", "translate(0," + innerHeight + ")")
        .attr('stroke-width',1)
        .attr('stroke','lightskyblue')

    var yAxisG = g.append("g")
        .attr('stroke-width',1)
        .attr('stroke','lightskyblue')

    var xScale = d3.scaleLinear().range([0, innerWidth]);
    var yScale = d3.scaleLinear().range([innerHeight, 0]);

    xScale.domain(d3.extent(assualtC, function (d){ return d.Dtime; }));// d3.extent(),returns the minimum and maximum value in the given iterable using natural order
    //yScale.domain(d3.extent(assualtC, function (d){ return d.frequency; }));
    yScale.domain([0,yMax]);

    var xAxis = d3.axisBottom(xScale)
        .ticks(21)

    var yAxis = d3.axisLeft(yScale)
        .ticks(11)

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    var assualt_line=d3.line()
        .x(function(d) { return xScale(d.Dtime); })
        .y(function(d) { return yScale(d.frequency); });
    var break_line=d3.line()
        .x(function(d) { return xScale(d.Dtime); })
        .y(function(d) { return yScale(d.frequency); });
    var robbery_line=d3.line()
        .x(function(d) { return xScale(d.Dtime); })
        .y(function(d) { return yScale(d.frequency); });
    var theft_line=d3.line()
        .x(function(d) { return xScale(d.Dtime); })
        .y(function(d) { return yScale(d.frequency); });

    console.log(assualtC);
    console.log(assualt_line.length);

    var a_path=g.append("path")
        .attr('fill','none')
        .attr('stroke','red')
        .attr('stroke-width',2)
        .attr('class','lines')// this code assign this path a class attr called 'lines'
        .attr('d',assualt_line(assualtC))
        .on('mouseover',function (d) {
            d3.selectAll(".lines")// d3.select with '.sth' means to select by class name.
                .style('opacity', otherLinesOpacityHover);
            d3.select(this)
                .style('opacity', lineOpacityHover)
                .style("stroke-width",lineStrokeHover )
        })
        .on('mouseout',function (d) {
            d3.selectAll(".lines")
                .style('opacity', lineOpacity);
            d3.select(this)
                .style("stroke-width", lineStroke)
                .style("cursor", "none");
        });
    var b_path=g.append("path")
        .attr('fill','none')
        .attr('stroke','blue')
        .attr('stroke-width',2)
        .attr('class','lines')
        .attr('d',break_line(breakC))
        .on('mouseover',function (d) {
            d3.selectAll('.lines')
                .style('opacity', otherLinesOpacityHover);
            d3.select(this)
                .style('opacity', lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
        })
        .on('mouseout',function (d) {
            d3.selectAll(".lines")
                .style('opacity', lineOpacity);
            d3.select(this)
                .style("stroke-width", lineStroke)
                .style("cursor", "none");
        });
    var r_path=g.append("path")
        .attr('fill','none')
        .attr('stroke','green')
        .attr('stroke-width',2)
        .attr('class','lines')
        .attr('d',robbery_line(robberyC))
        .on('mouseover',function (d) {
            d3.selectAll('.lines')
                .style('opacity', otherLinesOpacityHover);
            d3.select(this)
                .style('opacity', lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
        })
        .on('mouseout',function (d) {
            d3.selectAll(".lines")
                .style('opacity', lineOpacity);
            d3.select(this)
                .style("stroke-width", lineStroke)
                .style("cursor", "none");
        });
    var t_path=g.append("path")
        .attr('fill','none')
        .attr('stroke','purple')
        .attr('stroke-width',2)
        .attr('class','lines')
        .attr('d',theft_line(theftC))
        .on('mouseover',function (d) {
            d3.selectAll('.lines')
                .style('opacity', otherLinesOpacityHover);
            d3.select(this)
                .style('opacity', lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
        })
        .on('mouseout',function (d) {
            d3.selectAll(".lines")
                .style('opacity', lineOpacity);
            d3.select(this)
                .style("stroke-width", lineStroke)
                .style("cursor", "none");
        });







}


module.exports=DayChart_All;
},{}],3:[function(require,module,exports){
var DivisonChart=function (data,dom) {

    d3.select('#deleteDivison').remove();
    data.children.forEach(function(d) {
        d.frequency = +d.frequency;
        d.Division = d.Division;
    })

   /* var dataset=d3.stratify()
        .id(function(d) { return d.Division; })
        .parentId(function(d) { return d.frequency; })
        (data);
*/
    var diameter=400;
    var color=d3.scaleOrdinal(d3.schemeSet2);//******IMPORTANT ATTENTION: when you use the colorScale, if the colors of the object that you are rendering is less than the color provided by the d3 colorScale, then the color scale doesn't work
    // to make it work, the colors provided by d3 color scale must be less than the colors you used to rendering the objects.

    //(d3.schemeCategory20);// this is the difference that v4 version with v3 version. d3.scale.category20b is not supported by v4, as the other scale operation, it is all changed.
    var bubble = d3.pack()
        //.sort(null)
        .size([400,410])
        .padding(1.5);

    var svg = d3.select('#'+dom)
        .append("svg")
        .attr('id','deleteDivison')
        .attr("width", 490)//400
        .attr("height", 370)//530
        .attr("class", "bubble");

    var nodes = d3.hierarchy(data)
        .sum(function(d) { return d.frequency; });//pack.radius([radius]): If radius is specified, sets the pack layout’s radius accessor to the specified function and returns this pack layout. If radius is not specified, returns the current radius accessor, which defaults to null. ///////////////If the radius accessor is null, the radius of each leaf circle is derived from the leaf node.value (computed by node.sum); the radii are then scaled proportionally to fit the layout size.//////////// If the radius accessor is not null, the radius of each leaf circle is specified exactly by the function.

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d.Division + ": " + d.frequency;
        });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d,i) {
            return color(i);
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {

            return d.data.Division;

        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/2;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {

            return d.data.frequency;
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/2;
        })
        .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", diameter + "px");



/*    var nodes = bubble.nodes({children:data}).filter(function(d) { return !d.children; });

    var bubbles = svg.append("g")
        .attr("transform", "translate(0,0)")
        .selectAll(".bubble")
        .data(nodes)
        .enter();

    bubbles.append("circle")
        .attr("r", function(d){ return d.r; })
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .style("fill", function(d) { return color(d.frequency); });

    bubbles.append("text")
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return d.y + 5; })
        .attr("text-anchor", "middle")
        .text(function(d){ return d["Fruit"]; })
        .style({
            "fill":"white",
            "font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
            "font-size": "12px"
        });*/







}


module.exports=DivisonChart;
},{}],4:[function(require,module,exports){
var MonthChart=function (data,dom) {

    d3.select('#deleteMonth').remove();
    data.forEach(function(d) {
        d.frequency = +d.frequency;
        d.Month = d.Month;
    })

    var outerHeight = 530;//370
    var outerWidth = 400;//490
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = outerHeight - margin.right - margin.left+60,
        height = outerHeight - margin.top - margin.bottom+60,
        radius = (width / 2)-60;

    var color = d3.scaleOrdinal()
        .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2","#33FFDA","#33FFFF","#33D1FF","#3399FF","#70A4D8"]);

    var arc = d3.arc()
        .outerRadius(radius - 30)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);


    var pie = d3.pie()
        .sort(null)
        .value(function (d) {
            return d.frequency;
        });

    var svg = d3.select('#'+dom).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr('id','deleteMonth')
        .append("g")
        .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)// the attr 'd' here is the path to be drawn, it is different from the d of function(d) which represents data
        .style("fill", function(d) { return color(d.data.Month); })// why d.data ?

    g.append('text')
        .attr('transform',function (d) {
            return 'translate('+labelArc.centroid(d)+')';

        })
        .attr('dy','.35em')
        .attr('font-size',20)
        .text(function (d) {
            return d.data.Month+':'+d.data.frequency;
        })







}

module.exports=MonthChart;
},{}],5:[function(require,module,exports){
var StackbarChart=function(assualt_arr,break_arr,robbery_arr,theft_arr,dom){


    d3.select('#deleteWeek').remove();
        var dataset=[
            {assualt:assualt_arr[0].frequency,break_enter:break_arr[0].frequency,robbery:robbery_arr[0].frequency,theft:theft_arr[0].frequency},
            {assualt:assualt_arr[1].frequency,break_enter:break_arr[1].frequency,robbery:robbery_arr[1].frequency,theft:theft_arr[1].frequency},
            {assualt:assualt_arr[2].frequency,break_enter:break_arr[2].frequency,robbery:robbery_arr[2].frequency,theft:theft_arr[2].frequency},
            {assualt:assualt_arr[3].frequency,break_enter:break_arr[3].frequency,robbery:robbery_arr[3].frequency,theft:theft_arr[3].frequency},
            {assualt:assualt_arr[4].frequency,break_enter:break_arr[4].frequency,robbery:robbery_arr[4].frequency,theft:theft_arr[4].frequency},
            {assualt:assualt_arr[5].frequency,break_enter:break_arr[5].frequency,robbery:robbery_arr[5].frequency,theft:theft_arr[5].frequency},
            {assualt:assualt_arr[6].frequency,break_enter:break_arr[6].frequency,robbery:robbery_arr[6].frequency,theft:theft_arr[6].frequency},
        ];



    var OuterWidth=470;
    var OuterHeight=350;
    var margin = { left: 40, top: 5, right: 5, bottom: 30 };
    var innerWidth  = OuterWidth  - margin.left - margin.right;
    var innerHeight = OuterHeight - margin.top  - margin.bottom;

    var svg = d3.select('#'+dom).append('svg')
        .attr("width", OuterWidth)
        .attr('id','deleteWeek')
        .attr("height", OuterHeight);
    var G = svg.append("g")//this is the g contains xAxis and yAxis
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var stack=d3.stack().keys(['assualt','break_enter','robbery','theft']);

    var series=stack(dataset);

    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        //.domain(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])
        .range([0, innerWidth])
        .paddingInner(0.05);

    var yScale = d3.scaleLinear()
        .domain([
            d3.max(dataset, function(d) {
                return d.assualt+d.break_enter+d.robbery+d.theft;
            }),0
        ])
        .range([0, innerHeight]);




    var colors = d3.scaleOrdinal(d3.schemeCategory10);

    var groups = G.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .style("fill", function(d, i) {
            return colors(i);
        });





    // Add a rect for each data value
    var rects = groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i)+15;
        })
        .attr("y", function(d) {
            return yScale(d[1]);
        })
        .attr("height", function(d) {
            return yScale(d[0]) - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth()/2)
        //.on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mouseover", function(d) {
            console.log(d[1]-d[0]);
            //tooltip.style("display", true);
            var xPosition = d3.mouse(this)[0] - 5;
            var yPosition = d3.mouse(this)[1] - 5;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d[1]-d[0]);
        });


    var xAxisG = G.append("g")// The sequence of d3 code sometimes influence the result, especially related to the 'append' or 'selectAll' method, which some times the sequence of code influence the dom you select.
        .attr("transform", "translate(0," + innerHeight + ")")
        .attr('stroke-width',1)
        .attr('stroke','lightskyblue')

    var yAxisG = G.append("g")
        .attr('stroke-width',1)
        .attr('stroke','lightskyblue')




    var xAxis=d3.axisBottom(xScale);
    var yAxis=d3.axisLeft(yScale);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip.append("rect")
        .attr("width", 30)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);

    tooltip.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("stroke",'black')
        .attr("font-weight", "bold");






    }













module.exports=StackbarChart;
},{}],6:[function(require,module,exports){


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
},{}],7:[function(require,module,exports){
var WeekChart=function (data,dom) {

    d3.select('#deleteWeek').remove();
    data.forEach(function(d) {
        d.frequency = +d.frequency;
        d.Weekday = d.Weekday;
    })

    var OuterWidth=470;
    var OuterHeight=350;
    var margin = { left: 40, top: 5, right: 5, bottom: 30 };
    var innerWidth  = OuterWidth  - margin.left - margin.right;
    var innerHeight = OuterHeight - margin.top  - margin.bottom;

    var svg = d3.select('#'+dom).append('svg')
        .attr("width", OuterWidth)
        .attr('id','deleteWeek')
        .attr("height", OuterHeight);

    var g = svg.append("g")//this is the g contains xAxis and yAxis
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxisG = g.append("g")
        .attr("transform", "translate(0," + innerHeight + ")")
        .attr('stroke-width',1)
        .attr('stroke','lightskyblue')
        .attr('class','axisBlue');

    var yAxisG = g.append("g")
        .attr('stroke-width',1)
        .attr('stroke','lightskyblue')
        .attr('class','axisBlue');

    var xScale = d3.scaleBand()
        .range([0, innerWidth])
        //.domain(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])
        .domain(data.map(function (d) {
            return d.Weekday;
        }))
        .padding(0.2)
    //var xScale = d3.scaleLinear().range([0, innerWidth]).domain([0,100]);
    var yScale = d3.scaleLinear().range([innerHeight, 0])
        .domain([0,d3.max(data,function (d) {
            return d.frequency
        })+100])

    var xAxis=d3.axisBottom(xScale)
        //.tickValues(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']);
        //.ticks(5);

    var yAxis=d3.axisLeft(yScale)
        .ticks(10);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    var bars=svg.selectAll()
        .data(data)
        .enter()
        .append('rect')
        .attr('fill','lightskyblue')
        .attr('x', function (d) {
            return xScale(d.Weekday)+40;
        })
        .attr('y',function (d) {
            return yScale(d.frequency);
            //return d.frequency;
        } )
        .attr('height',function (d) {
            return innerHeight-yScale(d.frequency);
        } )
        .attr('width', xScale.bandwidth())
    /*bars.append('text')
        .attr('x',function (d) {
            return xScale(d.Weekday)+40;
        })
        .attr('y',function (d) {
            return yScale(d.frequency)-20;
        })
        .attr('text-anchor', 'middle')
        .text(function (d) {
            return d.frequency;
        })
*/

    svg.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("class","label")
        .attr("x", (function(d) { return xScale(d.Weekday)+62; }  ))
        .attr("y", function(d) {
        //console.log(yScale(d.frequency));
            return yScale(d.frequency)+10;
        })
        .attr("dy", ".75em")
        .text(function(d) { return d.frequency; });



}
module.exports=WeekChart;
},{}],8:[function(require,module,exports){

var Moran_Indicator=function (crime_data,SpatialWeight_workbook) {
    var first_sheet_name = SpatialWeight_workbook.SheetNames[0];
    var worksheet = SpatialWeight_workbook.Sheets[first_sheet_name];
    console.log(worksheet);

    var N=crime_data.children.length;
    var S0=68;//EiEjWij
    var sumZ=0;
    var sumZ4=0;
    var sum=0;
    var A=0,B=0,C=0,D=0,EI=0,EI2=0,S1=0,S2=0,VI=0,Z=0;

    for(let i=0;i<crime_data.children.length;i++){

        sum=sum+crime_data.children[i].frequency
    }
    var X_mean=sum/17;



    for(let i=0;i<crime_data.children.length;i++){
        sumZ=sumZ+Math.pow((crime_data.children[i].frequency-X_mean),2);
    }//Ei(Xi-Xba)2

    for(let i=0;i<crime_data.children.length;i++){
        sumZ4=sumZ4+Math.pow((crime_data.children[i].frequency-X_mean),4);
    }

    var DD=[];
    for(let i=0;i<crime_data.children.length;i++){
        DD[i]=crime_data.children[i].frequency-X_mean;
    }

    var EiEjWij=0;
    var arr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'];

    for(let i=0;i<17;i++){
        let m=arr[i].toString();
        for(let j=1;j<18;j++){
            if(worksheet[m+j]){
                let num;
                switch (m){
                    case 'A':
                        num=0;
                        break;
                    case 'B':
                        num=1;
                        break;
                    case 'C':
                        num=2;
                        break;
                    case 'D':
                        num=3;
                        break;
                    case 'E':
                        num=4;
                        break;
                    case 'F':
                        num=5;
                        break;
                    case 'G':
                        num=6;
                        break;
                    case 'H':
                        num=7;
                        break;
                    case 'I':
                        num=8;
                        break;
                    case 'J':
                        num=9;
                        break;
                    case 'K':
                        num=10;
                        break;
                    case 'L':
                        num=11;
                        break;
                    case 'M':
                        num=12;
                        break;
                    case 'N':
                        num=13;
                        break;
                    case 'O':
                        num=14;
                        break;
                    case 'P':
                        num=15;
                        break;
                    case 'Q':
                        num=16;
                        break;
                }


                EiEjWij=EiEjWij+DD[num]*DD[j-1];
            }
        }
    }

    var Moran_indicator=N/68*EiEjWij/sumZ;

    A=N*((Math.pow(N,2)-3*N+3)*S1-N*S2+3*Math.pow(S0,2));
    D=sumZ4/Math.pow(sumZ,2);
    B=D*((Math.pow(N,2)-N)*S1-2*N*S2+6*Math.pow(S0,2));
    C=(N-1)*(N-2)*(N-3)*Math.pow(S0,2);
    EI=-1/(N-1);
    EI2=(A-B)/C;
    S1=68*2;
    S2=Math.pow(8,2)+Math.pow(12,2)+Math.pow(10,2)+Math.pow(8,2)+Math.pow(6,2)+Math.pow(6,2)+Math.pow(14,2)+Math.pow(8,2)+Math.pow(6,2)
        +Math.pow(6,2)+Math.pow(6,2)+Math.pow(6,2)+Math.pow(10,2)+Math.pow(10,2)+Math.pow(10,2)+Math.pow(6,2)+Math.pow(4,2);
    VI=Math.sqrt(EI2-Math.pow(EI,2));

    Z=(Moran_indicator-EI)/VI;




    console.log('MoranI I:'+Moran_indicator);
    console.log('Z score:'+Z);
    console.log('EI:'+EI);
    console.log('VI:'+VI);
    console.log('A:'+A);
    console.log('B:'+B);
    console.log('C:'+C);
    console.log('D:'+D);
    console.log('S2:'+S2);
    console.log('EI2:'+EI2)
    console.log('EI2-Math.pow(EI,2):'+  (Math.sqrt(EI2-Math.pow(EI,2))))


    return JSON.stringify({Morans_I_indictor:Moran_indicator,Z_score:Z});




}

module.exports=Moran_Indicator;

},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){

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
},{}],12:[function(require,module,exports){
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




},{}],13:[function(require,module,exports){

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
},{}],14:[function(require,module,exports){
/*var reada=require('./Read_Assualt.js')
var Upper=require('assert');
var a=require('atob');*/

var $=jQuery.noConflict();


/*$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    if (options.cache) {
        var success = originalOptions.success || $.noop,
            url = originalOptions.url;

        options.cache = false; //remove jQuery cache as we have our own localStorage
        options.beforeSend = function () {
            if (localStorage.getItem(url)) {
                //success(localStorage.getItem(url));
                localStorage.getItem(url);
                return false;
            }
            else {
                localStorage.setItem(url,success);
                return true;

            }

        };
      /!*  options.success = function (data, textStatus) {
            //var responseData = JSON.stringify(data);
             data = success.data;
            localStorage.setItem(url, data);
           // if ($.isFunction(success)) success(data); //call back to original ajax call
        }*!/;
    }
});*/

var DataToCSV=require('./DataToCSV/TimeDataToCSV');
var WeekDataToCSV=require('./DataToCSV/WeekDataToCSV');
var MonthDataToCSV=require('./DataToCSV/MonthDataToCSV');
var DivisonDataToCSV=require('./DataToCSV/DivisonDataToCSV');

var DayChart=require('./Charts/DayChart');
var WeekChart=require('./Charts/WeekChart');
var MonthChart=require('./Charts/MonthChart');
var DivisonChart=require('./Charts/DivisonChart');
var Statistic=require('./Charts/Statistics');
var DayChart_All=require('./Charts/DayChart_All');
var StackbarChart=require('./Charts/StackbarChart');


var SpatialCorrelation1=require('./Correlation/Spatial Correlation1');
var Morans_Indicator=require('./Correlation/Morans_I_Analysis');
var Visualize_Mean_Center=require('../routes/Spatial_analyzation/visualize_Mean_Center');
var Visualize_ellipse=require('../routes/Spatial_analyzation/visualize_ellipse');



var assult_section=document.getElementById('assualt_section');
var breakEnter_section=document.getElementById('break_and_enter');
var Homecide_section=document.getElementById('Homecide');
var Robbery_section=document.getElementById('Robbery');
var Theft_section=document.getElementById('Theft');
var All_Crime=document.getElementById('All_Crime');
var Morans_I_section=document.getElementById('Morans_I');
var Spatial_Correlation=document.getElementById('spatial_correlation');
var Mean_Center=document.getElementById('mean_center');
var Standard_ellipse=document.getElementById('standard_ellipse');
var Getis_ord=document.getElementById('Getis_ord');
var rectangleSelect=document.getElementById('rectangleSelect');



//var DayChartDom=document.getElementById('DayChart');
var All_Data4Statistics;
var Assualt_data4Correlation;
var Break_data4Correlation;
var Homecide_data4Correlation;
var Robbery_data4Correlation;
var Theft_data4Correlation;


//global variables to make the read all run faster, I know too many global variables make the variables pollution, but this is for the convinence of not reading from file every time, don't know if this solve the problem.
var data_for_chart_ass;
var Weekday_for_chart_ass;
var Month_for_chart_ass;
var Divison_for_chart_ass;

var data_for_chart_br;
var Weekday_for_chart_br;
var Month_for_chart_br;
var Divison_for_chart_br;

var data_for_chart_r;
var Weekday_for_chart_r;
var Month_for_chart_r;
var Divison_for_chart_r;

var data_for_chart_th;
var Weekday_for_chart_th;
var Month_for_chart_th;
var Divison_for_chart_th;



//var TwitterApproach=require('../SearchTweets');
//(TwitterApproach());// immediately invoked function, format is (function());

var Index4Analysis;// the Index for checking what is the current crime type and the data showed on the map
var mymap = L.map('map').setView([43.6532, -79.3832], 13);// create the base map for the whole object
var mylayer=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 17,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidHJpc3RhbjE5OTUiLCJhIjoiY2pvamhocHoxMDA4dTNrb2dva2dlYmQwYyJ9.wCtGhSIHYl5qxH9jLXNxaA'
}).addTo(mymap);// Add the base layer for the whole project
var m=L.geoJSON().addTo(mymap);// the layer that have all the points and it used to be renewed everytime the page is loaded.


/*L.esri.basemapLayer("Topographic").addTo(mymap);
var gpService = L.esri.GP.service({
    url: "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Network/ESRI_DriveTime_US/GPServer/CreateDriveTimePolygons",
    useCors:false
});
if(L.esri.heat){
    console.log('barrier is available')
}*/

//////////


//pline group
var plineGroup=L.layerGroup();
var pellipseGroup=L.layerGroup();

//route control
/*var routeControl=L.Routing.control({
    waypoints: [
        L.latLng(43.6532, -79.3832),
        L.latLng(43.8, -79.3832)
    ],
    routeWhileDragging: true,
    //geocoder: L.Control.Geocoder.nominatim()
});
routeControl.on('routeselected',function (e)
    {
        var route=e.route;
        for(var i=0;i<route.coordinates.length;i++){

        }

    }
)
routeControl.addTo(mymap);*/


//define ajax instance

var assualtVisua;
var breakVisua;
var homecideVisua;
var robberyVisua;
var theftvisua;
var allVisua;

//rectangle select
var editableLayers = L.featureGroup();
mymap.addLayer(editableLayers);
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: editableLayers
    }
});
mymap.addControl(drawControl);
var sR=L.rectangle([
    [43.65,-79.35],[43.67,-79.4]
],{draggable:true});
$('#rectSelect').click(function () {
        sR.addTo(editableLayers);
    }
)
var bounds;

sR.on('edit',function (e) {
    console.log(sR.getLatLngs());
    bounds=sR.getLatLngs();
    switch (Index4Analysis){
        case'assualt':
            console.log(Index4Analysis);

            assualtVisua();
            break;
        case'break':

            breakVisua();
            break;
        case'robbery':

            robberyVisua();
            break;
        case'theft':

            theftvisua();
            break;
        case 'all':
            alert('rectangle select is now not available for multiple data')

            //allVisua();
            break;
        case 'homecide':

            homecideVisua();
            break;


    }

   /* $.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
        async : false,
        cache : false, //cache control doesn't work on ajax request, so the other option is to use local storage.
        type : 'POST',
        url:'/Read_Assualt', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        dataType:'json',
        data:{


        },
        success:function(data1){
            var data=dataFilter(data1,bounds);
            console.log('datafilter 2');
            console.log(data);
            Assualt_data=data;
            All_Data4Statistics=data;
            Assualt_data4Correlation=data;



            data_for_chart_ass=DataToCSV(Assualt_data);
            //console.log(data_for_chart);
            DayChart(data_for_chart_ass,'DayChart');

            Weekday_for_chart_ass=WeekDataToCSV(data);
            //console.log(Weekday_for_chart);
            WeekChart(Weekday_for_chart_ass,'WeekChart');

            Month_for_chart_ass=MonthDataToCSV(data);
            //console.log(Month_for_chart);
            MonthChart(Month_for_chart_ass,'MonthChart');

            Divison_for_chart_ass=DivisonDataToCSV(data);
            //console.log(Divison_for_chart_ass);
            DivisonChart(Divison_for_chart_ass,'DivisonChart');

            Statistic(Assualt_data,Weekday_for_chart_ass,Month_for_chart_ass,Divison_for_chart_ass,'statisticsDom',0);// 0 here is to distingiush single data and multiple data

            //Morans_I_Caculation(Divison_for_chart_ass);


        },
        error:function(){}
    })*/


})

var dataFilter=function(data,bounds){
    if(bounds)
    {
        console.log('datafilter 1')
        var newData=[];

        for(var i=0;i<data.length;i++){

           if(Math.abs(bounds[0][2].lng)<Math.abs(data[i].geometry.coordinates[0])&&Math.abs(data[i].geometry.coordinates[0])<Math.abs(bounds[0][0].lng)&&Math.abs(bounds[0][0].lat)<Math.abs(data[i].geometry.coordinates[1])&&Math.abs(data[i].geometry.coordinates[1])<Math.abs(bounds[0][1].lat))
           {

               newData.push(data[i]);

           }

           else{
               console.log('not qualified')
           }

        }

        return newData;
    }
    else
    {
        console.log('datafilter 0');
        return data
    }
};

//////////////////////////////






assult_section.onclick=function () {


    plineGroup.eachLayer(function (layer) {
        layer.remove();
    })// 简单粗暴 put all the objects in layerGroup and delete all of them by eachLayer method when reload the page.

    var Assualt_data;
    Index4Analysis='assualt';
/*    var data_for_chart;
    var Weekday_for_chart;
    var Month_for_chart;
    var Divison_for_chart;*/

    bounds=null;
    assualtVisua=function(){$.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
             async : false,
             cache : false, //cache control doesn't work on ajax request, so the other option is to use local storage.
             type : 'POST',
             url:'/Read_Assualt', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
             //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
             dataType:'json',
             data:{


             },
             success:function(data1){
                 var data=dataFilter(data1,bounds);
                 console.log('datafilter 2');
                 console.log(data1);
                 Assualt_data=data;
                 All_Data4Statistics=data;
                 Assualt_data4Correlation=data;



                 data_for_chart_ass=DataToCSV(Assualt_data);
                 //console.log(data_for_chart);
                 DayChart(data_for_chart_ass,'DayChart');

                 Weekday_for_chart_ass=WeekDataToCSV(data);
                 //console.log(Weekday_for_chart);
                 WeekChart(Weekday_for_chart_ass,'WeekChart');

                 Month_for_chart_ass=MonthDataToCSV(data);
                 //console.log(Month_for_chart);
                 MonthChart(Month_for_chart_ass,'MonthChart');

                 Divison_for_chart_ass=DivisonDataToCSV(data);
                 //console.log(Divison_for_chart_ass);
                 DivisonChart(Divison_for_chart_ass,'DivisonChart');

                 Statistic(Assualt_data,Weekday_for_chart_ass,Month_for_chart_ass,Divison_for_chart_ass,'statisticsDom',0);// 0 here is to distingiush single data and multiple data

                 //Morans_I_Caculation(Divison_for_chart_ass);


             },
             error:function(){}
         })};
    assualtVisua();


    var geojsonMarkerOptions = {
        radius:8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8

    };
    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties) {
            layer.bindPopup('<br>'+'Crime type:'+feature.properties.Crime_type+'</br>'+'<br>'+'Occurance Date:'+feature.properties.Year.toString()+'/'+feature.properties.Month.toString()+'/'+feature.properties.Day.toString()+'&nbsp'+feature.properties.Time.toString()+':00'+'</br>'+'<br>'+'Division:'+feature.properties.Division.toString()+'</br>'+'<br>'+'Neighborhood:'+feature.properties.Neighborhood.toString()+'</br>');
        }
    }// The onEachFeature function needs to work only with string not number, so if you want to bindPopup sth, it has to be a string type, otherwise it give an error 'Failed to appendChild on node'
    m=L.geoJSON(Assualt_data,{
        pointToLayer: function (feature, latlng) {
            //L.circleMarker(latlng, geojsonMarkerOptions).addTo(markers);
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature

    });
    plineGroup.addLayer(m)
    plineGroup.addTo(mymap);
    //DayChart(data_for_chart,DayChartDom);



}

breakEnter_section.onclick=function () {

    /*var markers = L.markerClusterGroup();
    markers.clearLayers();*/
  /*  mymap.removeLayer(m);
    if(plineGroup.hasLayer(8029)){
        plineGroup.removeLayer(8029);
    }*/
    plineGroup.eachLayer(function (layer) {
        layer.remove();
    })



    var breakEnter;
    Index4Analysis='break';
/*    var data_for_chart;
    var Weekday_for_chart;
    var Month_for_chart;
    var Divison_for_chart;*/
    bounds=null;
    breakVisua=function(){$.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
        async : false,
        cache : false,
        type : 'POST',
        url:'/Read_break', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        datatype:'json',
        data:{


        },
        success:function(data1){
            data=dataFilter(data1,bounds)
            breakEnter=data;
            Break_data4Correlation=data;
            data_for_chart_br=DataToCSV(breakEnter);
            //console.log(data_for_chart);
            DayChart(data_for_chart_br,'DayChart');

            Weekday_for_chart_br=WeekDataToCSV(data);
            //console.log(Weekday_for_chart);
            WeekChart(Weekday_for_chart_br,'WeekChart');

            Month_for_chart_br=MonthDataToCSV(data);
            //console.log(Month_for_chart);
            MonthChart(Month_for_chart_br,'MonthChart');

            Divison_for_chart_br=DivisonDataToCSV(data);
            //console.log(Divison_for_chart);
            DivisonChart(Divison_for_chart_br,'DivisonChart');

            Statistic(breakEnter,Weekday_for_chart_br,Month_for_chart_br,Divison_for_chart_br,'statisticsDom',0);

        },
        error:function(){}
    })};
    breakVisua();



    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#5affd8",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties) {
            layer.bindPopup('<br>'+'Crime type:'+feature.properties.Crime_type+'</br>'+'<br>'+'Occurance Date:'+feature.properties.Year.toString()+'/'+feature.properties.Month.toString()+'/'+feature.properties.Day.toString()+'&nbsp'+feature.properties.Time.toString()+':00'+'</br>'+'<br>'+'Division:'+feature.properties.Division.toString()+'</br>'+'<br>'+'Neighborhood:'+feature.properties.Neighborhood.toString()+'</br>');
        }
    }

/*    L.geoJSON(breakEnter,{
        pointToLayer: function (feature, latlng) {
            L.circleMarker(latlng, geojsonMarkerOptions).addTo(markers);
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    }).addTo(mymap);*/
    m=L.geoJSON(breakEnter,{
        pointToLayer: function (feature, latlng) {
            //L.circleMarker(latlng, geojsonMarkerOptions).addTo(markers);
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature

    });
    plineGroup.addLayer(m)
    plineGroup.addTo(mymap);
    //m.addTo(mymap);




}

Homecide_section.onclick=function () {

    //mymap.removeLayer(m);
    plineGroup.eachLayer(function (layer) {
        layer.remove();
    })
    var Homecide_data;
    var data_for_chart;
    var Weekday_for_chart;
    var Month_for_chart;
    var Divison_for_chart;

    Index4Analysis='homecide';

    bounds=null;
    homecideVisua=function (){$.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
        async : false,
        cache : false,
        type : 'POST',
        url:'/Read_Homecide', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        datatype:'json',
        data:{


        },
        success:function(data1){
            data=dataFilter(data1);
            Homecide_data=data;
            Homecide_data4Correlation=data;

            //console.log(data);
            data_for_chart=DataToCSV(Homecide_data);
            //console.log(data_for_chart);
            DayChart(data_for_chart,'DayChart');
            //console.log(data);

            Weekday_for_chart=WeekDataToCSV(data);
            //console.log(Weekday_for_chart);
            WeekChart(Weekday_for_chart,'WeekChart');

            Month_for_chart=MonthDataToCSV(data);
            //console.log(Month_for_chart);
            MonthChart(Month_for_chart,'MonthChart');

            Divison_for_chart=DivisonDataToCSV(data);
            //console.log(Divison_for_chart);
            DivisonChart(Divison_for_chart,'DivisonChart');

            Statistic(Homecide_data,Weekday_for_chart,Month_for_chart,Divison_for_chart,'statisticsDom',0);

        },
        error:function(){}
    })};
    homecideVisua();


    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff3223",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties) {
            layer.bindPopup('<br>'+'Crime type:'+feature.properties.Crime_type+'</br>'+'<br>'+'Occurance Date:'+feature.properties.Year.toString()+'/'+feature.properties.Month.toString()+'/'+feature.properties.Day.toString()+'&nbsp'+feature.properties.Time.toString()+':00'+'</br>'+'<br>'+'Division:'+feature.properties.Division.toString()+'</br>'+'<br>'+'Neighborhood:'+feature.properties.Neighborhood.toString()+'</br>');
        }
    }

    m=L.geoJSON(Homecide_data,{
        pointToLayer: function (feature, latlng) {
            //L.circleMarker(latlng, geojsonMarkerOptions).addTo(markers);
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature

    });
    //m.addTo(mymap);
    plineGroup.addLayer(m)
    plineGroup.addTo(mymap);




}

Robbery_section.onclick=function () {

    //mymap.removeLayer(m);
    plineGroup.eachLayer(function (layer) {
        layer.remove();
    })
    var Robbery_data;
    Index4Analysis='robbery';
/*    var data_for_chart;
    var Weekday_for_chart;
    var Month_for_chart;
    var Divison_for_chart;*/
    bounds=null;
    robberyVisua=function (){$.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
        async : false,
        cache : false,
        type : 'POST',
        url:'/Read_Robbery', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        datatype:'json',
        data:{


        },
        success:function(data1){
            data=dataFilter(data1);
            Robbery_data=data;
            Robbery_data4Correlation=data;
            data_for_chart_r=DataToCSV(Robbery_data);
            //console.log(data_for_chart);
            DayChart(data_for_chart_r,'DayChart');

            Weekday_for_chart_r=WeekDataToCSV(data);
            //console.log(Weekday_for_chart);
            WeekChart(Weekday_for_chart_r,'WeekChart');

            Month_for_chart_r=MonthDataToCSV(data);
            //console.log(Month_for_chart);
            MonthChart(Month_for_chart_r,'MonthChart');

            Divison_for_chart_r=DivisonDataToCSV(data);
            //console.log(Divison_for_chart);
            DivisonChart(Divison_for_chart_r,'DivisonChart');

            Statistic(Robbery_data,Weekday_for_chart_r,Month_for_chart_r,Divison_for_chart_r,'statisticsDom',0);

        },
        error:function(){}
    })};
    robberyVisua();



    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#f56eff",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties) {
            layer.bindPopup('<br>'+'Crime type:'+feature.properties.Crime_type+'</br>'+'<br>'+'Occurance Date:'+feature.properties.Year.toString()+'/'+feature.properties.Month.toString()+'/'+feature.properties.Day.toString()+'&nbsp'+feature.properties.Time.toString()+':00'+'</br>'+'<br>'+'Division:'+feature.properties.Division.toString()+'</br>'+'<br>'+'Neighborhood:'+feature.properties.Neighborhood.toString()+'</br>');
        }
    }

    m=L.geoJSON(Robbery_data,{
        pointToLayer: function (feature, latlng) {
            //L.circleMarker(latlng, geojsonMarkerOptions).addTo(markers);
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature

    });
   // m.addTo(mymap)
    plineGroup.addLayer(m)
    plineGroup.addTo(mymap);

}

Theft_section.onclick=function () {

    //mymap.removeLayer(m);
    plineGroup.eachLayer(function (layer) {
        layer.remove();
    })
    var Theft_data;
    Index4Analysis='theft';
/*    var data_for_chart;
    var Weekday_for_chart;
    var Month_for_chart;
    var Divison_for_chart;*/
    bounds=null;
    theftvisua=function (){$.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
        async : false,
        cache : false,
        type : 'POST',
        url:'/Read_Theft', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        datatype:'json',
        data:{


        },
        success:function(data1){
            data=dataFilter(data1);
            Theft_data=data;
            Theft_data4Correlation=data;
            data_for_chart_th=DataToCSV(Theft_data);
            //console.log('Theft_Data');
            //console.log(Theft_data);
            DayChart(data_for_chart_th,'DayChart');

            Weekday_for_chart_th=WeekDataToCSV(data);
            //console.log(Weekday_for_chart);
            WeekChart(Weekday_for_chart_th,'WeekChart');

            Month_for_chart_th=MonthDataToCSV(data);
            //console.log(Month_for_chart);
            MonthChart(Month_for_chart_th,'MonthChart');

            Divison_for_chart_th=DivisonDataToCSV(data);
            //console.log(Divison_for_chart);
            DivisonChart(Divison_for_chart_th,'DivisonChart');

            Statistic(Theft_data,Weekday_for_chart_th,Month_for_chart_th,Divison_for_chart_th,'statisticsDom',0);

        },
        error:function(){}
    })}
    theftvisua();


    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#7b82ff",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties) {
            layer.bindPopup('<br>'+'Crime type:'+feature.properties.Crime_type+'</br>'+'<br>'+'Occurance Date:'+feature.properties.Year.toString()+'/'+feature.properties.Month.toString()+'/'+feature.properties.Day.toString()+'&nbsp'+feature.properties.Time.toString()+':00'+'</br>'+'<br>'+'Division:'+feature.properties.Division.toString()+'</br>'+'<br>'+'Neighborhood:'+feature.properties.Neighborhood.toString()+'</br>');
        }
    }

    m=L.geoJSON(Theft_data,{
        pointToLayer: function (feature, latlng) {
            //L.circleMarker(latlng, geojsonMarkerOptions).addTo(markers);
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature

    });
    //m.addTo(mymap)
    plineGroup.addLayer(m)
    plineGroup.addTo(mymap);




}

All_Crime.onclick=function(){


    Index4Analysis='all';
    bounds=null;
    allVisua=function (){$.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
        async : false,
        cache : true,
        type : 'POST',
        url:'/Read_All', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        datatype:'json',
        data:{


        },
        success:function(data){
            console.log(data);

            if(data_for_chart_ass&&data_for_chart_br&&data_for_chart_r&&data_for_chart_th&&Weekday_for_chart_ass&&Weekday_for_chart_br&&
                Weekday_for_chart_r&&Weekday_for_chart_th&&Month_for_chart_ass&&Month_for_chart_br&&Month_for_chart_r&&Month_for_chart_th&&
                Divison_for_chart_ass&&Divison_for_chart_br&&Divison_for_chart_r&&Divison_for_chart_th)
            {

            }

            else {alert('Please check through each crime first')}

 /*           var Day_arr0=DataToCSV(data[0].values);//a,b,r,t
            var Day_arr1=DataToCSV(data[1].values);
            var Day_arr2=DataToCSV(data[2].values);
            var Day_arr3=DataToCSV(data[3].values);*/
            DayChart_All(data_for_chart_ass,data_for_chart_br,data_for_chart_r,data_for_chart_th,'DayChart');
           // var Day_arr=combineTimeData(Day_arr0,Day_arr1,Day_arr2,Day_arr3);
            var Day_arr=combineTimeData(data_for_chart_ass,data_for_chart_br,data_for_chart_r,data_for_chart_th);
            //console.log('Day_all');
            //console.log(Day_arr);

/*            var Week_arr0=WeekDataToCSV(data[0].values);
            var Week_arr1=WeekDataToCSV(data[1].values);
            var Week_arr2=WeekDataToCSV(data[2].values);
            var Week_arr3=WeekDataToCSV(data[3].values);*/
            //console.log(Week_arr0);
            StackbarChart(Weekday_for_chart_ass,Weekday_for_chart_br,Weekday_for_chart_r,Weekday_for_chart_th,'WeekChart');
            var Week_arr=combineWeekData(Weekday_for_chart_ass,Weekday_for_chart_br,Weekday_for_chart_r,Weekday_for_chart_th);
            //console.log(Week_arr);

/*            var Month_arr0=MonthDataToCSV(data[0].values);
            var Month_arr1=MonthDataToCSV(data[1].values);
            var Month_arr2=MonthDataToCSV(data[2].values);
            var Month_arr3=MonthDataToCSV(data[3].values);*/
            var Month_arr=combineMonthData(Month_for_chart_ass,Month_for_chart_br,Month_for_chart_r,Month_for_chart_th);
            //console.log(Month_arr);
            MonthChart(Month_arr,'MonthChart');

/*            var Division_arr0=DivisonDataToCSV(data[0].values);
            var Division_arr1=DivisonDataToCSV(data[1].values);
            var Division_arr2=DivisonDataToCSV(data[2].values);
            var Division_arr3=DivisonDataToCSV(data[3].values);*/
            var Division_arr=combineDivisionData(Divison_for_chart_ass,Divison_for_chart_br,Divison_for_chart_r,Divison_for_chart_th);
            //console.log(Division_arr);
            DivisonChart(Division_arr,'DivisonChart');

            Statistic(Day_arr,Week_arr,Month_arr,Division_arr,'statisticsDom',1);
            //Statistic(Day_arr,Week_arr,Month_arr,Division_arr,'statisticsDom');

           /* SpatialCorrelation1(Assualt_data4Correlation,Break_data4Correlation,Homecide_data4Correlation,Robbery_data4Correlation,Theft_data4Correlation);
            console.log('data contents:')
            console.log(Assualt_data4Correlation);
            console.log(Break_data4Correlation);
            console.log(Robbery_data4Correlation);
            console.log(Theft_data4Correlation);*/


        },
        error:function(){}
    })};
    allVisua();


}




Morans_I_section.onclick=function () {
    $.ajax({
        async : false,
        cache : false, //cache control doesn't work on ajax request, so the other option is to use local storage.
        type : 'POST',
        url:'/SpatialWeight_Moran', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        datatype:'json',
        data:{},
        success:function (data) {
            switch (Index4Analysis) {
                case 'assualt':
                    var m1=Morans_Indicator(Divison_for_chart_ass,data);
                    alert(m1);
                    break;
                case 'break':
                    var m2=Morans_Indicator(Divison_for_chart_br,data);
                    alert(m2);
                    break;
                case 'robbery':
                    var m3=Morans_Indicator(Divison_for_chart_r,data);
                    alert(m3);
                    break;
                case 'theft':
                    var m4=Morans_Indicator(Divison_for_chart_th,data);
                    alert(m4);
                    break;


            }

        },
        error:function () {

        }
    }



)}

Spatial_Correlation.onclick=function () {
    $.ajax({
        async : false,
        cache : false, //cache control doesn't work on ajax request, so the other option is to use local storage.
        type : 'POST',
        url:'/Spatial_Correlation',
        dataType:'json',
        data:{}, //JSON.stringify([Assualt_data4Correlation,Break_data4Correlation,Robbery_data4Correlation,Theft_data4Correlation]),
        ///// WHAT THE HELL MOTHER F**ker!!! It took me one day to figure out the size problem, but it turned out the problem is the lack of stringfy data.
        ///// If you want to change the request size then set the app.use(bodyparser.json(limit:'50mb')), attention: only the first bodyparser will be excuted, so make sure the order is right.
        success:function (data) {
            console.log(data);



        },
        err:function () {

        }

    })
}

Mean_Center.onclick=function () {
    $.ajax({
        async : false,
        cache : false, //cache control doesn't work on ajax request, so the other option is to use local storage.
        type : 'POST',
        url:'/Mean_Center',
        dataType:'json',
        data:{crime_type:Index4Analysis},
        success:function (data) {

            console.log(data);
            for(let i=0;i<18;i++){
                    Visualize_Mean_Center(data[i],mymap,plineGroup);
            }

            },
        err:function (data) {


        }


    })

}

Standard_ellipse.onclick=function () {
    $.ajax({
        async : false,
        cache : false, //cache control doesn't work on ajax request, so the other option is to use local storage.
        type : 'POST',
        url:'/Standard_ellipse',
        dataType:'json',
        data:{crime_type:Index4Analysis},
        success:function (data) {
            for(let i=0;i<17;i++){
                //console.log(data[0]);
                Visualize_ellipse(data.result[i],mymap,plineGroup);

            }


        },
        error:function () {

        }

    })

};

Getis_ord.onclick=function () {
    plineGroup.eachLayer(function (layer) {
        layer.remove();
    })
    var clusterData;
    var judge=false;

    function getting(){
        $.ajax({
            context:this,
            async : false,
            cache : false,
            type : 'POST',
            url:'/GetisOrd',
            dataType:'json',
            data:{crime_type:Index4Analysis},
        /*    statusCode:{
                202:function () {
                    console.log('status is 202')
                    getting();

                },
                200:function (data) {
                    console.log('status is 200')
                    console.log(data);

                }
            },*/
            success:function (result) {

                if (result=='waiting'){
               /*     console.log('time to stop request');
                    console.log(result);
                    clusterData=result;
                    console.log($(this).xhr);
                    $(this).xhr.abort();//这地方会报错然后刚好跳出请求*/// this code could work but it has low efficiency

                }//this is runned everytime that the status of server side child processing running is waiting. Actually do nothing here.
                else{

                    clusterData=result;
                    judge=true;// this step stop the request loop
                    var geojsonMarkerOptions = {
                        radius: 16,
                        fillColor: "#0c00ff",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8

                    };
                    function onEachFeature(feature, layer) {
                        // does this feature have a property named popupContent?
                        if (feature.properties) {
                            layer.bindPopup('<br>'+'Crime type:'+feature.properties.Crime_type+'</br>'+'<br>'+'Occurance Date:'+feature.properties.Year.toString()+'/'+feature.properties.Month.toString()+'/'+feature.properties.Day.toString()+'&nbsp'+feature.properties.Time.toString()+':00'+'</br>'+'<br>'+'Division:'+feature.properties.Division.toString()+'</br>'+'<br>'+'Neighborhood:'+feature.properties.Neighborhood.toString()+'</br>');
                        }
                    }// The onEachFeature function needs to work only with string not number, so if you want to bindPopup sth, it has to be a string type, otherwise it give an error 'Failed to appendChild on node'
                    m=L.geoJSON(clusterData,{
                        pointToLayer: function (feature, latlng) {
                            //L.circleMarker(latlng, geojsonMarkerOptions).addTo(markers);
                            return L.circleMarker(latlng, geojsonMarkerOptions);
                        },
                        onEachFeature: onEachFeature

                    });
                    plineGroup.addLayer(m)
                    plineGroup.addTo(mymap);

                }// this is runned when the server side child processing is done, and then this step do the map render as well, and also stop the request loop.
            },
            error:function (err) {
                console.log('err:');
                console.log(err);

            },
            complete:function () {
                if(judge===false){
                    console.log('judge is false');
                    //interval = setInterval(getting,0);
                    setTimeout(getting,10000);

                }
                else {
                    console.log('judge is true');

                }
            }// complete function is a function that runs after success and error, in this function, use setTimeOut() to loop the request and control the loop by judge variable.
        })
    }

    getting();



  /*  var geojsonMarkerOptions = {
        radius: 16,
        fillColor: "#0c00ff",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8

    };
    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties) {
            layer.bindPopup('<br>'+'Crime type:'+feature.properties.Crime_type+'</br>'+'<br>'+'Occurance Date:'+feature.properties.Year.toString()+'/'+feature.properties.Month.toString()+'/'+feature.properties.Day.toString()+'&nbsp'+feature.properties.Time.toString()+':00'+'</br>'+'<br>'+'Division:'+feature.properties.Division.toString()+'</br>'+'<br>'+'Neighborhood:'+feature.properties.Neighborhood.toString()+'</br>');
        }
    }// The onEachFeature function needs to work only with string not number, so if you want to bindPopup sth, it has to be a string type, otherwise it give an error 'Failed to appendChild on node'
    m=L.geoJSON(clusterData,{
        pointToLayer: function (feature, latlng) {
            //L.circleMarker(latlng, geojsonMarkerOptions).addTo(markers);
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature

    });
    plineGroup.addLayer(m)
    plineGroup.addTo(mymap);*/
};



var combineMonthData=function (a1,a2,a3,a4) {

    var arr=[
        {Month:'January',frequency:a1[0].frequency+a2[0].frequency+a3[0].frequency+a4[0].frequency},
        {Month:'February',frequency:a1[1].frequency+a2[1].frequency+a3[1].frequency+a4[1].frequency},
        {Month:'March',frequency:a1[2].frequency+a2[2].frequency+a3[2].frequency+a4[2].frequency},
        {Month:'April',frequency:a1[3].frequency+a2[3].frequency+a3[3].frequency+a4[3].frequency},
        {Month:'May',frequency:a1[4].frequency+a2[4].frequency+a3[4].frequency+a4[4].frequency},
        {Month:'June',frequency:a1[5].frequency+a2[5].frequency+a3[5].frequency+a4[5].frequency},
        {Month:'July',frequency:a1[6].frequency+a2[6].frequency+a3[6].frequency+a4[6].frequency},
        {Month:'August',frequency:a1[7].frequency+a2[7].frequency+a3[7].frequency+a4[7].frequency},
        {Month:'September',frequency:a1[8].frequency+a2[8].frequency+a3[8].frequency+a4[8].frequency},
        {Month:'October',frequency:a1[9].frequency+a2[9].frequency+a3[9].frequency+a4[9].frequency},
        {Month:'November',frequency:a1[10].frequency+a2[10].frequency+a3[10].frequency+a4[10].frequency},
        {Month:'December',frequency:a1[11].frequency+a2[11].frequency+a3[11].frequency+a4[11].frequency},

    ];

    return arr;

}

var combineDivisionData=function (a1,a2,a3,a4) {


    var arr={'children':[{Division:'D11',frequency:a1.children[0].frequency+a2.children[0].frequency+a3.children[0].frequency+a4.children[0].frequency},
            {Division:'D12',frequency:a1.children[1].frequency+a2.children[1].frequency+a3.children[1].frequency+a4.children[1].frequency},
            {Division:'D13',frequency:a1.children[2].frequency+a2.children[2].frequency+a3.children[2].frequency+a4.children[2].frequency},
            {Division:'D14',frequency:a1.children[3].frequency+a2.children[3].frequency+a3.children[3].frequency+a4.children[3].frequency},
            {Division:'D51',frequency:a1.children[4].frequency+a2.children[4].frequency+a3.children[4].frequency+a4.children[4].frequency},
            {Division:'D52',frequency:a1.children[5].frequency+a2.children[5].frequency+a3.children[5].frequency+a4.children[5].frequency},
            {Division:'D53',frequency:a1.children[6].frequency+a2.children[6].frequency+a3.children[6].frequency+a4.children[6].frequency},
            {Division:'D54',frequency:a1.children[7].frequency+a2.children[7].frequency+a3.children[7].frequency+a4.children[7].frequency},
            {Division:'D55',frequency:a1.children[8].frequency+a2.children[8].frequency+a3.children[8].frequency+a4.children[8].frequency},
            {Division:'D22',frequency:a1.children[9].frequency+a2.children[9].frequency+a3.children[9].frequency+a4.children[9].frequency},
            {Division:'D23',frequency:a1.children[10].frequency+a2.children[10].frequency+a3.children[10].frequency+a4.children[10].frequency},
            {Division:'D31',frequency:a1.children[11].frequency+a2.children[11].frequency+a3.children[11].frequency+a4.children[11].frequency},
            {Division:'D32',frequency:a1.children[12].frequency+a2.children[12].frequency+a3.children[12].frequency+a4.children[12].frequency},
            {Division:'D33',frequency:a1.children[13].frequency+a2.children[13].frequency+a3.children[13].frequency+a4.children[13].frequency},
            {Division:'D41',frequency:a1.children[14].frequency+a2.children[14].frequency+a3.children[14].frequency+a4.children[14].frequency},
            {Division:'D42',frequency:a1.children[15].frequency+a2.children[15].frequency+a3.children[15].frequency+a4.children[15].frequency},
            {Division:'D43',frequency:a1.children[16].frequency+a2.children[16].frequency+a3.children[16].frequency+a4.children[16].frequency},]}

    return arr;
}

var combineTimeData=function (a1,a2,a3,a4) {


    var arr=[];

    for(var i=0;i<24;i++){
        arr.push(a1[i].frequency+a2[i].frequency+a3[i].frequency+a4[i].frequency)
    };

    return arr;
}

var combineWeekData=function (a1,a2,a3,a4) {

    var arr=[
        {Weekday:'Monday',frequency:a1[0].frequency+a2[0].frequency+a3[0].frequency+a4[0].frequency},
        {Weekday:'Tuesday',frequency:a1[1].frequency+a2[1].frequency+a3[1].frequency+a4[1].frequency},
        {Weekday:'Wednesday',frequency:a1[2].frequency+a2[2].frequency+a3[2].frequency+a4[2].frequency},
        {Weekday:'Thursday',frequency:a1[3].frequency+a2[3].frequency+a3[3].frequency+a4[3].frequency},
        {Weekday:'Friday',frequency:a1[4].frequency+a2[4].frequency+a3[4].frequency+a4[4].frequency},
        {Weekday:'Saturday',frequency:a1[5].frequency+a2[5].frequency+a3[5].frequency+a4[5].frequency},
        {Weekday:'Sunday',frequency:a1[6].frequency+a2[6].frequency+a3[6].frequency+a4[6].frequency}
    ];

    return arr;

}

var filterByCoordinates=function (data,bounds) {

}

},{"../routes/Spatial_analyzation/visualize_Mean_Center":15,"../routes/Spatial_analyzation/visualize_ellipse":16,"./Charts/DayChart":1,"./Charts/DayChart_All":2,"./Charts/DivisonChart":3,"./Charts/MonthChart":4,"./Charts/StackbarChart":5,"./Charts/Statistics":6,"./Charts/WeekChart":7,"./Correlation/Morans_I_Analysis":8,"./Correlation/Spatial Correlation1":9,"./DataToCSV/DivisonDataToCSV":10,"./DataToCSV/MonthDataToCSV":11,"./DataToCSV/TimeDataToCSV":12,"./DataToCSV/WeekDataToCSV":13}],15:[function(require,module,exports){
var Visualize_Mean_Center=function (data,mymap,plineGroup) {

    //  var plineGroup=L.layerGroup([]);
    var pline=[
        new L.LatLng(data[0].xMean,data[0].yMean),
        new L.LatLng(data[1].xMean,data[1].yMean),
        new L.LatLng(data[2].xMean,data[2].yMean),
        new L.LatLng(data[3].xMean,data[3].yMean),

    ];
    var plineOptions={color:'blue',weight:10};
    var polyline = L.polyline(pline,plineOptions);
    /*            var decorator = L.polylineDecorator(polyline, {
                    patterns: [
                        // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                        {offset: 0, repeat: 20, symbol: L.Symbol.ArrowHead({pixelSize: 10})}
                    ]
                }).addTo(mymap);*/
    /*   polyline.on('mouseover', function () {
           this.setText('  ►  ', {repeat: true, attributes: {fill: 'red'}});
       });

       polyline.on('mouseout', function () {
           this.setText(null);
       });*/
    polyline.setText('  ►  ', {repeat: true, attributes: {fill: 'red'}});
    //mymap.fitBounds(polyline.getBounds());
    plineGroup.addLayer(polyline);
    plineGroup.addTo(mymap);

}

module.exports=Visualize_Mean_Center;
},{}],16:[function(require,module,exports){
var draw_ellipse=function (data,mymap,plineGroup) {
    console.log(data);
    var ellipse=L.ellipse([data.x,data.y],[data.semi_major*100000,data.semi_minus*100000],data.degree);
    plineGroup.addLayer(ellipse);
    plineGroup.addTo(mymap);

}

module.exports=draw_ellipse;
},{}]},{},[14]);
