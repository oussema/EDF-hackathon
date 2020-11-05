const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');

var app=express();



 //Mongo URL
 const mongoURI='mongodb://localhost:27017/user_dev';

 //Create mongo connnection
 const conn =mongoose.createConnection(mongoURI);
 
 
// Require the controllers WHICH WE DID NOT CREATE YET!!
const payment_controller = require('../controllers/payment.controller');


router.post('/update',payment_controller.payment_update);
router.post('/create', payment_controller.payment_create);

//get user information
router.get('/allNotHandled', payment_controller.payment_notHandled);


module.exports = router;