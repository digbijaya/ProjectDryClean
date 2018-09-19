var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ShopLoginSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("shoplogin", ShopLoginSchema);