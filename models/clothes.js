//SCHEMA SETUP
var mongoose = require("mongoose");
var clothSchema = new mongoose.Schema({
  type: String,
  quality: String,
  washtype: String,
  color: String,
  quantity: String,
  price: String,
  orderid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderid"
  }
});

module.exports = mongoose.model("clothes", clothSchema);
//cjhanged file name to small
