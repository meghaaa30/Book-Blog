const express= require('express');
const User=require("../models/User");
const router= express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken')
const fetch= require('../middleware/fetch');
const JWT_SECRET= "megha is the bestest girlf"

//  router.post('/auth',(req, res)=>{
//      console.log(req.body);
//      const user= User(req.body);
//      user.save();
//  })

 router.post('/Create', [
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
   let user= await User.findOne({email: req.body.email});
   if(user){
        return res.status(400).json({error: 'email already exists'})
   }

   const salt= await bcrypt.genSalt(10);
   const secPass= await bcrypt.hash(req.body.password , salt);

   user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        
      });

      const data={
        user:{
            id: user.id
        }
      }
      const authtoken=jwt.sign(data, JWT_SECRET);
   //   console.log(jwtdata);
      
     // .then(user => res.json(user));
     //res.json(user)
     res.json({authtoken})
    }catch(error){
        console.log(error.message)
        res.status(400).send("some error occured")
    }
})

router.post('/Login', [
    body('email', 'email wrong').isEmail(),
    body('password','password cannot be blank').exists(),
]
, async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;

    try{
        let user= await User.findOne({email})
        if(!user){
            res.status(400).json({errors: "User does not exist"});
            return;
        }

        const pswd= await bcrypt.compare(password, user.password);
        if(!pswd){
         res.status(400).json({errors: "Wrong password or id, try again"})
        }
        
       const data={
         user:{
             id: user.id
         }
       }
       const authtoken=jwt.sign(data, JWT_SECRET);
       res.json({authtoken}); 
    }

    catch(error){
        console.log(error.message)
        res.status(400).send("some error occured")
    }
})


router.post('/getUser', fetch, async(req,res)=>{
    try{
        userid= req.user.id
        const users= await User.findById(userid).select('-password')
        res.json(users)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("some error occured")
    }
})




 module.exports= router