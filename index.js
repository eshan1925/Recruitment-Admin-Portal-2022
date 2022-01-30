
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
var bodyParser = require('body-parser');
var axios = require('axios');
const mongoose = require("mongoose");
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var fileModel = require('./model');
var csv = require('csvtojson');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

var uploads = multer({ storage: storage });

const app = express();

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true }, err => {
        console.log('connected to Database');
    });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"));

//localhost:3000  www.xyz.com/domain
var activeCookie = "";






app.get("/", function (req, res) {
    res.render("login.ejs");
});

app.get("/domain", function (req, res) {
    if (activeCookie != "") {
        res.render("domain.ejs");
    } else {
        res.redirect("/");
    }
});

app.get("/result", function (req, res) {
    if (activeCookie != "") {
        res.render("result.ejs");
    } else {
        res.redirect("/");
    }

});

app.get("/review", function (req, res) {
    if (activeCookie != "") {
        res.render("review.ejs");
    } else {
        res.redirect("/");
    }

});

app.get("/upload", function (req, res) {
    if (activeCookie != "") {
        res.render("upload.ejs");
    } else {
        res.redirect("/");
    }

});

app.get("/edit", function (req, res) {
    if (activeCookie != "") {
        res.render("edit.ejs");
    } else {
        res.redirect("/");
    }

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


app.post('/upload', uploads.single('csv'), (req, res) => {
    csv().fromFile(req.file.path).then((jsonObj) => {
        for (var i = 1; i < jsonObj.length; i++) {
            temp = parseInt(jsonObj[i].SNo);
            jsonObj[i].SNo = temp;
        };
        fileModel.insertMany(jsonObj, (err,data) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/upload");
            }
        });
    })
});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

//Listen Functions
app.listen(port, function () {
    console.log("Server has started successfully!");
});