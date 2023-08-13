var jwt = require('jsonwebtoken');

const authentication=(req,res,next)=>{
    // let token=req.headers.authorization.split(" ")[1] || "$";
    let token=req.headers.authorization
    // console.log(token)
    if(token){
        let tokenVal=req.headers.authorization.split(" ")[1]
        if(tokenVal){

            jwt.verify(tokenVal, 'shhhhh', function(err, decoded) {
                if(err){
                    // console.log(tokenVal)
                    // console.log(token)
                    // console.log("err");
                    next();
                }   
                else{
                    req.userID=decoded.user_id;
                    // console.log(req.userID);
                    next();
                }
            });
        }
        else{
            next()
        }
    }
    else{
        next();
    }
}

module.exports=({
    authentication
})