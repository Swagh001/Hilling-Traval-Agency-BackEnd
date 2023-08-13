const mongoose=require("mongoose")

// const connection=mongoose.connect("mongodb+srv://shailesh:shailesh@cluster0.rors66x.mongodb.net/?retryWrites=true&w=majority/blogApp")
const connection=mongoose.connect("mongodb+srv://shailesh:shailesh@cluster0.rors66x.mongodb.net/hilling-traval-agency?retryWrites=true&w=majority")

module.exports=({connection});