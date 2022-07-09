const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
  // Stuff broke with required set to true, fix later
  id: { type: String, required: false },
  name: { type: String, required: false },
  built: { type: String, required: false },
  length: { type: String, required: false },
  surface: { type: String, required: false },
  turns: { type: String, required: false },
  banking: { type: String, required: false },
  capacity: { type: String, required: false },
  mapUrl: { type: String, required: false },
  imageUrl: { type: String, required: false },
});

module.exports = mongoose.model("Track", trackSchema);