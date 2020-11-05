const Payment = require('../models/payment.model');
var express=require('express');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
var bodyparser = require('body-parser');
const { db } = require('../models/payment.model');
var app=express();

app.use(bodyparser.json());


exports.payment_create = function (req, res) {
    
   let payment = new Payment({
       email:req.body.email,
       amount:req.body.amount,
       projectNumber:req.body.projectNumber,
       isHandled:req.body.isHandled
   });
    MongoClient.connect(url,{ useNewUrlParser: false }, function(err, db) {
       if (err) throw err;
        var dbo = db.db("user_dev");
        payment.save();
        db.close();
      });

   
};

exports.payment_update = async(req,res)=>{
    let payment = new Payment({
        email:req.body.email,
        amount:req.body.amount,
        projectNumber:req.body.projectNumber,
        isHandled:req.body.isHandled
    });
   await Payment.findOneAndUpdate({_id:req.body.id},{ $set : {isHandled : "true"}});
    res.send({'test':'yes'})
    
};
exports.payment_notHandled = function (req, res) {
    Payment.find({isHandled: 'false'}, function (err, payments) {
        //if (err) return next(err);
        res.send({payment:payments});
    })
};

