var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/users';

router.get('/', function(req, res, next){
    //get mongo connection
    MongoClient.connect(url, function(err, database){
        assert.equal(null, err);
        console.log("Conected correctly to server");
        //get collection and res documents
        const db = database.db('users')
       var col=  db.collection('project')
        
        col.find({}).toArray(function(err, docs) {
            console.log("Found the following records");
            res.json({status: 200, data: docs}); 
            db.close();            
        });
    })
})

module.exports = router;