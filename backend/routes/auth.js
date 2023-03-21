const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../model/User");
const express = require("express");
const { validate } = require("../model/User");
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken')
const fetchuser = require('./../middleware/Fetchuser.js')
const JWT_SECRET = "IamGargee"
router.post(
  "/",
  [
    body("name", "Minimum 3 characters").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Minimum 5 characters in password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err });
    }
    try{
      const salt = await bcrypt.genSalt(10)
      const secPass= await bcrypt.hash(req.body.password,salt)
      user = await User.create({
        name: req.body.name,
        email:req.body.email,
        password:secPass
      })
      const data = {
        user:{
          id:user.id
        }
      }
      const auth = jwt.sign(data,JWT_SECRET)
      res.json(auth)
    }
    catch(error){
      console.error(error.message)
      res.status(500).send("Internal server error")
    }
  }
);

router.post('/login',[body('email','Enter a valid email').isEmail(),body('password','Password cannot be left blank').exists()],
async(req,res)=>{
  const err = validationResult(req.body)
  //Check whether the properties are okay or not before going through the database
  if(!err.isEmpty())
  {
    res.status(401).json({error:err.array()})
  }
  try{
    const{email,password} = req.body
//Check whether the email exists in the database or not before checking for password 
const user = await User.findOne({email:email})
if(!user){
  return res.status(401).send("Please enter the correct credentials")
}
//Now check for the password. We have to keep in mind that the password is in the hashed form in the database , so to check for the correct password, we need to use bcryptJS
const passCheck = await bcrypt.compare(password,user.password)
if(!passCheck)
{
  return res.status(401).send("Please enter the correct credentials")
}
//Now once when both the username and password matches then we need to assign the jwt token to the user
//Everytime we login , we are provided with a new authtoken or jsonwebtoken
const payload = {
  user:{
    id:user.id,
    name:user.name
  }
}
const authtoken = jwt.sign(payload,JWT_SECRET)
res.status(200).json({token:authtoken})
  }
catch(error){
    console.error(error.message)
    res.status(500).send("Interal server error")
  }
})


router.post('/getuserdetails',fetchuser,async(req,res)=>{
  try{
    userId = req.user.id
    const user= await User.findById(userId).select("-password")
    res.status(200).send(user)
  }
  catch(error){
    console.error(error.message)
    res.status(500).send("Interal server error")
  }
})

module.exports = router;
