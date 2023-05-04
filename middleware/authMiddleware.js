const express = require('express');
const jwt = require("jsonwebtoken");


const { CoustomerDetails } = require("../models/singUpSchema")



const checkUserAuth = async (req,res,next) =>{
    try{
        const token =  req.cookies.singIn; //for access jwt cookies of browser
        console.log("token",token);
        
        const verifyUser =await jwt.verify(token,process.env.JWT_SECRET);
        console.log(verifyUser.id);

        //get the user data of verfyuser by the id of tocken
        const user= await CoustomerDetails.findById(verifyUser.id)
         console.log("user details:",user);

        req.token = token;
        req.user= user;
        next();

    } catch(error){
        console.log(error);
    }
} 

module.exports = {checkUserAuth};