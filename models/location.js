var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


var locationSchema = new mongoose.Schema(
    {
        user:{
            type: ObjectId,
            ref: 'User'
        },
        coordinates: {
            type: [Number],
            required: true
        },
        houseNo:{
            type:String,
            trim:true,
            required:true
        },
        landmark:{
            type:String,
            trim:true,

        },
        addressType:{
            type:String,
            trim:true,
            enum:['Home','Work','Others'],
            default:'Home'
        },
        locationName:{
            type:String,
            trim:true,
        },
        locationPin:{
            type:String,
            trim:true,
        },
        locationDistrict:{
            type:String,
            trim:true,
        },
        locationState:
        {
            type:String,
            trim:true,
        }
        
    },
    { timestamps:true }
);

module.exports = mongoose.model("Location", locationSchema);
