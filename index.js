const express = require('express');
const dotenv = require('dotenv')
const cookieparser= require('cookie-parser');
const moongose = require("mongoose")

dotenv.config({path:"./config.env"})

const app = express();

app.use(cookieparser());

app.use(express.json());

app.use(require('./Router/auth'));

if( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`server is running at ${4000}`);
}); 