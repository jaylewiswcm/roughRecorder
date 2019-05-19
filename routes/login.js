var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get("/login", function(req, res, next) {
  return res.sendFile(path.join(__dirname + "/pages/login.html"));
});

router.post("/users", (req, res) => {
  if (req.body.password !== req.body.password2) {
    var err = new Error("Passwords do not match");
    err.status = 400;
    re.send("passwords do not match");
    return next(err);
  }
  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.password2
  ) {
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10)
    });

    db.collection("users").findOne({ email: req.body.email }, (err, result) => {
      if (err) return console.log("No user found");
      console.log(result);
    });

    db.collection("users").insertOne(newUser, (err, result) => {
      if (err) return console.log(err);

      console.log("Saved to database");
      res.redirect("/login");
    });

    console.log(newUser);
  }
  console.log("User wasn't saved");
});
