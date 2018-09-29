const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
//Load models
const ShopOrders = require("../../models/shoporders");

//@route GET api/reports/fetchreport
//@desc fetch orders by date from shoporders table
//@access public route
router.post("/fetchreport", (req, res) => {
  let shopname = req.body.selectedshop;
  let startdate = req.body.startdate;
  let enddate = req.body.enddate;
  console.log(
    "&&&&&&&&&&&&&&&& ",
    moment(new Date())
      .utcOffset("+05:30")
      .format()
  );
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
        console.log("*************** found orders ", foundorders);
      }
    });
});
module.exports = router;
