 const jwt=require('jsonwebtoken');
 const JWT_SECRET= "megha is the bestest girlf";

 
 const fetch=(req, res, next)=>{
     const token= req.header('auth-token');
     if(!token){
         req.status(400).send({error: "pls authenticate using a valid token"})
     }
     try{
         const data = jwt.verify(token , JWT_SECRET)
         req.user= data.user;
          next()
     }catch(error){
         req.status(400).send({error: "pls authenticate using a valid token"})
     }
   
 }



 module.exports = fetch