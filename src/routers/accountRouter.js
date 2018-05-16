const express = require('express');
const accountRouter = express.Router();

const path = require('path');
const accountControl=require(path.join(__dirname,'../controller/accountController.js'));


accountRouter.get('/login',accountControl.getLoginPage);

accountRouter.get('/vcode',accountControl.getVcode);

accountRouter.get('/register',accountControl.getRegisterPage);

accountRouter.post('/register',accountControl.register);

accountRouter.post('/login',accountControl.login);


module.exports=accountRouter;