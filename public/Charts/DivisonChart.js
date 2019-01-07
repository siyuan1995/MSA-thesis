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