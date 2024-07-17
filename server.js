const express = require("express");
const bodyparser = require("body-parser");
const dbConnection = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");


dbConnection();
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());



//route setup

app.use("/users",require("./routes/userRoutes"));



app.listen(port, ()  => {
    console.log(`server is running on the port : ${port}`);
})