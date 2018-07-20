var mongoose = require("mongoose");

const clothequalitySchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model("clothequality", clothequalitySchema);
