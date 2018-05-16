const fs = require('fs');
const path = require('path');
const captchapng = require('captchapng');

module.exports.getLoginPage = (req,res)=>{
    fs.readFile(path.join(__dirname,'../statics/views/login.html'),(err,data)=>{

        res.setHeader('content-type','text/html;charset=utf-8');
        res.end(data);
    });
}

module.exports.getVcode=(req,res)=>{

    var p = new captchapng(80,30,parseInt(Math.random()*9000+1000)); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);

}
