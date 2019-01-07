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
    console.log(dataset);
    console.log(series);


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