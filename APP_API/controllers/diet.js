const mongoose = require("mongoose");
const dietA = mongoose.model("Diets");

//Add trainer availability
const dietCreate = function (req, res) {
  const userId = req.user;
  dietA.create(
    {
      
      trainer_id: userId,
      trainee_id: req.body.trainee,
      breakfast: req.body.breakfast,
      lunch: req.body.lunch,
      dinner:req.body.dinner
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
const viewdiet = function (req, res) {
  
  const userId = req.user;
  console.log(userId);
  if (!userId) {
    res.status(404).json({
      message: "Not found, TraineeId is required",
    });
    return;
  }
  dietA.find({trainee_id : userId})
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

const viewdietAll = function(req,res){
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
      
      dietA
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
  dietCreate,
  viewdiet,
  viewdietAll
};
