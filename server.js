const express = require('express');
const userRoute = require('./Routes/userRoute');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./passportSetup');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cookieParser());

app.use(
    session({
      secret: 'legalbuddyapp',
      resave: false,
      saveUninitialized: true,
    })
);

const port = process.env.PORT || 4000;

const dbConnect = async () => {
    try {
        db = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log(error);
    }
}

dbConnect();

app.use(express.json());
app.use('/', userRoute);



app.use(passport.initialize());
app.use(passport.session());



app.listen(port, () => {
    console.log(`Server running at port: ${port}`)
})