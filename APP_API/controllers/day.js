const mongoose = require("mongoose");
const trainerAvailibility = mongoose.model("Traineravailability");

const daysAvailabilityByTrainerDetail = function(req, res){
    if (!req.params.dayid) {
        res.status(404).json({
          message: "Not found, User is not login",
        });
        return;
      }
      trainerAvailibility
      .find({day_id : req.params.dayid})
      .populate({
          path: 'trainer_id',
          populate: {
              path: 'user_id'
          }
        })
      .populate('day_id')
      .exec((err, data) => {
        if (err) {
            res
            .status(400)
            .json(err);
        } 
        else {
        res
            .status(200)
            .json({
                schedule: data,
                message: 'Trainers schedule by day.'
            });
        }
      });
}

module.exports = {
    daysAvailabilityByTrainerDetail}



