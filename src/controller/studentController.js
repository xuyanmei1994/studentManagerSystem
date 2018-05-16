const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'test';

module.exports.getStudentManagerPage=(req,res)=>{
    MongoClient.connect(url, function(err, client) {
       
        const db = client.db(dbName);
        const collection = db.collection('studentInfo');
        collection.find({}).toArray(function(err, docs) {
            console.log(docs);
            
          });     
          client.close();
      });
}