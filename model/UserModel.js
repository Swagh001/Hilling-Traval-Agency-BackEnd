const mongoose=require("mongoose");

const userScema= mongoose.Schema({
    fname:{type:String,},
    lname:{type:String,},
    email:{type:String,},
    password:{type:String,},
})

const UserModel=mongoose.model("user",userScema);

module.exports=({
    UserModel
})