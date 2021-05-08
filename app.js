const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Listen route
app.listen(3000, function () {
   console.log("Server running on port 3000!");
});

////////// Connection to local DB //////////
mongoose.connect("mongodb://localhost:27017/moneyDB", {
   useNewUrlParser: true,
});

////////// DB Schema //////////

// Schema for the savings database
const trnxDeatails = {
   date: String,
   amount: Number,
};

// Schema for the final balance database
const finalBalance = {
   ID: Number,
   date: String,
   final_amount: Number,
};

// Create model or collection in the database

// savings collection
const saved = mongoose.model("Saving", trnxDeatails);

// Balance Collection
const trackBalance = mongoose.model("balance", finalBalance);

/************** GET routes **************/
app.get("/", function (req, res) {
   res.render("home");
});

app.get("/about", function (req, res) {
   res.render("about");
});

app.get("/support", function (req, res) {
   res.render("support");
});

/************** POST routes **************/
app.post("/", function (req, res) {
   // create a new data from the submitted form
   // Then write the new collected data to the Database
   const newSaving = new saved({
      date: req.body.day,
      amount: req.body.money,
   });
   newSaving.save(function (err) {
      if (!err) {
         res.redirect("/");
      } else {
         console.log(err);
      }
   });
});

const oldFinalBalance = trackBalance.findOne(
   { ID: 1 },
   function (err, foundData) {
      var oldAmount = foundData.final_amount;
      console.log(`The final amount in the db is: ${foundData.final_amount}`);
   }
);

// function updateBalance() {
//    var newAmount = req.body.money;
//    var addedAmount = newAmount + oldFinalBalance.oldAmount;
//    console.log(addedAmount);
//    return addedAmount;
// }
// const newBalance = trackBalance.updateOne(
//    { ID: 1 },
//    { $set: { final_amount: updateBalance() } },
//    function (err) {
//       if (!err) {
//          console.log("Final amount updated");
//       } else {
//          console.log(err);
//       }
//    }
// );

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

// Initiating the final balance collection
// const balanceed = new trackBalance({
//    date: req.body.day,
//    final_amount: req.body.money,
// });
// balanceed.save(function (err) {
//    if (!err) {
//       console.log("final balance Updated");
//    } else {
//       console.log(err);
//    }
// });
