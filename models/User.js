const { Schema, model } = require("mongoose");

const User = new Schema({
  isAdmin: { type: Boolean },
  roles: { type: String, ref: "Role" },
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  location: { type: String, required: true },
  job: { type: String, required: true },
  price: { type: Number, required: true },

});

module.exports = model("User", User);
