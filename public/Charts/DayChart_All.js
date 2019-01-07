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