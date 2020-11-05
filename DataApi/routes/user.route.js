const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');

var app=express();



 //Mongo URL
 const mongoURI='mongodb://localhost:27017/user_dev';

 //Create mongo connnection
 const conn =mongoose.createConnection(mongoURI);
 
 
// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');

router.post('/delete/:email',user_controller.user_delete);
router.post('/update',user_controller.user_update);
router.post('/create', user_controller.user_create);
router.post('/login', user_controller.user_login);
//get user wallet 
router.post('/userWallet', user_controller.user_wallet);


module.exports = router;