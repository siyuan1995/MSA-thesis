var Visualize_Mean_Center=function (data,mymap,plineGroup) {

    //  var plineGroup=L.layerGroup([]);
    var pline=[
        new L.LatLng(data[0].yMean,data[0].xMean),
        new L.LatLng(data[1].yMean,data[1].xMean),
        new L.LatLng(data[2].yMean,data[2].xMean),
        new L.LatLng(data[3].yMean,data[3].xMean),

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