var mongoose = require("mongoose");
var schema = mongoose.Schema;

var roleSchema = schema({
  enum: ["user", "client", "admin"],
  name: { type: String, default: "user" },
});

module.exports = mongoose.model("Role", roleSchema);
