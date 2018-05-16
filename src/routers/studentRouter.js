const express = require('express');
const studentRouter = express.Router();
const path =require('path');
const studentCtrl = require(path.join(__dirname,'../controller/studentController.js'));

studentRouter.get('/list',studentCtrl.getStudentManagerPage);


module.exports = studentRouter;