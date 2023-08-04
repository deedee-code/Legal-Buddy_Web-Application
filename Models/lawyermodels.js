const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
const lawyersSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
   firstName:{
    type: String,
    required: true
   },
   lastName:{
    type: String,
    required: true
   },
   otherName:{
    type: String,
    required: true
   },
   email:{
    type: String,
    required: true
   },
   phoneNumber:{
    type: String,
    required: true
   },
   address:{
    type:String,
    required: true
   },
   city:{
    type: String,
    required: true
   },
   country:{
    type:  String,
    required: true
   }
});

//Export the model
module.exports = mongoose.model('Lawyer', lawyersSchema);