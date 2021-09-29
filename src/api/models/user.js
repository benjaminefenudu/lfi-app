const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 35,
  },
  email: {
    type: String,
    max: 255,
    default: "",
  },
  phoneNo: {
    type: String,
    max: 20,
    default: "",
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 128,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
