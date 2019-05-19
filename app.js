const express = require("express"),
  http = require("http");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require("axios");
const multer = require("multer");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOveride = require("method-override");

const app = express();
const server = http.Server(app);
// var bcrypt = require("bcrypt");
// var session = require("express-session");

const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const port = 5000;

const Project = require("./models/Project");
const User = require("./models/User");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(methodOveride("_method"));

const url = "mongodb://jay:jay123@ds145346.mlab.com:45346/projects";
var mLab = require("mongolab-data-api")("p-3QMFKwkIzCwu37_tCaB4YS7Rkro96v");

// Database Name
const dbName = "projects";

// const conn = mongoose.createConnection(url);

// let gfs;

// conn.once("open", () => {
//   //Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

// // Create storage engine
// const storage = new GridFsStorage({
//   url: url,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads"
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload = multer({ storage });

// app.use(
//   session({
//     secret: "work hard",
//     resave: true,
//     saveUninitialized: false
//   })
// );

// var routes = require("./routes/login");
// app.use("/", routes);

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
  .then(res => console.log("Connected to mLab"))
  .catch(err => console.log(err));

//This is the start attempt of user accounts implementation
// app.post("/users", (req, res) => {
//   if (req.body.password !== req.body.password2) {
//     var err = new Error("Passwords do not match");
//     err.status = 400;
//     res.send("passwords do not match");
//     return err;
//   }
//   const newUser = new User({
//     email: req.body.email,
//     username: req.body.username,
//     // password: bcrypt.hashSync(req.body.password, 10)
//     password: req.body.password
//   });

//   // console.log(newUser);
//   db.collection("users").findOne(
//     { email: req.body.email },
//     { email: true },
//     (err, result) => {
//       if (err) return console.log(err);
//       // console.log(result.email);
//       if (result.email) {
//         console.log(result.email);
//         console.log("Already user with this email address");
//       } else {
//         db.collection("users").insertOne(newUser, (req, res) => {
//           if (err) return console.log(err);
//           console.log("Saved to database");
//           res.redirect("/login");
//         });
//       }
//     }
//   );
// });

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
  var tabsArr = [];

  var track = req.body.tracks;

  db.collection("user-projects").findOne(
    { title: req.body.title },
    { title: true },
    (err, res) => {
      if (res === null) {
        console.log("No Project");
        db.collection("user-projects").insertOne(newProject, (err, result) => {
          if (err) return console.log(err);

          console.log("Saved to database");
        });
      } else {
        for (var i = 0; i < track.length; i++) {
          db.collection("user-projects").updateOne(
            { title: req.body.title },
            {
              $set: {
                lyrics: req.body.lyrics
              },
              $addToSet: {
                tracks: track[i]
              }
            },
            (err, res) => {
              if (err) return console.log(err);
              console.log("Updated database");
            }
          );
        }
      }
    }
  );
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

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/pages/register.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/pages/login.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/recording.html");
});
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/pages/about.html");
});
app.get("/account", (req, res) => {
  res.sendFile(__dirname + "/pages/account.html");
});

app.listen(process.env.PORT || port, () =>
  console.log(`Listening on port ${port}!`)
);
