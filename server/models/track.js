const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  built: { type: String, required: true },
  length: { type: String, required: true },
  surface: { type: String, required: true },
  turns: { type: String, required: true },
  banking: { type: String, required: true },
  capacity: { type: String, required: true },
  category: { type: String, required: true },
  mapUrl: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model("Track", trackSchema);