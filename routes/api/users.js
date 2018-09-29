const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const keys = require("../../config/keys");
const passport = require("passport");

//Load input validation
const validateReceiveInput = require("../../validation/receive");
const validateDeliverInput = require("../../validation/deliver");
const validateAuthInput = require("../../validation/auth");
//Load user and cloth model
const User = require("../../models/user");
const Cloth = require("../../models/clothes");
const Orderid = require("../../models/orderid");
const ShopLogin = require("../../models/shoplogin");
const ShopOrders = require("../../models/shoporders");

//@route POST api/users/orderreceive
//@desc Receive order from user
//@access public route
router.post("/orderreceive", (req, res) => {
  const { errors, isValid } = validateReceiveInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // var newClothName = req.body.clothname;
  // var newClothDescription = req.body.description;
  let order = req.body.order;
  let user = req.body.user;
  let orderstatus = req.body.orderstatus;
  let totalprice = req.body.totalprice;
  let orderplaceddate = req.body.orderplaceddate;
  let expecteddeliverydate = req.body.expecteddeliverydate;
  let shopid = req.body.loggedinshop;

  //Going to update shopdetails
  let shoporderentry;
  let today = moment()
    .clone()
    .format("DD-MMM-YYYY");
  User.findOne({ mobilenumber: req.body.user.mobilenumber }, function(
    err,
    foundUser
  ) {
    if (err || foundUser === null) {
      User.create(user, function(err, newUser) {
        if (err) res.status(404).json(err);
        else {
          Orderid.create({}, function(err, newOrderid) {
            if (err) res.status(404).json(err);
            else {
              shoporderentry = {
                shopid: shopid,
                orderids: [newOrderid]
              };
              order.map(cloth => {
                Cloth.create(
                  {
                    type: cloth.clothtype,
                    quality: cloth.quality,
                    washtype: cloth.washtype,
                    color: cloth.color,
                    quantity: cloth.quantity,
                    price: cloth.price,
                    orderid: newOrderid
                  },
                  function(err, newCloth) {
                    if (err) res.status(404).json(err);
                    else {
                      Orderid.update(
                        { _id: newOrderid._id },
                        {
                          $push: { clothes: newCloth }
                        },
                        function(err, succ) {
                          if (err) console.log(err);
                          else
                            console.log("Orderid updated with clothes ", succ);
                        }
                      );
                    }
                  }
                );
              });
              Orderid.update(
                { _id: newOrderid._id },
                {
                  orderstatus: orderstatus,
                  totalprice: totalprice,
                  orderplaceddate: orderplaceddate,
                  expecteddeliverydate: expecteddeliverydate
                },
                function(err, succ) {
                  if (err) console.log(err);
                  else
                    console.log("Orderid updated with stat,price,dates ", succ);
                }
              );
              //Creating/updating shop orders table with new order created for logged in shop
              ShopOrders.find({ shopid: shopid, date: today }, function(
                err,
                foundEntry
              ) {
                if (err || foundEntry.length < 1) {
                  ShopOrders.create(shoporderentry, function(err, newEntry) {});
                } else {
                  ShopOrders.update(
                    { _id: foundEntry[0]._id },
                    {
                      $push: { orderids: newOrderid }
                    },
                    function(err, succ) {
                      if (err) console.log(err);
                      else console.log("Shop updated with new orderid ", succ);
                    }
                  );
                }
              });
              //
            }
            newUser.orderids.push(newOrderid);
            newUser.save();
            res.json({ neworderid: newOrderid, status: orderstatus });
          });
        }
      });
    } else {
      Orderid.create({}, function(err, newOrderid) {
        if (err) res.status(404).json(err);
        else {
          shoporderentry = {
            shopid: shopid,
            orderids: [newOrderid]
          };
          order.map(cloth => {
            Cloth.create(
              {
                type: cloth.clothtype,
                quality: cloth.quality,
                washtype: cloth.washtype,
                color: cloth.color,
                quantity: cloth.quantity,
                price: cloth.price,
                orderid: newOrderid
              },
              function(err, newCloth) {
                if (err) res.status(404).json(err);
                else {
                  Orderid.update(
                    { _id: newOrderid._id },
                    { $push: { clothes: newCloth } },
                    function(err, succ) {
                      if (err) console.log(err);
                      else console.log("Orderid updated with clothes ", succ);
                    }
                  );
                }
              }
            );
          });
          Orderid.update(
            { _id: newOrderid._id },
            {
              orderstatus: orderstatus,
              totalprice: totalprice,
              orderplaceddate: orderplaceddate,
              expecteddeliverydate: expecteddeliverydate
            },
            function(err, succ) {
              if (err) console.log(err);
              else console.log("Orderid updated with stat,price,dates ", succ);
            }
          );
          //Creating/updating shop orders table with new order created for logged in shop
          ShopOrders.find({ shopid: shopid, date: today }, function(
            err,
            foundEntry
          ) {
            if (err || foundEntry.length < 1) {
              console.log("&&&&&&&&&&&&&&&&&&&&&&& ", foundEntry);
              console.log("&&&&&&&&&&&&&&&&&&&&&&& ", shopid);
              console.log("&&&&&&&&&&&&&&&&&&&&&&& ", today);
              ShopOrders.create(shoporderentry, function(err, newEntry) {});
            } else {
              ShopOrders.update(
                { _id: foundEntry[0]._id },
                {
                  $push: { orderids: newOrderid }
                },
                function(err, succ) {
                  if (err) console.log("err ", err);
                  else console.log("Shop updated with new orderid ", succ);
                }
              );
            }
          });
        }
        foundUser.orderids.push(newOrderid);
        foundUser.save();
        res.json({ neworderid: newOrderid, status: orderstatus });
      });
    }
  });

  /* User.findOne({ mobilenumber: req.body.user.mobilenumber }, function(
    err,
    foundUser
  ) {
    if (err || foundUser === null) {
      User.create(user, function(err, newUser) {
        if (err) res.status(404).json(err);
        else {
          Cloth.create(
            {
              name: newClothName,
              description: newClothDescription
            },
            function(err, newCloth) {
              if (err) res.status(404).json(err);
              else {
                newUser.clothes.push(newCloth);
                newUser.save();
                res.json(newUser);
                // res.redirect("/initial");
              }
            }
          );
        }
      });
    } else {
      Cloth.create(
        {
          name: newClothName,
          description: newClothDescription
        },
        function(err, newCloth) {
          if (err) res.status(404).json(err);
          else {
            foundUser.clothes.push(newCloth);
            foundUser.save();
            res.json(foundUser);
            //res.redirect("/initial");
          }
        }
      );
    }
  }); */
});

