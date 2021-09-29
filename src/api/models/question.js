const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  question: {
    type: String,
    default: "",
    max: 255,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", questionSchema);
