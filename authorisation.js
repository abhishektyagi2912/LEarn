const user_data = require('./user_data')
const user_login = require('./user_login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret_key = "14182129";
const nodemailer = require('nodemailer');
const { response } = require('express');
// Creating authorisation from email id
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'learnandearn419@gmail.com',
        pass: 'qlnsscovewpsjvsq'
    }
});
// Signup Process
const signup = async (req, res) => {
    // Execting Try Check Block for error handling
    try {
        //   Existing user check
        const check = await user_login.findOne({ email: req.body.email })
        if (check) {
            return res.json({ message: "User Already Exists", success: 0 })
        }
        //    Sednding otp tp the user for validation
        let x = Math.floor(100000 + Math.random() * 900000)
        let mailDetails = {
            from: 'learnandearn419@gmail.com',
            to: req.body.email,
            subject: 'Authorization for Learn and Earn',
            text: `OTP for your signup process is: ${x}`
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                return res.json({ success: 1, message: "Email Dont Exist" })
            } else {
                return res.json({ otp: x, success: 2, message: "Otp Sent Successfully" })
            }
        });
    } catch (error) {
        return res.json({ success: 1, message: "Email Dont Exist" })
    }
}
// Login Process
const login = async (req, res) => {
    // Execting Try Check Block for error handling
    try {
        //   Existing user check
        console.log(req.body);
        const check = await user_login.findOne({ email: req.body.email })
        console.log(check)
        if (!check) {
            return res.json({ success: 0, message: "NO Such User" })
        }
        // Cheking Password is correct or not
        const compare_pass = await bcrypt.compare(req.body.password, check.password);

        if (!compare_pass) {
            return res.json({ success: 1, message: "Incorrect PassWord" })
        }
        // Generating Token
        const token = jwt.sign({ email: req.body.email, id: check._id }, secret_key);
        // Returning token
        return res.json({ success: 2, message: "User Exists", token })
    } catch (error) {
        console.log(error);
        return res.json({ success: 3, message: "Some Error Occured" })

    }

}
// Verfy Otp Process
const verify = async (req, res) => {
    try {
        const hash_pass = await bcrypt.hash(req.body.password, 10)
        let resp = await user_login.create({ email: req.body.email, name: req.body.name, password: hash_pass })
        const token = jwt.sign({ email: req.body.email, id: resp._id }, secret_key);
        return res.json({ success: 0, message: "User Created Succefully", token })
    } catch (error) {
        console.log(error)
        return res.json({ success: 1, message: "Some Error Occured" })
    }
}
// Resend OTP to user
const resend = async(req,res)=>{
    try {
        console.log(req.body)
        let x = Math.floor(100000 + Math.random() * 900000)
        let mailDetails = {
            from: 'learnandearn419@gmail.com',
            to: req.body.email,
            subject: 'Authorization for Learn and Earn',
            text: `OTP for your signup process is: ${x}`
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                return res.json({ success: 1, message: "Email Dont Exist" })
            } else {
                return res.json({ otp: x, success: 2, message: "Otp Sent Successfully" })
            }
        });
    } catch (error) {
        return res.json({ success: 1, message: "Email Dont Exist" })
    }
}
module.exports = { signup, login, verify ,resend};
