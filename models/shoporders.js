var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopOrdersSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
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

module.exports = mongoose.model("shopdetails", ShopOrdersSchema);
