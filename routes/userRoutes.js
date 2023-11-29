const express=require('express');
const { registerController, loginController, updateUserController, requireSignIn } = require('../controller/userController');


//creating router object

const router=express.Router();



//routes
//REGISTER || POST
router.post('/register',registerController)//we have to create a controller function and we create it in controller folder
                                            //and import it in server.js file so that server.js file knows that there is a route
//LOGIN || POST
router.post('/login',loginController)


//UPDATE || PUT
router.put('/update-user',requireSignIn, updateUserController)


//export

module.exports=router;
