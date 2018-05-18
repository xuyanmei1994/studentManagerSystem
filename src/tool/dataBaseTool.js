const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'test';
const ObjectId = require('mongodb').ObjectId

exports.ObjectId = ObjectId

exports.getList = (collectionname, params, callback) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);
        const collection = db.collection(collectionname);

        collection.find(params).toArray(function (err, docs) {
            client.close();
            callback(err, docs);
        });

    });
}

exports.getOne = (collectionname, params, callback) => {
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);
        const collection = db.collection(collectionname);

        collection.findOne(params,function (err, doc) {
            client.close();
            callback(err, doc);
        });
    });
}

exports.insertOne = (callbackname,params,callback)=>{
    MongoClient.connect(url, function(err, client) {
       
        const db = client.db(dbName);
        const collection = db.collection(callbackname);

        collection.insertOne(params, function(err, result) {
            client.close();
            callback(err,result);
          });
       
        
      });
}

exports.updataOne=(collectionname,condition,params,callback)=>{
    MongoClient.connect(url, function(err, client) {
       
        const db = client.db(dbName);
        const collection = db.collection(collectionname);
        collection.updateOne(condition
            , { $set: params }, function(err, result) {
            client.close();
            callback(err,result);
          });  
      });
}

exports.deleteOne=(collectionname,params,callback)=>{
    MongoClient.connect(url, function(err, client) {
       
        const db = client.db(dbName);
        const collection = db.collection(collectionname);
        collection.deleteOne(params, function(err, result) {
            client.close();
            callback(err,result);
          })
      });
}