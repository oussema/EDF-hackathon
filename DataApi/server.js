const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose=require('mongoose');


const user = require('./routes/user.route'); // Imports routes for users
const payment = require ('./routes/payment.route'); //Imports routes for payments  
const app = express();

process.setMaxListeners(0);//to limit listener
// Set up mongoose connection

let dev_db_url = 'mongodb://127.0.0.1:27017/user_dev';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//mongoose
//let access to all users
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

 
app.use('/users', user);
app.use('/payments',payment);

var port = process.env.PORT || 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});