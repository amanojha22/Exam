const mongoose = require("mongoose");


 const examSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true,
        

        
    },
    date:{
        type:String,
        required: true
    },

    
 },{
    timestamps: true
 })

 const model  = mongoose.model("Exam", examSchema);

 module.exports = model;