const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const colors=require('colors');
const morgan=require('morgan');
const connectDB = require('./config/db');

//DOTENV
dotenv.config();

//MongoDB Connection

connectDB();

//REST object creation
const app=express();//giving app all the functionalities of express

//Middleware
app.use(cors())
app.use(express.json())//json data ko send b kr sakengy aur receive bhi kr sakengy
app.use(morgan('dev'))

//Routes
app.use('/api/v1/auth',require('./routes/userRoutes'));
app.use('/api/v1/post',require('./routes/postRoutes'));





//PORT Number
const PORT=process.env.PORT || 8080 // it i coming from environmental varibale|| 8080


//App run karengy us k liye app ko listen krwana prta ha

app.listen(PORT,()=>{
    console.log(`server running on Port ${PORT}`.bgGreen.white)
})