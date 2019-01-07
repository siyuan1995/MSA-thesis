/*var reada=require('./Read_Assualt.js')
var Upper=require('assert');
var a=require('atob');*/

var $=jQuery.noConflict();

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



var mymap = L.map('map').setView([43.6532, -79.3832], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidHJpc3RhbjE5OTUiLCJhIjoiY2pvamhocHoxMDA4dTNrb2dva2dlYmQwYyJ9.wCtGhSIHYl5qxH9jLXNxaA'
}).addTo(mymap);



var assult_section=document.getElementById('assualt_section');
var breakEnter_section=document.getElementById('break_and_enter');
var Homecide_section=document.getElementById('Homecide');
var Robbery_section=document.getElementById('Robbery');
var Theft_section=document.getElementById('Theft');
var All_Crime=document.getElementById('All_Crime');
//var DayChartDom=document.getElementById('DayChart');
var All_Data4Statistics;

assult_section.onclick=function () {
    var Assualt_data;
    var data_for_chart;
    var Weekday_for_chart;
    var Month_for_chart;
    var Divison_for_chart;

$.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
             async : false,
             cache : false,
             type : 'POST',
             url:'/Read_Assualt', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
             //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
             datatype:'json',
             data:{


             },
             success:function(data){
                 Assualt_data=data;
                 All_Data4Statistics=data;

                 data_for_chart=DataToCSV(Assualt_data);
                 console.log(data_for_chart);
                 DayChart(data_for_chart,'DayChart');

                 Weekday_for_chart=WeekDataToCSV(data);
                 console.log(Weekday_for_chart);
                 WeekChart(Weekday_for_chart,'WeekChart');

                 Month_for_chart=MonthDataToCSV(data);
                 console.log(Month_for_chart);
                 MonthChart(Month_for_chart,'MonthChart');

                 Divison_for_chart=DivisonDataToCSV(data);
                 console.log(Divison_for_chart);
                 DivisonChart(Divison_for_chart,'DivisonChart');

                 Statistic(Assualt_data,Weekday_for_chart,Month_for_chart,Divison_for_chart,'statisticsDom');


             },
             error:function(){}
         })

   /* mymap.removeLayer(delLayer);
    var delLayer;*/

    var geojsonMarkerOptions = {
        radius: 8,
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
    L.geoJSON(Assualt_data,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);


        },
        onEachFeature: onEachFeature

    }).addTo(mymap) ;
    //DayChart(data_for_chart,DayChartDom);





}

breakEnter_section.onclick=function () {
    var breakEnter;
    var data_for_chart;
    var Weekday_for_chart;
    var Month_for_chart;
    var Divison_for_chart;

    $.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
        async : false,
        cache : false,
        type : 'POST',
        url:'/Read_break', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        datatype:'json',
        data:{


        },
        success:function(data){
            breakEnter=data;
            data_for_chart=DataToCSV(breakEnter);
            console.log(data_for_chart);
            DayChart(data_for_chart,'DayChart');

            Weekday_for_chart=WeekDataToCSV(data);
            console.log(Weekday_for_chart);
            WeekChart(Weekday_for_chart,'WeekChart');

            Month_for_chart=MonthDataToCSV(data);
            console.log(Month_for_chart);
            MonthChart(Month_for_chart,'MonthChart');

            Divison_for_chart=DivisonDataToCSV(data);
            console.log(Divison_for_chart);
            DivisonChart(Divison_for_chart,'DivisonChart');

            Statistic(breakEnter,Weekday_for_chart,Month_for_chart,Divison_for_chart,'statisticsDom');

        },
        error:function(){}
    })



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

    L.geoJSON(breakEnter,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    }).addTo(mymap);




}

Homecide_section.onclick=function () {
    var Homecide_data;
    var data_for_chart;
    var Weekday_for_chart;
    var Month_for_chart;
    var Divison_for_chart;


    $.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
        async : false,
        cache : false,
        type : 'POST',
        url:'/Read_Homecide', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        datatype:'json',
        data:{


        },
        success:function(data){
            Homecide_data=data;
            data_for_chart=DataToCSV(Homecide_data);
            console.log(data_for_chart);
            DayChart(data_for_chart,'DayChart');
            console.log(data);

            Weekday_for_chart=WeekDataToCSV(data);
            console.log(Weekday_for_chart);
            WeekChart(Weekday_for_chart,'WeekChart');

            Month_for_chart=MonthDataToCSV(data);
            console.log(Month_for_chart);
            MonthChart(Month_for_chart,'MonthChart');

            Divison_for_chart=DivisonDataToCSV(data);
            console.log(Divison_for_chart);
            DivisonChart(Divison_for_chart,'DivisonChart');

            Statistic(Homecide_data,Weekday_for_chart,Month_for_chart,Divison_for_chart,'statisticsDom');

        },
        error:function(){}
    })


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

    L.geoJSON(Homecide_data,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    }).addTo(mymap);




}

