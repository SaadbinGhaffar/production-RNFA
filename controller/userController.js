const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModels = require("../models/userModels");
var {expressjwt:jwt}=require('express-jwt')


//Middleware
const requireSignIn=jwt({
  secret:process.env.JWT_SECRET,
  algorithms:["HS256"]
})


const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Username Required",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email Required",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "password Required or 6 character long",
      });
    }

    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      res.status(500).send({
        success: false,
        message: "User Alreday Existes With this email",
      });
    }

    //Hashing Password

    const hashedPassword = await hashPassword(password);

    //save user
    const user = await userModels({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Registration Successful Please Login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register Api",
      error,
    });
  }
};

//LOGIN CONTROLLER


const loginController = async (req, res) => {
  const { email, password } = req.body;
  //validation
  try {
    if (!email || !password) {
    return  res.status(500).send({
        success: false,
        message: "Please Provide Email or Password",
      });
    }
    //find user
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }
    //matching User Password
    const match = await comparePassword(password, user.password); //(plain password,hashed password which is in user so we acces it this way through user)
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid Username or Password",
      });
    }
    //({This is an object containing the data you want to include in the token},SECRET_KEY,After how muc time it will expire)
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //Undefined Password
    user.password = undefined;
    //Sending Response because no error occured
    return  res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login Api",
    });
  }
};

//UPDATE USER

const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    //USER Finding
    const user = await userModels.findOne({ email });

    //PASSWORD VALIDATION
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is Required And sould be > than 6",
      });
    }
    //HASING PASSWROD
    const hashedPassword=password ? await hashPassword(password): undefined//first we check if password then we will move to the condition UNDEFINED means we dont change anything in password
    //UPDATE USER
    const updateUser=await userModels.findOneAndUpdate({email},{
      name:name || user.name,
      password:hashedPassword || user.password
    },{new:true})//({update on email basis},{what we want to update
                //jo user ne name daala ha wo update kr do || wrna jo phle name ha wohi rehne do
                //})
                updateUser.password=undefined
    res.status(200).send({
      success:true,
      message:"User Updated Please Login",
      updateUser
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in User Update API",
      error,
    });
  }
};

module.exports = { registerController, loginController, updateUserController,requireSignIn };
