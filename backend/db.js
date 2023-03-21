const mongoose = require('mongoose')
const mongoUri = "mongodb+srv://Gargee:NgbN8b9PKr1RgfjC@cluster0.hmcbbch.mongodb.net/backendPrac"
const connectToMongo = ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("Connected to Mongoose database")
    })
}
module.exports = connectToMongo;