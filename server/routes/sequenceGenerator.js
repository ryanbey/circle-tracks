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
    sequenceId = Sequence._id;
    maxTrackId = Sequence.maxTrackId;
  });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "tracks":
      maxTrackId++;
      updateObject = { maxTrackId: maxTrackId };
      nextId = maxTrackId;
      break;
    default:
      return -1;
  }

  Sequence.update({ _id: sequenceId }, { $set: updateObject }, function (err) {
    if (err) {
      console.log("nextId error = " + err);
      return null;
    }
  });

  return nextId;
};

module.exports = new SequenceGenerator();
