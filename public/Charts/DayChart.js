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