const express = require('express');

const app = express();

const path = require('path');
const accountRouter = require(path.join(__dirname,'./routers/accountRouter.js'));

app.use(express.static('statics'));

app.use('/account',accountRouter);


app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err);
    }
    console.log('start ok');
})