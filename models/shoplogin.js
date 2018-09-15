var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ShopLoginSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dae: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("shoplogin", ShopLoginSchema);
