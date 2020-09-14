var mongoose = require("mongoose");
var schema = mongoose.Schema;

var userSchema = schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  role: { type: schema.Types.String, ref: "Role" }, // ref of role schema is given
});

module.exports = mongoose.model("myUser", userSchema);
