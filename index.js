
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

app.get("/", function (req, res) {
    res.render("login.ejs");
});

app.get("/domain", function (req, res) {
    res.render("domain.ejs");
});

app.get("/result", function (req, res) {
    res.render("result.ejs");
});

app.get("/review", function (req, res) {
    res.render("review.ejs");
});

app.get("/upload", function (req, res) {
    res.render("upload.ejs");
});

app.get("/edit", function (req, res) {
    res.render("edit.ejs");
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
                var activeCookie = response.data.Token;
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


