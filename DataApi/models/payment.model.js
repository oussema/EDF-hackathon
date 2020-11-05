const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PaymentSchema = new Schema({
    email: {type: String, required: true, max: 100},
    amount: {type: String, required: true, max: 100},
    projectNumber: {type: String, required: true, max: 100},
    isHandled:{type: String, required: true, max: 100}
});


// Export the model
module.exports = mongoose.model('Payment', PaymentSchema);