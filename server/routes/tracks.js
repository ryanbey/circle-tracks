var express = require("express");
var router = express.Router();
module.exports = router;
const sequenceGenerator = require("./sequenceGenerator");
const Track = require("../models/track");

// Get all tracks
router.get("/", (req, res, next) => {
  Track.find()
    .then((tracks) => {
      res.status(200).json({
        message: "All Tracks fetched successfully!",
        tracks: tracks,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

// Get one track by id
router.get("/:id", (req, res, next) => {
  Track.findOne({ id: req.params.id })
    .then((track) => {
      res.status(200).json({
        message: "Track fetched successfully!",
        track: track,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

// Add one track
router.post("/", (req, res, next) => {
  const maxTrackId = sequenceGenerator.nextId("tracks");
  const track = new Track({
    id: maxTrackId,
    name: req.body.name,
    built: req.body.built,
    length: req.body.length,
    surface: req.body.surface,
    turns: req.body.turns,
    banking: req.body.banking,
    capacity: req.body.capacity,
    mapUrl: req.body.mapUrl,
    imageUrl: req.body.imageUrl,
  });

  track
    .save()
    .then((newTrack) => {
      res.status(201).json({
        message: "Track added successfully",
        track: newTrack,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

// Edit one track
router.put("/:id", (req, res, next) => {
  Track.findOne({ id: req.params.id })
    .then((track) => {
      (track.name = req.body.name),
        (track.built = req.body.built),
        (track.length = req.body.length),
        (track.surface = req.body.surface),
        (track.turns = req.body.turns),
        (track.banking = req.body.banking),
        (track.capacity = req.body.capacity),
        (track.mapUrl = req.body.mapUrl),
        (track.imageUrl = req.body.imageUrl),
        Track.updateOne({ id: req.params.id }, track)
          .then((res) => {
            res.status(204).json({
              message: "Track updated successfully",
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "An error occurred",
              error: error,
            });
          });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Track not found.",
        error: { track: "Track not found" },
      });
    });
});

// Delete one track
router.delete("/:id", (req, res, next) => {
  Track.findOne({ id: req.params.id })
    .then((track) => {
      Track.deleteOne({ id: req.params.id })
        .then(() => {
          res.status(204).json({
            message: "Track deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Track not found.",
        error: { track: "Track not found" },
      });
    });
});
