// Title - For Example : “My Journey at MasaI”,
// Category - For Example : “Career”/”Finance”/”Travel”/”Sports” etc.
// Author - For Example : “Albert”/”Manish”/”Santhi”/”Bob” etc.
// Content - For Example : “A paragraph of content….etc”
// Image(Optional) - Any related image for that blog.

const mongoose=require("mongoose");

const BlogScema= mongoose.Schema({
    Title:{type:String, required:true},
    Category:{type:String, required:true},
    Author:{type:String, required:true},
    Content:{type:String, required:true},
    Image:String,
    userId:String
})

const BlogModel=mongoose.model("blog",BlogScema);

module.exports=({
    BlogModel
})