const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
// const FileStore = require('session-file-store')(session);


dbConnection();
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(session({
//     secret: 'your-secret-key', // Replace with your own secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true if using HTTPS
//   }));

app.use(session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // Set to true if using HTTPS
        httpOnly: true // Makes the cookie inaccessible to JavaScript
    }
}));

app.use(cors({ origin:'http://localhost:3000', credentials: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());




//route setup

app.use("/users",require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, ()  => {
    console.log(`server is running on the port : ${port}`);
})