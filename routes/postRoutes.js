const express=require('express');
const { requireSignIn } = require('../controller/userController');
const { createPostController, getAllPostsController,getUserPostsController, deletePostController, updatePostController } = require('../controller/postController');

//ROUTER OBJECT
const router=express.Router();

//CREATE POST || POST
router.post('/create-post',requireSignIn,createPostController)

//GET ALL POSTS
router.get('/get-all-posts',getAllPostsController)

//GET USER POSTS ||GET
router.get('/get-user-posts',requireSignIn,getUserPostsController)

//DELETE USER POST || 
router.delete('/delete-post/:id',requireSignIn,deletePostController)// ():)->-> means dynamic Value

//Update POSTS

router.put('/update-post/:id',requireSignIn,updatePostController)// ():)->-> means dynamic Value



//EXPORT
module.exports=router;