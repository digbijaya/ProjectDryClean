const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  mobilenumber: {
    type: String,
    required: true
  },
  orderids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderids"
    }
  ]
});

module.exports = mongoose.model("user", UserSchema);
//cjhanged file name to small
