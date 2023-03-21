const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({ //schema to be followed by a collection
    name:{
        type: String ,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    Date:{
        type: Date,
        default:Date.now
    }
})
const User = mongoose.model('user',userSchema) //creating a collection with docs user
module.exports= User;