//@route GET api/users/orderdeliver
//@desc Deliver order to user
//@access public route
router.post("/orderdeliver", function(req, res) {
  const { errors, isValid } = validateDeliverInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const errs = {};
  User.findOne({ mobilenumber: req.body.user.mobilenumber })
    .populate({
      path: "orderids",
      model: "orderid",
      populate: {
        path: "clothes",
        model: "clothes"
      }
    })
    .exec(function(err, foundUser) {
      if (err) {
        errs.mobilenumber = err;
        return res.status(404).json(errs);
      } else if (foundUser === null) {
        errs.mobilenumber = "There are no orders placed by this user";
        return res.status(404).json(errs);
      } else {
        res.json(foundUser);
        // res.render("orderhistory", { user: foundUser });
      }
    });
});

//@route POST /api/users/changeorderidstatus
//@Desc update orderid status
//@access public route
router.post("/changeorderidstatus", function(req, res) {
  /* Orderid.findOneAndUpdate(
    { _id: req.body.orderid },
    { $set: { orderstatus: req.body.newState } },
    { new: true },
    function(err, updateddoc) {
      if (err) {
      } else {
        res.json(updateddoc);
      }
    }
  ); */

  Orderid.findOneAndUpdate(
    { _id: req.body.orderid },
    { $set: { orderstatus: req.body.newState } },
    { new: true }
  )
    .populate({
      path: "clothes",
      model: "clothes"
    })
    .exec(function(err, updateddoc) {
      if (err) {
      } else {
        res.json(updateddoc);
      }
    });
});

//@route POST api/users/register
//@desc  Register useer
//@access private
//http://localhost:3001/api/users/register?username=admin&password=admin
router.get("/register", (req, res) => {
  ShopLogin.findOne({ username: req.query.username }).then(user => {
    if (user) {
      return res.status(400).json({ name: "Name already exists" });
    } else {
      const newShop = new ShopLogin({
        username: req.query.username,
        password: req.query.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newShop.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newShop.password = hash;
          newShop
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route POST api/users/login
//@desc  Login user /Returning JWT token
//@access public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateAuthInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const password = req.body.password;
  //find user by username
  ShopLogin.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ username: "Username not found" });
    }
    //chk password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched. Create jwt payload
        const payload = { id: user.id, name: user.username };
        //sign the token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 64800 },
          (err, token) => {
            res.json({ succes: true, token: "Bearer " + token });
          }
        );
      } else {
        return res.status(400).json({ password: "Password is incorrect" });
      }
    });
  });
});
//@route GET api/users/current
//@desc  Return current user
//@access private
//http://localhost:3001/api/users/current
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, response) => {
    //res.json(req.user);
    res.json({
      id: req.user.id,
      shopname: req.user.username,
      date: req.user.date
    });
  }
);
module.exports = router;
