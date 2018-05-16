const express = require('express');
const accountRouter = express.Router();

const path = require('path');
const accountControl=require(path.join(__dirname,'../controller/accountController.js'));

accountRouter.get('/login',accountControl.getLoginPage);
accountRouter.get('/vcode',accountControl.getVcode);

module.exports=accountRouter;