const express = require("express");
const ejs = require("ejs");

const app = express();

app.set('view engine','ejs');


app.use(express.static(__dirname + "/public"));

app.get("/",function(req,res){
    res.render("edit.ejs");
});

app.get("/domain",function(req,res){
    res.render("domain.ejs");
});

app.get("/result",function(req,res){
    res.render("result.ejs");
});

app.get("/review",function(req,res){
    res.render("review.ejs");
});

app.get("/upload",function(req,res){
    res.render("upload.ejs");
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});