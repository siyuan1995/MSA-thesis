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