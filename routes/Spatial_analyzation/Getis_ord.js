var app = require('express');
var router = app.Router();
var read_crime=require('../Read/Read_Crime');
var AWS=require('aws-sdk');
var clusterArrPoints;
var crime_data;
var shpwrite=require('shp-write');
var py;
var fs=require('fs')
var {execFile}=require('child_process');
var index=0;// this is the index for checking if this is the first time to run the child process, the reason is to avoid re reunning the child process every time ajax send the request



router.post('/',function (req,res) {

    if(index==0)
    {
        switch (req.body.crime_type){
        case'assualt':
            crime_data=read_crime('Assualt_Class','Assult.xlsx','Assualt',100);
            break;
        case'break':
            crime_data=read_crime('break_and_enter_Class','Break_and_enter.xlsx','break_and_enter',100);
            break;
        case'robbery':
            crime_data=read_crime('Robbery_Class','Robbery.xlsx','Robbery',100);
            break;
        case'theft':
            crime_data=read_crime('Theft_Over_Class','Theft_Over.xlsx','Theft_Over',100);
            break;

    }
        var data1=crime_data;
        var clusterArr=[];

        // This is async function, for an async function, the call back will run after the function is done.
        py  = execFile('python', ['C:/Users/User/WebstormProjects/Dashboard/routes/pythons/function1.py'],{maxBuffer:1024*1000000},function (error, stdout, stderr)  {
                if (error) {
                    console.log('error occurred: ' + error);
                } else {

                    //console.log('stdout: ' + stdout);
                    var stdoutArray=stdout.substring(1,stdout.length-3);
                    var arr=stdoutArray.split(/\,\s?(?![^\[]*\])/);// 这个正则表达式用的精确

                    for(var i=0;i<arr.length;i++)
                    {
                        var subarr=arr[i].replace(/[\[\]']+/g, '');
                        var finalarr=subarr.split(',');

                        for(var ii=0;ii<finalarr.length;ii++){
                            var integer = parseInt(finalarr[ii], 10);
                            finalarr[ii]=integer;
                        }// string to integer

                        if(finalarr.length!=1&&finalarr[0]!=NaN){
                            clusterArr.push(finalarr)
                        }// get rid of empty elements

                    }

                    var clusterArrConcat=[];
                    for(var ic = 0; ic < clusterArr.length; ic++)
                    {
                        clusterArrConcat = clusterArrConcat.concat(clusterArr[ic]);
                    }// concat clusterArr to one array

                    function isBigEnough(ele) {
                        return clusterArrConcat.includes(ele.properties.Index);
                    }// this step is to only pick the elements that includes the ele.properties.Index

                    clusterArrPoints=data1.filter(isBigEnough)// js array filter, this step is an alternative for 'for loop', this step pick out the elements that fulfill the requirments of 'isBigEnough'
                    console.log('stderr: ' + stderr);


                }
            })
        py.stdout.on('data', function(data){
            //dataString += data.toString();
            dataString=data;
        });
        py.stdin.write(JSON.stringify(data1));
        py.stdin.end();
        if(clusterArrPoints){
            res.send(clusterArrPoints)
        }
        else res.send('waiting');
        index=index+1;
    }
    else{
        if(clusterArrPoints){
            res.send(clusterArrPoints);
            try{
                json2shp();
            }
            catch (e) {
                console.log(e)
            }
        }
        else res.send('waiting');

    }// this ensure the child process only run once and the others request just check the process status



    /*switch (req.body.crime_type){
        case'assualt':
            crime_data=read_crime('Assualt_Class','Assult.xlsx','Assualt');
            break;
        case'break':
            crime_data=read_crime('break_and_enter_Class','Break_and_enter.xlsx','break_and_enter');
            break;
        case'robbery':
            crime_data=read_crime('Robbery_Class','Robbery.xlsx','Robbery');
            break;
        case'theft':
            crime_data=read_crime('Theft_Over_Class','Theft_Over.xlsx','Theft_Over');
            break;

    }
    var data1=crime_data;
    var clusterArr=[];

    // This is async function, for an async function, the call back will run after the function is done.
    py  = execFile('python', ['C:/Users/User/WebstormProjects/Dashboard/routes/pythons/function1.py'],{maxBuffer:1024*1000000},function (error, stdout, stderr)  {
            if (error) {
                console.log('error occurred: ' + error);
            } else {

                //console.log('stdout: ' + stdout);
                var stdoutArray=stdout.substring(1,stdout.length-3);
                var arr=stdoutArray.split(/\,\s?(?![^\[]*\])/);// 这个正则表达式用的精确

                for(var i=0;i<arr.length;i++)
                {
                    var subarr=arr[i].replace(/[\[\]']+/g, '');
                    var finalarr=subarr.split(',');

                    for(var ii=0;ii<finalarr.length;ii++){
                        var integer = parseInt(finalarr[ii], 10);
                        finalarr[ii]=integer;
                    }

                    if(finalarr.length!=1&&finalarr[0]!=NaN){
                        clusterArr.push(finalarr)
                    }


                }

                //console.log(clusterArr);

                var clusterArrConcat=[];// concat clusterArr to one array
                for(var ic = 0; ic < clusterArr.length; ic++)
                {
                    clusterArrConcat = clusterArrConcat.concat(clusterArr[ic]);
                }

                //console.log(clusterArrConcat);

                function isBigEnough(ele) {
                    return clusterArrConcat.includes(ele.properties.Index);
                    //return ele.properties.Index==15;
                }

                clusterArrPoints=data1.filter(isBigEnough)

                //console.log(clusterArrPoints);


                console.log('stderr: ' + stderr);


            }
        })
    py.stdout.on('data', function(data){
        //dataString += data.toString();
        dataString=data;
    });
    py.stdin.write(JSON.stringify(data1));
    py.stdin.end();*/

/*    if(clusterArrPoints){
        //res.sendStatus(200).send(clusterArrPoints);
        res.send(clusterArrPoints)
    }
    else response.write('_testcb(\'ok\')', 'utf8');
         response.end();*/







})


/*
var json2shp=function(){

 /!*   var options = {
        folder: 'C:/Users/User/Desktop/THESIS/shp',
        types: {
            point: 'mypoints',
            polygon: 'mypolygons',
            line: 'mylines'
        }
    }

    shpwrite.download({
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [0, 0]
                },
                properties: {
                    name: 'Foo'
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [0, 10]
                },
                properties: {
                    name: 'Bar'
                }
            }
        ]
    }, options);*!/

    var points = [
        [0, 0],
        [10, 0],
        [10, 10],
        [-10, 10],
        [-10, -10]
    ];

    var datas = [0, 1, 2, 3, 4].map(function(_) { return { id: _ }; });

    shpwrite.write(
        // feature data
        datas,
        // geometry type
        'POINT',
        // geometries
        points,
        finish);

    function finish(err, files) {
        var shp=fs.writeFileSync('C:\\Users\\User\\Desktop\\THESIS\\point.shp', toBuffer(files.shp.buffer));
        fs.writeFileSync('points.shx', toBuffer(files.shx.buffer));
        fs.writeFileSync('points.dbf', toBuffer(files.dbf.buffer));
        console.log(shp);
    }

    function toBuffer(ab) {
        var buffer = new Buffer.from(ab),
            view = new Uint8Array(ab);
        for (var i = 0; i < buffer.length; ++i) { buffer[i] = view[i]; }
        return buffer;
    }
}
*/


module.exports=router;