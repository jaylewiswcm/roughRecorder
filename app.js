const express = require("express"),
  http = require("http");
const app = express();
const server = http.Server(app);
const io = require("socket.io")(server);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const multer = require("multer");
const axios = require("axios");

const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const port = 5000;

const Project = require("./models/Project");
const User = require("./models/User");
const Track = require("./models/Track");

const url = "mongodb://jay:jay123@ds145346.mlab.com:45346/projects";
var mLab = require("mongolab-data-api")("p-3QMFKwkIzCwu37_tCaB4YS7Rkro96v");

// Database Name
const dbName = "projects";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
// bodyParser = {
//   json: {limit: '50mb', extended: true},
//   urlencoded: {limit: '50mb', extended: true}
// };

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// MongoClient.connect(url, { useNewUrlParser: true })
//   .then(client => {
//     // if (err) return console.log(err);
//     db = client.db(dbName);
//     const userCol = db.collection("users");
//     return userCol
//       .find({})
//       .limit(1)
//       .toArray();
//   })
//   .then(res => console.log("Connected to Users Collection"))
//   .catch(err => console.log(err));

MongoClient.connect(url, { useNewUrlParser: true })
  .then(client => {
    // if (err) return console.log(err);
    db = client.db(dbName);
    const collection = db.collection("user-projects");

    return collection
      .find({})
      .limit(1)
      .toArray();
  })
  .then(res => console.log("Connected to Project Collection"))
  .catch(err => console.log(err));

app.post("/users", (req, res) => {
  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.password2
  ) {
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    db.collection("users").insertOne(newUser, (err, result) => {
      if (err) return console.log(err);

      console.log("Saved to database");
      res.redirect("/login");
    });

    console.log(newUser);
  }
  console.log("newUser");
});

var heldProject = {
  title: "",
  lyrics: "",
  tracks: "",
  tabs: ""
};

app.post("/projects", (req, res) => {
  const newProject = new Project({
    title: req.body.title,
    lyrics: req.body.lyrics,
    tracks: req.body.tracks,
    tabs: req.body.tabs
  });

  var usedTitle = req.body.title;

  var lyricsVal = req.body.lyrics;
  var tracksVal = req.body.tracks;
  var tabsVal = req.body.tabs;

  // console.log(newProject.title);
  // console.log(heldProject);

  // console.log(db.collection("user-project").find({ title: { $eq: "second" } }));

  // db.collection("user-projects").findOneAndUpdate(
  //   { title: usedTitle },
  //   {
  //     $addToSet: {
  //       tracks: tracksVal,
  //       tabs: tabsVal
  //     },
  //     $set: {
  //       lyrics: lyricsVal
  //     }
  //   },
  //   { upsert: true },
  //   (err, res) => {
  //     if (err) return console.log(err);

  //     console.log("Updated Project");
  //     // res.redirect("/");
  //   }
  // );

  // if (newProject.title === heldProject.title) {
  //   console.log("they're the same");

  //   // db.collection("user-project").update(
  //   //   { title: usedTitle },
  //   //   {
  //   //     title: usedTitle,
  //   //     lyrics: lyricsVal,
  //   //     tracks: tracksVal,
  //   //     tabs: tabsVal,
  //   //     date: Date.now
  //   //   },
  //   //   (err, result) => {
  //   //     if (err) return console.log(err);

  //   //     console.log("Updated Project");
  //   //     res.redirect("/");
  //   //   }
  //   // );
  //   db.collection("user-projects").insertOne(newProject, (err, result) => {
  //     if (err) return console.log(err);

  //     console.log("Saved to database");
  //     res.redirect("/");
  //   });
  // } else {
  db.collection("user-projects").insertOne(newProject, (err, result) => {
    if (err) return console.log(err);

    console.log("Saved to database");
    res.redirect("/");
  });
  // }

  // req.body.tracks.audio;

  // console.log(req.body.tabs);

  heldProject = newProject;
  // console.log("This is the newProject:   " + newProject);
});

app.post("/blob", (req, res) => {
  // var data = JSON.stringify(res);
  console.log("This is the blob: " + res);
});

app.set("view engine", "ejs");

var newRes = [];
app.get("/library", (req, res) => {
  var dbCol = db
    .collection("user-projects")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);

      res.render("library.ejs", { projects: result });
    });
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/routes/login.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/routes/recording.html");
});
app.get("/library", (req, res) => {
  res.sendFile(__dirname + "/routes/library.html");
});
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/routes/about.html");
});
app.get("/account", (req, res) => {
  res.sendFile(__dirname + "/routes/account.html");
});

app.post("/lyricstore", (req, res) => {
  console.log(req.body.textarea);
});

app.get("/array", function(req, res) {
  var Passed_value = JSON.parse(req.body);
  console.log(Passed_value);
});
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// io.on("connection", function(socket) {
//   socket.emit("news", { hello: "world" });
//   socket.on("my other event", function(data) {
//     console.log(data);
//   });
// });

app.listen(port, () => console.log(`Listening on port ${port}!`));