Robbery_section.onclick=function () {
    var Robbery_data;
    var data_for_chart;
    var Weekday_for_chart;
    var Month_for_chart;
    var Divison_for_chart;

    $.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
        async : false,
        cache : false,
        type : 'POST',
        url:'/Read_Robbery', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        datatype:'json',
        data:{


        },
        success:function(data){
            Robbery_data=data;
            data_for_chart=DataToCSV(Robbery_data);
            console.log(data_for_chart);
            DayChart(data_for_chart,'DayChart');

            Weekday_for_chart=WeekDataToCSV(data);
            console.log(Weekday_for_chart);
            WeekChart(Weekday_for_chart,'WeekChart');

            Month_for_chart=MonthDataToCSV(data);
            console.log(Month_for_chart);
            MonthChart(Month_for_chart,'MonthChart');

            Divison_for_chart=DivisonDataToCSV(data);
            console.log(Divison_for_chart);
            DivisonChart(Divison_for_chart,'DivisonChart');

            Statistic(Robbery_data,Weekday_for_chart,Month_for_chart,Divison_for_chart,'statisticsDom');

        },
        error:function(){}
    })


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

    L.geoJSON(Robbery_data,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    }).addTo(mymap);




}

Theft_section.onclick=function () {
    var Theft_data;
    var data_for_chart;
    var Weekday_for_chart;
    var Month_for_chart;
    var Divison_for_chart;

    $.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
        async : false,
        cache : false,
        type : 'POST',
        url:'/Read_Theft', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        datatype:'json',
        data:{


        },
        success:function(data){
            Theft_data=data;
            data_for_chart=DataToCSV(Theft_data);
            console.log('Theft_Data');
            console.log(Theft_data);
            DayChart(data_for_chart,'DayChart');

            Weekday_for_chart=WeekDataToCSV(data);
            console.log(Weekday_for_chart);
            WeekChart(Weekday_for_chart,'WeekChart');

            Month_for_chart=MonthDataToCSV(data);
            console.log(Month_for_chart);
            MonthChart(Month_for_chart,'MonthChart');

            Divison_for_chart=DivisonDataToCSV(data);
            console.log(Divison_for_chart);
            DivisonChart(Divison_for_chart,'DivisonChart');

            Statistic(Theft_data,Weekday_for_chart,Month_for_chart,Divison_for_chart,'statisticsDom');

        },
        error:function(){}
    })


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

    L.geoJSON(Theft_data,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    }).addTo(mymap);




}

All_Crime.onclick=function(){


    $.ajax({// 这地方不能直接html和后台进行交流，必须通过router, AJAX itself is a asynchronous http request,
        async : false,
        cache : false,
        type : 'POST',
        url:'/Read_All', // the path here is like you give the name for the link. specifies the URL to send the request to. Default is the
        //current page. AND THIS STEP EQUALS TO SEND A REQUEST TO THE PATH '/Coords'
        datatype:'json',
        data:{


        },
        success:function(data){
            console.log(data);

            var Day_arr0=DataToCSV(data[0].values);
            var Day_arr1=DataToCSV(data[1].values);
            var Day_arr2=DataToCSV(data[2].values);
            var Day_arr3=DataToCSV(data[3].values);
            DayChart_All(Day_arr0,Day_arr1,Day_arr2,Day_arr3,'DayChart');
            var Day_arr=combineTimeData(Day_arr0,Day_arr1,Day_arr2,Day_arr3);
            console.log('Day_all');
            console.log(Day_arr);

            var Week_arr0=WeekDataToCSV(data[0].values);
            var Week_arr1=WeekDataToCSV(data[1].values);
            var Week_arr2=WeekDataToCSV(data[2].values);
            var Week_arr3=WeekDataToCSV(data[3].values);
            console.log(Week_arr0);
            StackbarChart(Week_arr0,Week_arr1,Week_arr2,Week_arr3,'WeekChart');
            var Week_arr=combineWeekData(Week_arr0,Week_arr1,Week_arr2,Week_arr3);
            console.log(Week_arr);

            var Month_arr0=MonthDataToCSV(data[0].values);
            var Month_arr1=MonthDataToCSV(data[1].values);
            var Month_arr2=MonthDataToCSV(data[2].values);
            var Month_arr3=MonthDataToCSV(data[3].values);
            var Month_arr=combineMonthData(Month_arr0,Month_arr1,Month_arr2,Month_arr3);
            console.log(Month_arr);
            MonthChart(Month_arr,'MonthChart');



            var Division_arr0=DivisonDataToCSV(data[0].values);
            var Division_arr1=DivisonDataToCSV(data[1].values);
            var Division_arr2=DivisonDataToCSV(data[2].values);
            var Division_arr3=DivisonDataToCSV(data[3].values);
            var Division_arr=combineDivisionData(Division_arr0,Division_arr1,Division_arr2,Division_arr3);
            console.log(Division_arr);
            DivisonChart(Division_arr,'DivisonChart');


            Statistic(All_Data4Statistics,Week_arr,Month_arr,Division_arr,'statisticsDom');









        },
        error:function(){}
    })

}

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

    for(var i=0;i<25;i++){
        arr.push({Time:i,frequency:a1[i].frequency+a2[i].frequency+a3[i].frequency+a4[i].frequency})
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
