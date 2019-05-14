const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  project: {
    type: String
  },
  lyrics: {
    type: String
  },
  // tracks: [
  //   {
  //     name: {
  //       type: String
  //     },
  //     audio: {
  //       type: Buffer
  //     }
  //   }
  // ],
  tracks: {
    type: Array
  },
  tabs: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
