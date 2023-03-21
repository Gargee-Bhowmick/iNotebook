const mongoose = require('mongoose')
const Schema = mongoose.Schema
const notesSchema = new Schema({
    name:{
        type: String ,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true,
    },
    Date:{
        type: Date,
        default:Date.now
    }
})
module.exports=mongoose.model('notes',notesSchema)