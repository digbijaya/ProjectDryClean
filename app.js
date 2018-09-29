const express = require("express");
var bodyparser = require("body-parser");
const mongoose = require("mongoose");
var nocache = require("nocache");
const path = require("path");
const passport = require("passport");

const app = express();
app.set("etag", false);
// app.set("view engine", "ejs");
//DBCONFIG
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(error));
//mongoose.connect("mongodb://braj:braj@ds219130.mlab.com:19130/dryclean");

const users = require("./routes/api/users");
const orders = require("./routes/api/orders");
const reports = require("./routes/api/reports");

// var Cloth = require("./models/Clothes");
// var User = require("./models/User");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src"));
app.use(express.static(__dirname + "/views"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(nocache());
//Passport middleware
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);
//ROUTES
app.use("/api/users", users);
app.use("/api/orders", orders);
app.use("/api/reports", reports);

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const Clothetype = require("./models/static/clothetype");
const clothetypes = ["Saree", "Pant", "Shirt"];
clothetypes.map(clothetype => {
  Clothetype.findOne({ name: clothetype }, function(err, foundclothetype) {
    if (err || foundclothetype === null) {
      Clothetype.create(
        {
          name: clothetype
        },
        function(err, newClotheType) {
          if (err) console.log(error);
        }
      );
    }
  });
});

const Clothequality = require("./models/static/clothequality");
const clothequality = ["Nylon", "Cotton", "Silk"];
clothequality.map(clothequality => {
  Clothequality.findOne({ name: clothequality }, function(
    err,
    foundclothequality
  ) {
    if (err || foundclothequality === null) {
      Clothequality.create(
        {
          name: clothequality
        },
        function(err, newClotheQuality) {
          if (err) console.log(error);
        }
      );
    }
  });
});

// app.get("/", (req, res) => {
//   res.render("home");
// });

// app.get("/initial", function(req, res) {
//   res.render("collectdeliver");
// });

// app.get("/about", function(req, res) {
//   res.render("about");
// });

//collect order
// app.get("/orderreceive", function(req, res) {
//   res.render("collect");
// });

// app.post("/orderreceive", function(req, res) {
//   var newClothName = req.body.clothname;
//   var newClothDescription = req.body.description;
//   var user = req.body.user;

//   User.findOne({ mobilenumber: req.body.user.mobilenumber }, function(
//     err,
//     foundUser
//   ) {
//     if (err || foundUser === null) {
//       User.create(user, function(err, newUser) {
//         if (err) console.log(err);
//         else {
//           Cloth.create(
//             {
//               name: newClothName,
//               description: newClothDescription
//             },
//             function(err, newCloth) {
//               if (err) console.log(err);
//               else {
//                 newUser.clothes.push(newCloth);
//                 newUser.save();
//                 res.redirect("/initial");
//               }
//             }
//           );
//         }
//       });
//     } else {
//       Cloth.create(
//         {
//           name: newClothName,
//           description: newClothDescription
//         },
//         function(err, newCloth) {
//           if (err) console.log(err);
//           else {
//             foundUser.clothes.push(newCloth);
//             foundUser.save();
//             res.redirect("/initial");
//           }
//         }
//       );
//     }
//   });
// });

//deliver order
// app.get("/orderdeliver", function(req, res) {
//   res.render("deliver");
// });

// app.post("/orderdeliver", function(req, res) {
//   var cellNumber = req.body.mobilenumber;
//   User.findOne({ mobilenumber: req.body.user.mobilenumber })
//     .populate("clothes")
//     .exec(function(err, foundUser) {
//       if (err || foundUser.length <= 0) {
//         console.log(err);
//       } else {
//         res.render("orderhistory", { user: foundUser });
//       }
//     });
// });

app.get("/offline", function(req, res) {
  res.render("offline");
});

app.listen(process.env.PORT || 3001, () =>
  console.log("App started for heroku")
);
