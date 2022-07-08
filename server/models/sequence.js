const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxTrackId: { type: Number, required: true }
});

module.exports = mongoose.model("Sequence", sequenceSchema);