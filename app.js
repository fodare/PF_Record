const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// Listen route
app.listen(3000, function(){
    console.log("Server running on port 3000!");
});

////////// Connection to local DB ////////// 
mongoose.connect("mongodb://localhost:27017/moneyDB", {useNewUrlParser:true});


////////// DB Schema //////////
const trnxDeatails = {
    date: String,
    amount: Number,
    balance: Number
};

// Create model or collection in the database
const saved = mongoose.model("Saving", trnxDeatails);

// // Starting Balance
// const defaultBalance = new saved({
//     date:"2021-03-13",
//     amount:0,
//     balance:3000
// });

// saved.insertMany([defaultBalance], function(err){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Balance initiated!");
//     }
// });

/************** GET routes **************/
app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.get("/support", function(req, res){
    res.render("support");
});

/************** POST routes **************/
app.post("/", function(req, res){
    const newSaving = new saved({
        date: req.body.day,
        amount: req.body.money
    });
    newSaving.save(function(err){
        if (!err){
            res.redirect("/");
        } else {
            console.log(err);
        }
    });

});
