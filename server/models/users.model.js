const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, index: true, unique: true },
  currentMode: Number,
  pastResults: [
    {
      week: { type: Number },
      year: { type: String },
      type: { type: String },
      smallBikePicks: [
        {
          _id: false,
          riderName: String,
          position: Number,
        },
      ],
      bigBikePicks: [
        {
          _id: false,
          riderName: String,
          position: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("users", User);
