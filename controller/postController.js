const postModels = require("../models/postModels");


const createPostController=async(req,res )=>{
try {
    const {title,description}=req.body;
    //VALIDATION
    if(!title || !description){
        res.status(500).send({
            success:false,
            message:"Please Fill all the fields",
            error
        })
    }
    const post=await postModels({
        title,
        description,
        postedBy:req.auth._id
    }).save();

    

    res.status(201).send({
        success:true,
        message:"Post Created Successfully",
        post
    })
    console.log(req)
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in createPostAPI",
        error
    })
}
}

const getAllPostsController=async(req,res)=>{
    try {
        const posts= await postModels.find()//jitna b data postModel/api ma  ha wo get hojayega
        .populate("postedBy", "_id name")//isko postedBy ka dikhana ha aur jis ne post kia ha uski Id aur name b show krwana ha
        .sort({createdAt:-1})//most recent top pe ayegi
        res.status(200).send({
            success:true,
            message:"All Posts Data",
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in GETALLPOSTS API",
            error
        })
    }
}

//GET USER POSTS CONTROLLER
const getUserPostsController=async(req,res)=>{
try {
    const  userPost=await postModels.find({postedBy:req.auth._id})//ham ko user specific post chahiyay to jb ham post bnaty hein toh user specific id b saath aati ha ye hamne ne postModel k schema ma banaya ha
    res.status(200).send({
        success:true,
        message:"User Posts Gotted",
        userPost
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in GET-USER-POSTS API",
        error
    })
}
}

//DELETE POST CONTROLLER
const deletePostController=async(req,res)=>{
try {
    const {id}=req.params
    await postModels.findByIdAndDelete({_id:id})
    res.status(200).send({
        success:true,
        message:"Post Deleted Successfully",
        
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Delete Post API",
        error
    })
}
}

//UPDATE POST CONTROLLER

const updatePostController=async(req,res)=>{
    try {
        const {title,description}=req.body
        //GettingPost
        const post=await postModels.findById({_id:req.params.id})
        //Validation
        if(!title || !description){
            res.status(500).send({
                success:false,
                message:"Please Provide post title or description",
                error
            })
        }
        const updatedPost=await postModels.findByIdAndUpdate({_id:req.params.id},
            {
                title:title || post?.title, //if user provides title then go with it || otherwise go with the previous saved title
                description: description || post?.description

            },
            {
                new:true// post is updated
            })
            res.status(200).send({
                success:true,
                message:"Post Updated Successfully",
                updatedPost
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in UPDATE Post API",
            error
        })
    }
}

module.exports={createPostController,getAllPostsController,getUserPostsController,deletePostController,updatePostController}