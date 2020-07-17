const mongoose=require("mongoose");
const user = require("./user");
const {ObjectId}=mongoose.Schema;
const productCartSchema=new mongoose.Schema({
    product:
    {
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number
},{timestamps:true});

const orderSchema=new mongoose.Schema({
    products:[productCartSchema],
    transaction_id:{},
    amount:{
        type:Number
    },
    address:String,
    update:Date,
    user:{
        type:ObjectId,
        ref:"User",
    }
},{timestamps:true});
const Order=mongoose.model("Order",orderSchema);
const ProductCart=mongoose.model("Product",productCartSchema);
module.exports={Order,ProductCart};