const mongoose=require("mongoose")
const { message } = require("statuses")

const contactSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true},
    submittedAt:{type:Date,default:Date.now},
});

module.exports=mongoose.model("contactus",contactSchema);