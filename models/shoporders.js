var mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const ShopOrdersSchema = new Schema({
  date: {
    type: Date,
    default: new Date(moment().format("DD-MMM-YYYY"))
  },
  shopid: {
    type: String,
    required: true
  },
  orderids: [
    {
      type: Schema.Types.ObjectId,
      ref: "orderid"
    }
  ]
});

module.exports = mongoose.model("shoporders", ShopOrdersSchema);
