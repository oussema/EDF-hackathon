const User = require('../models/user.model');
var express=require('express');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
var bodyparser = require('body-parser');
var app=express();

app.use(bodyparser.json());


exports.user_create = function (req, res) {
    
   let user = new User({
       email:req.body.email,
       firstName:req.body.firstName,
       lastName:req.body.lastName,
       password:req.body.password,
       walletAddress:req.body.walletAddress
   });
    MongoClient.connect(url,{ useNewUrlParser: false }, function(err, db) {
       if (err) throw err;
        var dbo = db.db("user_dev");
        dbo.collection("users").find({email:user.email}).toArray(function(err, result)  {
          if (err) throw err;
          console.log(result);
          if(result.length){
            res.send({"message":"this user name exist !"});
          } else {
            user.save(function (err) {
                if (err) {
                  throw err;
                };
                
                console.log(user);
            });  
           };
          db.close();
        });
      });

   
};
exports.user_delete =function(req,res) {
    User.findOne({email:req.params.email})
    .deleteOne({},(err,removed)=>{
        if(err) throw new Error("error");
        
    });
    res.send({"message":"user deleted"});
       
};
exports.user_update = function(req,res){
    let user = new User({
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.psw
    }); 
    User.findOne({email:req.body.email}).
    update(user,(err)=>{if (err) throw new Error("error")});
};
exports.user_wallet = async (req, res)=> {
    await User.find({email:req.body.email}, function (err, user) {
        if (err) return next(err);
        res.send({"walletAddress":user[0].walletAddress});
    })
};

exports.user_login=function (req, res){
    User.find({email:req.body.email,password:req.body.password}, function (err, user) {
        if (err) throw err;
        if(user.length == 0){res.send({"state":"false"})}
        else {
            res.send({"state":"true"})
        }
        
    })
};