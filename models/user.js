const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
  },
  googleID: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: String,
  },
  // local login
  email: {
    type: String,
  },
  password: {
    type: String,
    //因為存進來的時候已經hash了，所以這個minLength就沒什麼用
    //minLength: 8,
    maxLength: 1024,
  },
});

module.exports = mongoose.model("User", userSchema);