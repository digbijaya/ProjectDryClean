var mongoose = require("mongoose");

var orderidSchema = new mongoose.Schema({
  clothes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clothes"
    }
  ],
  orderstatus: String
});

module.exports = mongoose.model("orderid", orderidSchema);
