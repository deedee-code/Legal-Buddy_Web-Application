const User = require('../Models/userSchema');
// const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'authentication515@gmail.com',
        pass: 'ftkenneivrzbpgtu'
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Ready for messages');
        console.log(success);
    }
});



const userSignup = async (req, res, next) => {
    const { fullName, email, password, confirmPassword } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        console.log(error)
    }

    if (existingUser) {
        return res.status(400).json({message: "User already exist, proceed to the login page!"})
    }


    // const saltRounds = 10;
    // const hashedPassword = bcrypt.hashSync(password, saltRounds);

    if (password !== confirmPassword) {
        res.status(400).json({ message: "Password and confirm password do not match!" })
    }

    const newUser = new User ({
        fullName,
        email,
        password,
    })

    try {
        await newUser.save()
    } catch (error) {
        console.log(error)
    }

    sendSignupLink(req.body.email);

    function sendSignupLink(email) {
        const mailOptions = {
            from: 'authentication515@gmail.com',
            to: email,
            subject: "Account Activated",
            html: "<p>You have Successfully Register your Account</b>.</p>"
        }
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
        });
    }
    

    // return res.status(200).json({ message: 'Registration successful! Check your email.', newUser} )
    res.redirect('/login');
}


const userLogin = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        console.log(error)
    }

    if (!existingUser) {
        return res.status(400).status({ message: "User does not exist! Proceed to the signup page."})
    }

    const isPasswordCorrect = (password, existingUser.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({message: 'Invalid Email/Password'});
    }

    const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h"})

    console.log("Generated Token\n", token);


    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date (Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: 'lax',
    });

    // return res.status(200).json({message: 'Successfully logged in', user:existingUser, token });
    res.redirect('/home');
}


exports.userSignup = userSignup;
exports.userLogin = userLogin;