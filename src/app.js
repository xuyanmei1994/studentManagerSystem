const express = require('express');



const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

//session缓存验证码
//使用req.session的中间件

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 10*60000 }}))


 app.all("*",(req,res,next)=>{
    if(req.url.includes("studentManager")){
        if(req.session.userName){
            next()
        }else{
            res.send("<script>alert('请先登录!');window.location='/account/login'</script>")
        }
    }else{
        next()
    }
})

//处理注册页面
app.use(bodyParser.urlencoded({ extended: false }))

//设置内置中间件, 对静态资源进行处理
app.use(express.static('statics'));


//对浏览器的请求分开处理
const accountRouter = require(path.join(__dirname,'./routers/accountRouter.js'));
app.use('/account',accountRouter);

const studentRouter = require(path.join(__dirname,'./routers/studentRouter.js'));
app.use('/studentManager',studentRouter);





app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err);
    }
    console.log('start ok');
})