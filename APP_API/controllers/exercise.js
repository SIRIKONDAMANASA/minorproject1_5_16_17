const mongoose = require("mongoose");
const exeA = mongoose.model("Exercises");

//Add trainer availability
const exeCreate = function (req, res) {
  const userId = req.user;
  exeA.create(
    {
      
      trainer_id: userId,
      trainee_id: req.body.trainee,
      MrngExercises: req.body.mrngexs,
      EvngExercises: req.body.evngexs,
      
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
const viewExe = function (req, res) {
  
  const userId = req.user;
  console.log(userId);
  if (!userId) {
    res.status(404).json({
      message: "Not found, TraineeId is required",
    });
    return;
  }
  exeA.find({trainee_id : userId})
  .exec((err, data) => {
    if (!data) {
      res.status(404).json({
        message: "Trainee id not found",
      });
      return;
    } else if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json({
      user: data
  });
  });
};

const viewexeAll = function(req,res){
  const userId = req.user;
 
  if(!userId){
      res
      .status(404)
      .json({
          "message" : "Please login again!!"
      });
      return;
  }
  else
  {
      
      exeA
      .find({trainee_id : userId})
      .populate({'path':'trainee_id'})
      .exec((err,allDiets)=>{
          
          if(!allDiets)
          {
              res
                  .status(500)
                  .json({"message":"No Diets found."});
                  return;
          }
          else
          {
              res
                .status(200)
                .json(allDiets)
          }
      });
      
  }

};


module.exports = {
    exeCreate,
    viewExe,
  viewexeAll
};
