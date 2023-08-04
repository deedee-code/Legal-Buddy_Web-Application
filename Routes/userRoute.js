const express = require('express');
const passport = require('passport');

const { userSignup, userLogin } = require('../Controllers/userController');
const { verify } = require('../Controllers/lawyerControl')

const router = express.Router();


router.get('', (req, res) => {
    res.render('landingPage')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/about', (req, res) => {
    res.render('about')
});

router.get('/home', (req, res) => {
    res.render('home')
});

router.get('/about-lawyer', (req, res) => {
    res.render('aboutLawyer')
});

router.get('/ai', (req, res) => {
    res.render('ai')
});

router.get('/google/success', (req, res) => {
    res.render("ai");
})



router.post('/signup', userSignup);
router.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));
router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/google/success',
        failureRedirect: '/google/failure'
    })
);
router.post('/login', userLogin)
router.post('/onboarding', verify)

module.exports = router;