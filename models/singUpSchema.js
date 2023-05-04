const { data } = require('jquery');
const mongoose = require('mongoose');

//schema of singup and login
const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            index: true,
        },
        lastname: {
            type: String,
            required: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
            unique: true,
        },
        dob:{
            type: String,
            required: true,   
        },
        Pincode:{
            type: String,
            required: true,   
        },
        role:{
            type: String,
            required: true,
        },
        useraddress:{
            type: String,
            required: true,   
        },
        gendar:{
            type: String,
            required: true,   
        },
        country_name:{
            type: String,
            required: true,
        },
        state_name:{
            type: String,
            required: true,     
        },
        city_name:{
            type: String,
            required: true,     
        },
        
    },
    {
        timestamps: true,
    }
);

const CoustomerDetails =new  mongoose.model('CoustomerDetails', userSchema);


/*=============Export the model==============*/

module.exports={CoustomerDetails}