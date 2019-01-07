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