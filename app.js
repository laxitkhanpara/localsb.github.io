require('dotenv').config();
port=process.env.PORT || 35000
const express =require("express");
const app=express();
const mongoose = require('mongoose');
const path = require('path')
var bodyParser = require('body-parser');
const ejs = require('ejs');
// import { Country, State, City }  from 'country-state-city';
var  { Country, State, City } = require("country-state-city")

//=========================ejs=========================
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

//============================================================
app.use(bodyParser.json());
//app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")));

//=================connection to the db===============
mongoose.connect(process.env.MONGODB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log("congo! connection is done!!!")
}).catch((error)=>{
    console.log(error);
});





const router= require("./routes/singUpRout.js");
app.use("/",router);

//==================server=========================
app.listen(port,()=>{
    try{
        console.log(`connection is working on '${port}'`)
    } catch(error){
        console.log(error);
    }
})