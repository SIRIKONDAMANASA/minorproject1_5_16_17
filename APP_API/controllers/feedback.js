const mongoose = require("mongoose");
const userFeedbacks = mongoose.model("Feedbacks");

//Add trainer availability
const feedbackCreate = function (req, res) {
  const userId = req.user;
  userFeedbacks.create(
    {
      trainer_id: req.body.trainer_id,
      trainee_id: userId,
      rating: req.body.rating,
      review: req.body.review,
    },
    (err, data) => {
      console.log("data= " + data);
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(data);
      }
    }
  );
};

//Get trainer Availability
const feedbackList = function (req, res) {
  if (!req.params.trainerid) {
    res.status(404).json({
      message: "Not found, TrainerId is required",
    });
    return;
  }
  userFeedbacks.find({trainer_id : req.params.trainerid})
  .exec((err, data) => {
    if (!data) {
      res.status(404).json({
        message: "Trainer id not found",
      });
      return;
    } else if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(data);
  });
};

//Delete trainer Availibity
const feedbackDelete = function (req, res) {
  userFeedbacks.findByIdAndRemove(req.params.feedbackid).exec((err, data) => {
    if (!data) {
      res.status(404).json({
        message: "Feedback id not found",
      });
      return;
    } else if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json({
      message: "Feedback Deleted",
    });
  });
};

module.exports = {
  feedbackCreate,
  feedbackList,
  feedbackDelete,
};
