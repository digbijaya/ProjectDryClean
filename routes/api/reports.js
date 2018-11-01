const express = require("express");
const router = express.Router();
//Load models
const ShopOrders = require("../../models/shoporders");

//@route GET api/reports/fetchreport
//@desc fetch orders by date from shoporders table
//@access public route
router.post("/fetchreport", (req, res) => {
  let shopname = req.body.selectedshop;
  let startdate = req.body.startdate;
  let enddate = req.body.enddate;
  if (shopname === "All") {
    ShopOrders.find({
      // shopid: shopname,
      // shopid: { $in: ["shop1", "admin"] },
      date: {
        $gte: startdate,
        $lte: enddate
      }
    })
      .populate({
        path: "orderids",
        model: "orderid"
      })
      .exec(function(err, foundorders) {
        if (err) {
          console.log("************* err", err);
        } else {
          console.log("&&&&&&&&&&&&&&&&&&&&& foundorders", foundorders);
          res.json(foundorders);
        }
      });
  } else {
    ShopOrders.find({
      shopid: shopname,
      date: {
        $gte: startdate,
        $lte: enddate
      }
    })
      .populate({
        path: "orderids",
        model: "orderid"
      })
      .exec(function(err, foundorders) {
        if (err) {
          console.log("************* err", err);
        } else {
          console.log("&&&&&&&&&&&&&&&&&&&&& foundorders", foundorders);
          res.json(foundorders);
        }
      });
  }
});
module.exports = router;
