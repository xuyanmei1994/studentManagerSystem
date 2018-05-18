
const path = require('path');



const xtpl = require('xtpl');
const databaseTool = require(path.join(__dirname,'../tool/dataBaseTool.js'));
 
// Database Name

//返回列表页
module.exports.getStudentManagerPage=(req,res)=>{
        var keyword = req.query.keyword||"";

       databaseTool.getList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
            xtpl.renderFile(path.join(__dirname,'../statics/views/list.html'),{
                students:docs,
                keyword,
                userName:req.session.userName
            },function(error,content){
                res.send(content);              
            });
            
       })
}

//返回新增页
exports.getAddPage=(req,res)=>{
    xtpl.renderFile(path.join(__dirname,'../statics/views/add.html'),{
        userName:req.session.userName
    },function(error,content){
        res.send(content);              
    });
}

//新增学生信息
exports.add=(req,res)=>{
    databaseTool.insertOne('studentInfo',req.body,(err,result)=>{
         if(err){
            res.send('<script>alert("插入失败")</script>');
         }else {
            res.send('<script>window.location.href = "/studentManager/list"</script>')
          }
    })
}
//获取修改信息页面
exports.getEditPage=(req,res)=>{
    const studentId = databaseTool.ObjectId(req.params.studentId);
    databaseTool.getOne('studentInfo',{_id:studentId},(err,docs)=>{
        xtpl.renderFile(path.join(__dirname,'../statics/views/edit.html'),{
            studentInfo:docs,
            userName:req.session.userName
        },function(error,content){
            res.send(content);              
        });
    })
    
}

//处理修改信息
exports.edit=(req,res)=>{
    const studentId = databaseTool.ObjectId(req.params.studentId);
    databaseTool.updataOne('studentInfo',{_id:studentId},req.body,(err,result)=>{
        console.log(err);
        if(err){
            console.log(err);
           res.send("<script>alert('修改失败')</script>")
        }else {
            res.send("<script>window.location.href = '/studentManager/list'</script>")
        }
    })
}

///处理删除
exports.deleteInfo=(req,res)=>{
    const studentId = databaseTool.ObjectId(req.params.studentId);
    databaseTool.deleteOne('studentInfo',{_id:studentId},(err,result)=>{
        if(err){
            console.log('出现了错误'+err);
            res.send('<script>alert("删除失败")</script>');
        }else{
            res.send('<script>window.location.href = "/studentManager/list"</script>')
        }
    })
}

