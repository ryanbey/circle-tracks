let Sequence = require("../models/sequence");

let maxTrackId;
let sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne().exec(function (err, sequence) {
    if (err) {
      return res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    }
    sequenceId = sequence._id;
    maxTrackId = sequence.maxTrackId;
  });
}

SequenceGenerator.prototype.nextId = () => {
  maxTrackId++;
  updateObject = { maxTrackId: maxTrackId };
  nextId = maxTrackId;

  // Originally was just update, not updateOn. Change back if this breaks
  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject }, function (err) {
    if (err) {
      console.log("nextId error = " + err);
      return null;
    }
  });

  return nextId;
};

module.exports = new SequenceGenerator();
