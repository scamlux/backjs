const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
  roles: { type: String, ref: "Role" },
});

module.exports = model("User", User);
