const express = require('express');
const studentRouter = express.Router();
const path =require('path');


const studentCtrl = require(path.join(__dirname,'../controller/studentController.js'));

studentRouter.get('/list',studentCtrl.getStudentManagerPage);


//获取新增页面
studentRouter.get('/add',studentCtrl.getAddPage);

//保存新增信息
studentRouter.post('/add',studentCtrl.add);
//获取编辑信息页面
studentRouter.get('/edit/:studentId',studentCtrl.getEditPage);

//处理修改信息
studentRouter.post('/edit/:studentId',studentCtrl.edit);

studentRouter.get('/deleteInfo/:studentId',studentCtrl.deleteInfo);





module.exports = studentRouter;