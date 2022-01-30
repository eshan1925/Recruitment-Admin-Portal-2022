
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
var bodyParser = require('body-parser');
var axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//localhost:3000  www.xyz.com/domain
var activeCookie = "";
app.get("/", function (req, res) {
    res.render("login.ejs");
});

app.get("/domain", function (req, res) {
    if(activeCookie!=""){
        res.render("domain.ejs");
    }else{
        res.redirect("/");
    }
});

app.get("/result", function (req, res) {
    if(activeCookie!=""){
        res.render("result.ejs");
    }else{
        res.redirect("/");
    }
   
});

app.get("/review", function (req, res) {
    if(activeCookie!=""){
        res.render("review.ejs");
    }else{
        res.redirect("/");
    }
    
});

app.get("/upload", function (req, res) {
    if(activeCookie!=""){
        res.render("upload.ejs");
    }else{
        res.redirect("/");
    }
    
});

app.get("/edit", function (req, res) {
    if(activeCookie!=""){
        res.render("edit.ejs");
    }else{
        res.redirect("/");
    }
    
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});

app.post("/", function (req, res) {
    console.log(req.body);
    if (req.body.email === process.env.ADMIN_EMAIL && req.body.password === process.env.ADMIN_PASSWORD) {
        var credentials = JSON.stringify({
            "email": process.env.ADMIN_EMAIL,
            "password": process.env.ADMIN_PASSWORD
        });
        var config = {
            method: 'post',
            url: 'https://damp-river-26250.herokuapp.com/admin/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: credentials
        };

        axios(config)
            .then(function (response) {
                activeCookie = response.data.Token;
                console.log(activeCookie);
                res.redirect("/domain");
            })
            .catch(function (error) {
                console.log(error);
            });        
    } else {
        console.log("Unauthorised User!!!");
        res.redirect("/");
    }
});


