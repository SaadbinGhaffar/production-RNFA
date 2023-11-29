const mongoose=require("mongoose")
const colors=require("colors")

//connection establishing with mongoDB

const connectDB=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to DB fullstack ${mongoose.connection.host}`.bgCyan.white)
} catch (error) {
    console.log(error)
}
}

//Now Execute these functions in server.js files

module.exports=connectDB;