var draw_ellipse=function (data,mymap,plineGroup) {
    console.log(data);
    var ellipse=L.ellipse([data.x,data.y],[data.semi_major,data.semi_minus],data.degree);
    plineGroup.addLayer(ellipse);
    plineGroup.addTo(mymap);

}

module.exports=draw_ellipse;