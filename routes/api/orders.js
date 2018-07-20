const express = require("express");
const router = express.Router();

//@route GET api/orders/order
//@desc Tests orders route
//@access public route
router.get("/order", (req, res) => res.json({ msg: "Orders works" }));
module.exports = router;
