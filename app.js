const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


//////////   GET Routes //////////
app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.get("/support", function(req, res){
    res.render("support");
})

//////////   POST Routes //////////

app.post("/",  function(req, res){
    
})








// Listen route
app.listen(3000, function(){
    console.log("Server running on port 3000!");
});