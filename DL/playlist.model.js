
const mongoose = require("mongoose")

const playlistSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false,
    },
  title:{
    type: String,
    unique: true,
  },
  playlist: {
    type: Array,
    unique: false,
  }
})

const playlistData = mongoose.model("playlist",playlistSchema);

module.exports = playlistData


 




