
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
var bodyParser = require('body-parser');
var axios = require('axios');
const mongoose = require("mongoose");
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var technicalFileModel = require('./models/technicalModel');
var designFileModel = require('./models/designModel');
var managementModel = require('./models/managementModel');

var csv = require('csvtojson');
const req = require('express/lib/request');

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
var selectedDomain = "";





app.get("/", function (req, res) {
    activeCookie="";
    selectedDomain="";
    res.render("login.ejs");
});

app.get("/domain", function (req, res) {
    if (activeCookie != "") {
        res.render("domain.ejs");
    } else {
        res.redirect("/");
    }
});

app.get("/editdomain",function(req,res){
    res.render("editDomain.ejs");
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
        if(selectedDomain===null){
            res.redirect("/domain");
        }else if(selectedDomain==="Technical"){
            technicalFileModel.find({},function(err,foundQuestions){
                if(err){
                    console.log(err);
                }else{
                    if(foundQuestions.length===0){
                        console.log("No data found");
                        res.redirect("/upload");
                    }else{
                        res.render("edit",{Questions:foundQuestions});
                    }
                }
            });
        }else if(selectedDomain==="Design"){
            designFileModel.find({},function(err,foundQuestions){
                if(err){
                    console.log(err);
                }else{
                    if(foundQuestions.length===0){
                        console.log("No data found");
                        res.redirect("/upload");
                    }else{
                        res.render("edit",{Questions:foundQuestions,Domain:selectedDomain});
                    }
                }
            });
        }
        else if(selectedDomain==="Management"){
            managementModel.find({},function(err,foundQuestions){
                if(err){
                    console.log(err);
                }else{
                    if(foundQuestions.length===0){
                        console.log("No data found");
                        res.redirect("/upload");
                    }else{
                        res.render("edit",{Questions:foundQuestions});
                    }
                }
            });
        }
        else{
            res.render("edit.ejs");
        }
    } else {
        res.redirect("/");
    }

});


app.post("/", function (req, res) {
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
        if (selectedDomain === "Technical") {
            technicalFileModel.insertMany(jsonObj, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/domain");
                }
            });
        } else if (selectedDomain === "Design") {
            designFileModel.insertMany(jsonObj, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/domain");
                }
            });
        } else if(selectedDomain === "Management") {
            managementModel.insertMany(jsonObj, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/domain");
                }
            });
        } else{
            console.log("No data added");
            res.redirect("/domain");
        }
    })
});


app.post("/domain", function (req, res) {
    if (req.body.selected_domain != null) {
        selectedDomain = req.body.selected_domain;
        res.redirect("/upload");
    } else {
        res.redirect("/domain");
    }
});


app.post("/editdomain", function (req, res) {
    if (req.body.selected_domain != null) {
        selectedDomain = req.body.selected_domain;
        res.redirect("/edit");
    } else {
        res.redirect("/editdomain");
    }
});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

//Listen Functions
app.listen(port, function () {
    console.log("Server has started successfully!");
});