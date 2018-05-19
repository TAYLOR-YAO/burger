var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition: ", condition);
  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


router.post("/api/burgers", function(req, res) {
  console.log("REQBody: ", req.body)
  console.log("burger_name: ", req.body.burger_name)
  console.log("REQBody stringiy: ", JSON.stringify(req.body))
  burger.insertOne(
    "burger_name", req.body.burger_name, function(result) {
    console.log("Burger Name: " +req.body.burger_name)
    // console.log("Post Result: "+result.burger_name)
    res.redirect("/");
  });

 
});

module.exports = router;