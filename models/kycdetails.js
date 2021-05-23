var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var bankDetailsSchema = new mongoose.Schema(
    {
        accountNo:{
            type:String,
            trim:true,
        },
        ifscCode:{
            type:String,
            trim:true
        }
    },
    {timestamps:true}
);
var kycSchema = new mongoose.Schema(
    {
        user:{
        type:ObjectId,
        ref:'User'
        },
        aadharNo:{
            type:Number,
            trim:true,
            maxlength:12,
            required:true
        },
        addharVerified:{
            type:Boolean,
            default:false
        },
        panNo:{
            type:String,
            trim:true
        },
        panVerfied:{
            type:Boolean,
            default:false
        },
        bankDetails:[bankDetailsSchema]
    },
    {timestamps:true}
);

module.exports = mongoose.model("KycDetails",kycSchema);