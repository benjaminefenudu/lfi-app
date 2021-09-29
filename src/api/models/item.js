const mongoose = require("mongoose");
const { Schema } = mongoose;

// LOST ITEM MODEL
const lostItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 20,
  },
  category: {
    type: String,
    required: true,
    max: 50,
  },
  description: {
    type: String,
    required: true,
    max: 255,
  },
  imageURI: {
    type: String,
    default: "",
  },
  dateLost: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    required: true,
    max: 20,
  },
  town: {
    type: String,
    required: true,
    max: 50,
  },
  preciseLocation: {
    type: String,
    max: 255,
    default: "",
  },
  reward: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// FOUND ITEM MODEL
const foundItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 20,
  },
  category: {
    type: String,
    required: true,
    max: 50,
  },
  description: {
    type: String,
    required: true,
    max: 255,
  },
  imageURI: {
    type: String,
    required: true,
  },
  dateFound: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    required: true,
    max: 20,
  },
  town: {
    type: String,
    required: true,
    max: 50,
  },
  preciseLocation: {
    type: String,
    max: 255,
    default: "",
  },
  questions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const LostItem = mongoose.model("lostItem", lostItemSchema);
const FoundItem = mongoose.model("foundItem", foundItemSchema);
module.exports = { LostItem, FoundItem };
