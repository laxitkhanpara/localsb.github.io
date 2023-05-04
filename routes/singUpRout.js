const { render } = require('ejs');
const express = require('express')
const app = express();
const router = express.Router();
const { CoustomerDetails } = require("../models/singUpSchema")
var { Country, State, City } = require("country-state-city");
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')
const{checkUserAuth}= require("../middleware/authMiddleware")
const {genrateTocken} = require('../middleware/jwtToken');

router.get("/", async (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        console.log(error);
    }
})

//==============singUp===================
router.get("/singUp", async (req, res) => {
    try {
        const countrys = Country.getAllCountries();

        // console.log(countrys);
        res.render("singUp", { countrys })
    } catch (error) {
        res.status(401).send(error)
        console.log(error);
    }
})
router.post("/singUp", async (req, res) => {
    try {
        const { firstname, lastname, email, password, mobile, dob, Pincode, useraddress, gendar, country_name, state_name, city_name, otp_verify, real_otp,role } = req.body
        const findUser = await CoustomerDetails.findOne({ email });
        console.log(otp_verify);
        console.log(real_otp);
        if (!findUser) {
            //password bcrpt
            const hash = await bcrypt.hash(password, 10);
            const newUser = new CoustomerDetails({ firstname, lastname, email, password: hash, mobile, dob, Pincode, useraddress, gendar, country_name, state_name, city_name, role })
            console.log(otp_verify === real_otp);
            if (otp_verify === real_otp) {
                await newUser.save();
            } else {
                res.json({
                    msg: "otp is wrong"
                })
            }
            res.redirect("/index");
        } else {
            
            res.redirect("/singIn");
        
        }
    } catch (error) {
        res.status(401).send(error)
        console.log(error);
    }
})


//==============singIn===================
router.get("/singIn", async (req, res) => {
    try {
        res.render("singIn");
    } catch (error) {
        console.log(error);
    }
})
router.post("/singIn", async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await UserDetails.findOne({ email });
        console.log(findUser);
        if (!findUser) {
            res.json({
                msg: "please registor"
            })
        } else {
            const hash = await bcrypt.compare(password, findUser.password);
            console.log(hash);
            if (hash === true) {              
                //genrate the tocken and store in cookie
                const token = genrateTocken(findUser.id);
                res.cookie('singIn', token,process.env.JWT_SECRET, {
                    expires: new Date(Date.now() + 50000),
                    httpOnly: true,
                })
                res.redirect("/");
            } else {
                res.json({
                    msg: "email or password may be wrong",
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
})



//=================location Api==============
// router.get("/index", async (req, res) => {
//     try {
//         res.json({ msg: "yupp" })
//     } catch (error) {
//         res.status(401).send(error)
//     }
// })
// router.post("/index", async (req, res) => {
//     try {
//         res.json({ msg: "yupp" })
//     } catch (error) {
//         res.status(401).send(error)
//     }
// })

//==============state/ajax===================
router.get("/state/ajax/:id", async (req, res) => {
    try {
        const states = State.getStatesOfCountry(req.params.id)
        //console.log("states:",states);

        res.json({ states })
    } catch (error) {
        console.log(error);
    }
})



//==============city/ajax===================

router.post("/city/ajax", async (req, res) => {
    try {
        // console.log(req.body);
        const { country, value } = req.body;
        const citys = City.getCitiesOfState(country, value);
        res.json({ citys });
        // res.render("/singUp",{citys})

    } catch (error) {
        console.log(error);
    }
})

//=============/verify/ajax======================
router.post("/verify/ajax", async (req, res) => {
    try {
        const { verify_email } = req.body;

        //genrate function of otp
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

        //send mail
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'laxitkhanpara3646@gmail.com',
                pass: 'svwudpbwnktimmge'
            }
        });
        var mailOptions = {
            from: 'laxitkhanpara3646@gmail.com',
            to: verify_email,
            subject: 'Sending Email using Node.js',
            text: `your OTP is '${otp}'`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.json({ otp });

    } catch (error) {
        console.log(error);
    }
})

//===========export router=============
module.exports = router;