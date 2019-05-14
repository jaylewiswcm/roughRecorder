const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TrackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  audio: {
    type: String
  }
});

module.exports = mongoose.model("Track", TrackSchema);
