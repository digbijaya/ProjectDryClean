const express = require("express");
const router = express.Router();

//Load shopdetails model
const Shop = require("../../models/shoporders");

//@route GET api/orders/report
//@desc Gets sale details for a time period for shop/shops
//@access public route
router.get("/getreport", function(req, res) {
  Shop.find({
    date: {
      $gte: req.body.startdate,
      $lte: req.body.enddate
    }
  })
    .populate({
      path: "orderids",
      model: "orderid"
    })
    .exec(function(err, foundorders) {
      console.log("*************** found orders ", foundorders);
    });
});
module.exports = router;
