const mongoose=require('mongoose')

//Schema designing

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        require:[true,"Please Add a Title"]
    },
    description:{
        type:String,
        require:[true,"Please Add a Description"]
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'Users',
        require:true
    }
},{timestamps:true})

module.exports=mongoose.model('Post',postSchema)