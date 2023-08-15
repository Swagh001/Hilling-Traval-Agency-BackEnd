const express=require("express");
const {connection}=require("./config/db")

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const {DataModel} =require("./model/DataModel") 
const {UserModel} =require("./model/UserModel")
const {OneBlogModel} = require("./model/OneBlogModel")
const {BlogModel} =require("./model/BlogModel")
var cors = require('cors')


const {authentication} =require("./Middlewware/Authentication")

const app=express();

app.use(express.json())
app.use(cors())

app.get("/data",authentication,async(req,res)=>{
    const sortOrder =req.query.sort;
    if(sortOrder){
        try {
            let properties = await DataModel.find().sort({ formattedPrice: sortOrder });
            res.send(properties);
          }
          catch (error) {
            res.status(500).send("Error fetching data from the database.");
          }
    }
    else{
        let data= await DataModel.find();
        // console.log("data");
        res.send(data)
    }
})

app.get("/data/:id",async(req,res)=>{
    // console.log(req.params.id);
    let data= await DataModel.find();
    // let data2= await OneBlogModel.find();
    // console.log(data);
    res.send({data:data,data2:req.params.id})
})

app.post("/signup",async(req,res)=>{
    const {fname,lname,email,password}=req.body;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
                if(err){
                    res.send("something went wrong")
                }
                else{
                    console.log(hash);
                    const dataDone=new UserModel({
                        fname:fname,
                        lname:lname,
                        email:email,
                        password:hash});
                
                    await dataDone.save();
                    res.send("signup done")
                }
        });
    });

})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    const user=await UserModel.findOne({email});
    // console.log(user);
    if(user){
        const hashPassword=user.password;
        // // console.log(hashPassword)
        bcrypt.compare(password, hashPassword, function(err, result) {
            if(!result){
                // alert("wrong password")
                res.send("wrong");
            }
            else{
                // console.log(password);
                // console.log(hashPassword);
                var token = jwt.sign({ user_id:user._id}, 'shhhhh');
                // localStorage.setItem({"token":token});
                res.send({msg:"login done",token:token})
            }
        });
        // console.log(user);
        // res.send({user:"user"})
    }
    else{
        res.send("error");
    }

})
app.get("/blog",async(req,res)=>{
    let blog= await BlogModel.find();
    console.log(blog);
    res.send(blog)
})

app.get("/blog/:id",async(req,res)=>{
    // console.log(req.params.id);
    let blog= await BlogModel.find();
    console.log(blog);
    res.send(blog)
})

app.get("/data/:country",async(req,res)=>{
    console.log(req.params.country);
    let data= await DataModel.find();
    countryData=data.filter((elem)=>{
        if(elem.country === req.params.country){
            return elem;
        }
    })
    if(countryData){
        res.send({data:countryData})
    }
    else{
        res.send({msg:"no data is there for this search result"})
    }
})


// app.put("/blog/:id",authentication,async (req,res)=>{

//     const dataupdate=req.body;
//     const {id}=req.params
//     const userid=req.userID;
//     console.log(id);
    
//     const user=await UserModel.findOne({userid});
//     console.log(user)

//     const blog=await BlogModel.findOne({_id:id});
//     console.log(blog);
//     if(user._id==blog.userId){
//         const data=await BlogModel.findOneAndUpdate(id, dataupdate,{
//             new: true
//         });
//         res.send("update completed")
//     }
//     else{
//         res.send("permission denied")
//     }
//     res.send("updated")
// })


// app.delete("/blog/:id",authentication,async (req,res)=>{

//     const dataupdate=req.body;
//     const {id}=req.params
//     const userid=req.userID;
//     console.log(id);
    
//     const user=await UserModel.findOne({_id:userid});
//     console.log(user)

//     const blog=await BlogModel.find();
//     console.log(blog);
//     if(user._id==blog.userId){
//         await BlogModel.findByIdAndRemove(id)
//         res.send("delete completed")
//     }
//     else{
//         res.send("permission denied")
//     }
//     // res.send("updated")
// })
app.post("/data",async(req,res)=>{
    
    const data=req.body
    // console.log(data);
    
    const dataSave=new DataModel(data);
    await dataSave.save();
    res.send({"msg":"data added"});
})


app.post("/blog",async(req,res)=>{
    
    const data=req.body
    // console.log(data);
    
    try{
        const dataSave=new BlogModel(data);
        await dataSave.save();
        res.send({"msg":"blog added",data:data});
    }
    catch(e){
        res.send({e});
    }
})

let port=process.env.PORT || 8081;
app.listen(port,async()=>{
    try{
        await connection
        console.log("connected");          
    }
    catch(err){
        console.log("not connected")
    }
})