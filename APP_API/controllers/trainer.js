const { json } = require('body-parser');
const mongoose = require('mongoose');
const trainerModel = mongoose.model('trainerModel');
const mongoConfig = require('../models/db');
const connect = mongoConfig.connect;
const fs = require('fs');
var path = require('path');

const trainerCreate = async function(req,res)
{
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
        const document_file = req.files;
        // check if photos are available
        if (!document_file) {
            res.status(400).send({
                status: false,
                data: 'No document is selected.'
            });
        } else {

            // converting string into an array. 
            var getskills = req.body.skills;
            
            if(getskills.indexOf(',') >= 0){
                var skills = getskills.split(",");
            }else{
                var skills = getskills;
            }
        
            trainerModel.create(
                    {
                        user_id:userId,
                        approve: req.body.approve,
                        description:req.body.description,
                        skills:skills,
                        experience: req.body.experience,
                        age:req.body.age
                    },(err,trainercreated)=>{
                        if (err) {
                            res
                            .status(400)
                            .json(err);
                        } 
                        else {
                        res
                            .status(200)
                            .json({
                                tranier: trainercreated,
                                message: 'Documents are uploaded.'
                            });
                        }
                });
        }
    }
};



const trainersReadAll = function(req,res){
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
        
        trainerModel
        .find({'approve':'Yes'})
        .populate({'path':'user_id'})
        .exec((err,allTrainers)=>{
            
            if(!allTrainers)
            {
                res
                    .status(500)
                    .json({"message":"No trainers found."});
                    return;
            }
            else
            {
                res
                  .status(200)
                  .json(allTrainers)
            }
        });
        
    }

};
const trainersReadOne = function(req,res){
        
        if(req.params.trainerid)
        {
            trainerModel
            .findById(req.params.trainerid)
            .populate({'path':'user_id'})
            //.select('decription skill')  if you want to show specific fields
            .exec((err,trainer)=>{     //trainer ---- The data which we are fetching from database. it is an object
                if(!trainer)
                {
                    res
                        .status(404)
                        .json({"message":"trainer id is not found."});
                    return;
                }
                else if(err)
                {
                    res
                        .status(404)
                        .json(err)
                    return;
                }
                else
                {
                    res
                    .status(200)
                    .json({trainer}) 
                }
            
            });
        }
        else
        {
            res
                .status(404)
                .json({
                    "message":"No trainer id in request."
                })
        }

};


const trainersUpdateOne = function(req,res){

    if(req.params && req.params.trainerid)
    {
        trainerModel
        .findById(req.params.trainerid)
        .exec((err,trainer)=>{
            if(!trainer)
            {
                res
                    .status(404)
                    .json({"message":"id not found"});
                    return;
            }
            else if(err)
            {
                res
                    .status(404)
                    .json(err);
                    return;
            }

            else
            {
                var getskills = req.body.skills;
                
                if(getskills.indexOf(',') >= 0){
                    var skills = getskills.split(",");
                }else{
                    var skills = getskills;
                }

                trainer.experience=req.body.experience;
                trainer.skills=skills;
                trainer.description=req.body.description;
                trainer.age=req.body.age;
                trainer.document_file=req.body.document_file;

                trainer.save((err,trainer) => {
                    if(err)
                    {
                        res
                            .status(404)
                            .json(err)
                        return;
                    }
                    else
                    {
                        res
                        .status(200)
                        .json(trainer) 
                    }
                });

            }
           
        })

    }
  
};

// not sure if i need to keep this or not.

const trainersDeleteOne = function(req,res){
    if(req.params && req.params.trainerid)
    {
        trainerModel
        .findByIdAndRemove(req.params.trainerid)
        .exec((err,trainer)=>{
            if(!trainer)
            {
                res
                    .status(404)
                    .json({"message":"id is not present which you want to delete"});
            }
            else
            {
                res
                .status(200)
                .json({"message":"Record has been deleted"});
            }
            
        })
    }
    
};

// *******************************************************All Admin API controller methods *********************************


// this will get all the request which are not approve yet.
const checkPendingTrainers = function(req,res)
{

    trainerModel
    // it runs asynchronous. so after checking the approve status it will run this method.
        .find({approve:'No'})
        .exec((err,allTrainerWithNoStatus)=>{
            if(!allTrainerWithNoStatus)
            {
                res
                    .status(200)
                    .json({"message":"No pending requests to approve it."})
                    return;
            }
            else
            {
                res
                .status(200)
                .json(allTrainerWithNoStatus);
            }
           
        })
}

const approveTrainerProfile = function(req,res){

    if(req.params.trainerid)
    {
        trainerModel
            .findById(req.params.trainerid)
            .exec((err,trainer)=>{
                trainer.approve = req.body.approve;
            trainer.save(function(err,data){
                res
                    .status(200)
                    .json(data);
            })
            })


    }



};

module.exports=
{
    trainerCreate,
    trainersReadAll,
    trainersReadOne,
    trainersUpdateOne,
    trainersDeleteOne,
    checkPendingTrainers,
    approveTrainerProfile
}