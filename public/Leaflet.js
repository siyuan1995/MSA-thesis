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
