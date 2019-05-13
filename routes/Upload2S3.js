var express = require('express');
var router = express.Router();
const AWS=require('aws-sdk');
const fs=require('fs');
var S3FS=require('s3fs'); //S3FS provides a drop-in replacement for the File System (FS) implementation that is available with Node.JS allowing a distributed file-system to be used by Node.JS applications through the well-known FS interface used by Node.JS.
var multipart = require('connect-multiparty');// used for parsing http requests with content-type 'multipart/form-data', also know as file uploads
var multipartMiddleware = multipart();
var readline=require('readline');
const {Pool}=require('pg');
const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CrimeEvent',
    password: 'lsy19950117',
    port: 5432,
});// create PostgreSQL instance



router.post('/',multipartMiddleware,function (req,res) {//the multipartMiddleware allows the req.files to be possible

        //console.log(req.files);// req.files undefined error: This is because if you use body.parser only handled JSON and urlencoded form submissions, while uplodiing files is multipart which is not supported by
                            //by body.parser, in this case, you need to use busboy or multer
        AWS.config.update({
        accessKeyId: "AKIAIINMMAV76TT5LMKA",
        secretAccessKey: "cyE/2gKmmVq9slxap7sxA2F2A73g+hjRoKhLXdrx",
        //endpoint: 's3-eu-central-1.amazonaws.com', // if you want to read something here from your bucket, you need to comment the endpoint here. Otherwise, you got an err :AWS S3: The bucket you are attempting to access must be addressed using the specified endpoint
        signatureVersion: 'v4',
        //region: 'eu-central-1',
        });// configure AWS

        var s3=new AWS.S3();
        var s3fsImpl=new S3FS('dashboard-bucket-to-get-user-client-data', {
            accessKeyId: "AKIAIINMMAV76TT5LMKA",
            secretAccessKey: "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",
            endpoint: 's3-eu-central-1.amazonaws.com',
            signatureVersion: 'v4',
            region: 'eu-central-1',
            //httpOptions.timeout = 0;
            //ContentLength: part.byteCount,

        });// create a S3F3 instance
        var s3_path=req.files.local_input["path"];//the local_input is the name of the input form, req,files.NameofElemnent get the input content
        var originalFilename=req.files.local_input["originalFilename"];
        var stream = fs.createReadStream(s3_path);// the data has to be a stream object to be written into S3
        s3fsImpl.writeFile(originalFilename, stream).then(function () {
            fs.unlink(s3_path, function (err) {
                if (err) {
                    console.log('Please retry');
                }
            });
            res.status(200).end();
        });// after get the local input write it to S3


        var params={Bucket: 'dashboard-bucket-to-get-user-client-data', Key:originalFilename};// To retrieve object from S3 by key which is the originalFilename
        var crime_row;
        var crime_cell;
        var s3object = s3.getObject(params,function (err,data) {
            if (err) {
                console.log(err);
            } else {

                var crimedata=data.Body.toString('utf-8');
                crime_row=splitstringBynewline(crimedata);
                console.log(crime_row);
                EmptyTable();
                for(var i=1;i<crime_row.length;i++){
                    var crime_event=splitstrignBycomma(crime_row[i]);
                    var type='crime';
                    var lat=crime_event[1];
                    var long=crime_event[0];
                    var year=crime_event[4];
                    var month=crime_event[5];
                    var day=crime_event[2];
                    var time=crime_event[2];
                    var weekday=crime_event[2];
                    var division=crime_event[5];
                    var neighborhood=crime_event[9];
                    var FID=crime_event[12];

                    if(type&&lat&&long&&year&&month&&day&&time&&weekday&&division&&neighborhood&&FID)

                    {Write2Postgre(type,lat,long,year,month,day,time,weekday,division,neighborhood,FID);}


                }// parse the data from S3 and then write data into Postgresql table.

            }
        });// get object file that user uploaded to S3 and write it into postgresql table.

       /* for(var i=1;i<crime_row.length;i++){
            var crime_event=splitstrignBycomma(crime_row[i]);
            var type='crime';
            var lat=crime_event[1];
            var long=crime_event[0];
            var year=crime_event[4];
            var month=crime_event[5];
            var day=crime_event[7];
            var time=crime_event[7];
            var weekday=crime_event[7];
            var division=crime_event[5];
            var neighborhood=crime_event[9];
            var FID=crime_event[12];

            if(type&&lat&&long&&year&&month&&day&&time&&weekday&&division&&neighborhood&&FID)

            {Write2Postgre(type,lat,long,year,month,day,time,weekday,division,neighborhood,FID);}


        }*/


  /*  var s3=new AWS.S3();
    var s3fsImpl=new S3FS('dashboard-bucket-to-get-user-client-data', {
        accessKeyId: "AKIAIINMMAV76TT5LMKA",
        secretAccessKey: "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",
        endpoint: 's3-eu-central-1.amazonaws.com',
        signatureVersion: 'v4',
        region: 'eu-central-1',
        //httpOptions.timeout = 0;
        //ContentLength: part.byteCount,

    });
    var s3_path=req.files.local_input["path"];
    var originalFilename=req.files.local_input["originalFilename"];
    var stream = fs.createReadStream(s3_path);
    s3fsImpl.writeFile(originalFilename, stream).then(function () {
        fs.unlink(s3_path, function (err) {
            if (err) {
                console.log('Please retry');
            }
        });
        res.status(200).end();
    });*/

   res.send('success');
});



var splitstringBynewline=function(dataBody){
    var res=dataBody.split("\n");
    return res;
}// function to parse data from S3
var splitstrignBycomma=function(dataBody){
    var res=dataBody.split(",");
    return res;
}// function to parse data from S3
var Write2Postgre=function(type,lat,long,year,month,day,time,weekday,division,neighborhood,FID){

    const text = 'INSERT INTO "CrimeEventFromCustomer"(type,lat,long,year,month,day,time,weekday,division,neighborhood,"FID") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *'
    const values = [type,lat,long,year,month,day,time,weekday,division,neighborhood,FID];
    pool.query(text, values, (err, res) => {
        if (err) {
            throw err
        }

        console.log('user:', res.rows[0])
    })
}// sql code to write data into sql
var EmptyTable=function(){

    pool.query('TRUNCATE TABLE "CrimeEventFromCustomer"', (err, res) => {
        if (err) {
            throw err
        }

        console.log('user:', res.rows[0])
    })
} // empty table every time its run

module.exports=router;




