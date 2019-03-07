var xlsx=require('xlsx');
var express = require('express');
var router = express.Router();
var workbook=xlsx.readFile('C:/Users/User/Desktop/matrix.xlsx');// ERROR: _fs.readFileSync is not a function. That's because       its trying to read xlsx file from client side. c
var first_sheet_name = workbook.SheetNames[0];
var worksheet = workbook.Sheets[first_sheet_name];

router.post('/',function (req,res) {

    res.send(workbook);


})
module.exports=router;