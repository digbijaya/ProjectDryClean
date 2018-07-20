var mongoose = require("mongoose");
const clotheTypeSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model("clothetype", clotheTypeSchema);
