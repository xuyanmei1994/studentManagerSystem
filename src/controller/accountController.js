const fs = require('fs');
const path = require('path');
const captchapng = require('captchapng');
const dataBaseTool = require(path.join(__dirname, '../tool/dataBaseTool.js'));


//处理登录界面
module.exports.getLoginPage = (req, res) => {
    fs.readFile(path.join(__dirname, '../statics/views/login.html'), (err, data) => {

        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.end(data);
    });
}


//处理图片验证码

module.exports.getVcode = (req, res) => {

    const vcode = parseInt(Math.random() * 9000 + 1000);
    req.session.vcode = vcode;//保存验证码到浏览器的session里
    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);

}

//获取注册页面
module.exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/register.html'));
}

//处理注册页面
module.exports.register = (req, res) => {
    const result = {
        status: 0,
        message: '注册成功'
    }

    // console.log(req.body);


    dataBaseTool.getOne('accountInfo', { username: req.body.username }, (err, doc) => {
        if (doc == null) {

            dataBaseTool.insertOne('accountInfo', req.body, (err, backdata) => {
                if (err) {
                    // console.log(err);
                    result.status = 2;
                    result.message = '注册失败';
                }
                res.json(result);
            })
        } else {
            result.status = 1;
            result.message = '用户名已经存在';
            res.json(result);
        }
    })

    // collection.findOne({username:req.body.username},function(err, docs) {
    //     if(docs==null){
    //         collection.insertOne(req.body, (err, backdata)=> {
    //             if(err){
    //                 result.status=2;
    //                 result.message='注册失败';
    //             }
    //             client.close();
    //             res.json(result);
    //           });
    //     }else {
    //         client.close();
    //         result.status=1;
    //         result.message='用户名已经存在';
    //         res.json(result);
    //     }
    //   });

}


//处理登录页面
module.exports.login = (req, res) => {
    const result = {
        status: 0,
        message: '登录成功'
    }

    

    //校验验证码
    if (req.session.vcode != req.body.vcode) {
        result.status = 1;
        result.message = '验证码错误';
        res.json(result);
        return;
    }

    dataBaseTool.getOne('accountInfo',{ username: req.body.username, password: req.body.password },(err,doc)=>{
        if (doc == null) {
            result.status = 2;
            result.message = '用户名或密码错误';
        } else {
            req.session.userName = req.body.username;
            
        }
        res.json(result);
    })

    // MongoClient.connect(url, function (err, client) {

    //     const db = client.db(dbName);
    //     const collection = db.collection('accountInfo');

    //     collection.findOne({ username: req.body.username, password: req.body.password }, function (err, docs) {
    //         if (docs == null) {
    //             result.status = 2;
    //             result.message = '用户名或密码错误';
    //             res.json(result);
    //         } else {
    //             client.close();
    //             res.json(result);
    //         }
    //     });
    // });


    // res.json(result);
}

//登出
exports.logout=(req,res)=>{
    req.session.userName=null;
    res.send("<script>window.location='/account/login'</script>")

}