var mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const ShopOrdersSchema = new Schema({
  date: {
    type: Date,
    default: new Date()
  },
  shopid: {
    type: String,
    required: true
  },
  orderids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderid"
    }
  ]
});

module.exports = mongoose.model("shoporders", ShopOrdersSchema);
