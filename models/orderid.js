var mongoose = require("mongoose");

var orderidSchema = new mongoose.Schema({
  clothes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clothes"
    }
  ],
  orderstatus: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("orderid", orderidSchema);
