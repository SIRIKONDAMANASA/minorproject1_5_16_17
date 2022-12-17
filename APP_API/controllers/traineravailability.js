const mongoose = require("mongoose");
const trainerAvailibility = mongoose.model("Traineravailability");
const trainerModel = mongoose.model('trainerModel');

//Add trainer availability
const trainerAvailabilityCreate =  function (req, res) {
  const userId = req.user;

console.log(req.body);

   trainerModel
      .find({user_id : userId})
      .exec((err,Trainer)=>{    

        console.log(!Trainer[0]);

      if(Trainer[0]){
        const trainer_id = Trainer[0]._id.toString();
      
        trainerAvailibility.create(
            {
              trainer_id: trainer_id,
              day_id: req.body.day_id,
              start_time: req.body.start_time,
              end_time: req.body.end_time,
            },
            (err, data) => {
              console.log("data= " + data);
              if (err) {
                res.status(400).json(err);
              } else {
                res.status(200).json(data);
              }
            }
          );
      }else{
        res.status(400).json({
          Message: "Please create your trainer profile"
        });
      }
     
  }); 

};

//Get trainer Availability
const trainerAvailabilityDetail = function (req, res) {
  const userId = req.user;
  if (!userId) {
    res.status(404).json({
      message: "Not found, id is required",
    });
    return;
  }else{
    trainerModel
      .find({user_id : userId})
      .exec((err,Trainer)=>{    
      
      const trainer_id = Trainer[0]._id.toString();


      trainerAvailibility
      .find({trainer_id : trainer_id})
      .populate('day_id')
      .exec((err, data) => {
        if (!data) {
          res.status(404).json({
            message: "Trainer not found",
          });
          return;
        } else if (err) {
          res.status(400).json(err);
          return;
        }
        res.status(200).json(data);
      });
    });
  }
  
};

//Update trainer Availibity
const trainerAvailabilityUpdate = function (req, res) {
  if (!req.params.availableid) {
    res.status(404).json({
      message: "Not found, User is not login",
    });
    return;
  }
  trainerAvailibility.findById(req.params.availableid)
  .exec((err, data) => {
      if (!data) {
        res.status(404).json({
          message: "Trainer Availablity not found",
        });
        return;
      } else if (err) {
        res.status(400).json(err);
        return;
      }
      data.day_id = req.body.day_id;
      data.start_time = req.body.start_time;
      data.end_time = req.body.end_time;
      data.save((err, data) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(data);
      }
    });
  });
};

//delete trainer availability
const trainerAvailabilityDelete = function (req, res) {
  trainerAvailibility.findByIdAndRemove(req.params.availableid).exec((err, data) => {
    if (!data) {
      res.status(404).json({
        message: "Availibility not found",
      });
      return;
    } else if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json({
      message: "Your Availibility is Deleted",
    });
  });
};


module.exports = {
  trainerAvailabilityCreate,
  trainerAvailabilityDetail,
  trainerAvailabilityUpdate,
  trainerAvailabilityDelete
};
