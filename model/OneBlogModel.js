const mongoose = require("mongoose");

const OneBlogScema=new mongoose.Schema({
    description:{type:String}
})

const OneBlogModel=mongoose.model("OneBlog",OneBlogScema);

module.exports=({
    OneBlogModel
})
