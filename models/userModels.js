const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter name'],//[ ,validation message]
        trim:true
    },
   
    email:{
        type:String,
        required:[true,'please enter Email'],//[ ,validation message]
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'please enter name'],//[ ,validation message]
        min:6,
        max:64
    },
    role:{
        type:String,
        default:'user'
    }
},{timestamps:true})//when a new user entered then the time and date will also be captured




module.exports=mongoose.model('Users',userSchema)//(modelName,Referene type)