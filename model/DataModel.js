const mongoose=require("mongoose");

const DataScema= mongoose.Schema({
    imageUrl:String,
    imageAlt:String,
    country:String,
    beds:Number,
    baths:Number,
    title:String,
    formattedPrice:String,
    reviewCount:Number,
    rating:Number
})

const DataModel=mongoose.model("Data",DataScema);

module.exports=({
    DataModel
})