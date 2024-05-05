const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UserProgress = require("../models/progress");

// POST to create user progress
router.post("/", (req, res) => {
  const { userId, problemId, completed } = req.body;
  try {
    const newUserProgress = new UserProgress({
      _id: new mongoose.Types.ObjectId(),
      userId,
      problemId,
      completed,
    });
    newUserProgress
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json(newUserProgress);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/count/", (req, res) => {
  const userId = req.query.userId;
  UserProgress.find({ userId: userId })
    .exec()
    .then((docs) => {
      const response = {count: docs.length}
      console.log(response);
      res.status(200).json(response);

    })
    .catch((err) => {
      console.log(err);
    });
});

// GET to fetch user progress
router.get("/", (req, res) => {
  try {
    UserProgress.find()
      .select("_id userId problemId completed")
      .exec()
      .then((docs) => {
        const response = {
          progress: docs.map((doc) => {
            return {
              _id: doc._id,
              userId: doc.userId,
              problemId: doc.problemId,
              completed: doc.completed,
            };
          }),
        };
        console.log(response);
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: err,
    });
  }
});

router.delete("/", (req, res) => {
  const userId = req.query.userId;
  const problemId = req.query.problemId;

  UserProgress.deleteOne({ userId: userId, problemId: problemId })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
