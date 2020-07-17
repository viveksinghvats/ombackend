const mongoose=require("mongoose");
const category = require("./category");
const {ObjectId}=mongoose.Schema;
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxlength:32,
        required:true,
    },
    description:
    {
        type:String,
        trim:true,
        required:true,
        maxlength:2000,
    },
    price:{
        type:Number,
        trim:true,
        maxlength:32,
        required:true
    },
    category:
    {
        type:ObjectId,
        ref:"Category",
        required:true
    },
    stock:
    {
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true});
module.exports=mongoose.model("Product",productSchema);