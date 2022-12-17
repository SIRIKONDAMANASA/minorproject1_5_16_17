const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const _ = require('passport-local-mongoose');
const JWT_SECRET = 'sweat4FitAPI';
const trainerModel = mongoose.model('trainerModel');
const fetch = require('node-fetch');
const fs = require('fs');
var path = require('path');

const userLogin = async function(req, res){
 
    const email = req.body.email;
    console.log(email);
    let user = await User.findOne({email}) 
        
    if(!user)
    {
        res
        .status(400)
        .json({
            error: "Email invalid"
        });
        return;
    }
    else
    {
        const passwordCompare = await bcrypt.compare(req.body.password, user.password );
        if(!passwordCompare){
            res
            .status(404)
            .json({
                "Message": "Incorrect password"
            });
            return;
        }
        const data = {
            id: user.id
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res
        .status(200)
        .json({
            token: authToken,
            Message: "Succesfully Login"
        });
    }
};

const userRegister = async function(req, res){

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            mobile_no: req.body.mobile_no,
            password: secPass,
            role_id: req.body.role_id
          }, (err, userdata) => {
            if (err) {
                res
                .status(400)
                .json(err);
                return;
            } else {

                res
                .status(201)
                .json({
                    user: userdata
                });
            }
        });
};


const userProfile = async function(req, res){
    
    var trainer_id;
    const userid = req.user;
    
    if(!userid) {
        res
        .status(404)
        .json({
            "message" : "Not found, userid is required"
        });
        return;
    }
    else
    { 
        const user = User.findById(userid)
        .select("-password")
        .exec((err, userdata) => {
            if(err){
                res
                .status(404)
                .json(err);
                return;

            } else {
                trainerModel
                .find({user_id: userid})
                .exec((err,trainer)=>{
                   
                    if(trainer.length > 0)
                    {
                        trainer_id  = trainer[0]._id.toString();
                    }
                    else
                    {
                        trainer_id = null;
                    }
                    res
                    .status(200)
                    .json({
                        user: userdata,
                        trainer_id: trainer_id
                    });
                });
            }

        });
    
    }
      
}
const usersReadAll = function(req,res){
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
        
        User
        .find({role_id:2})
        .populate({'path':'_id'})
        .exec((err,allTrainees)=>{
            
            if(!allTrainees)
            {
                res
                    .status(500)
                    .json({"message":"No trainees found."});
                    return;
            }
            else
            {
                res
                  .status(200)
                  .json(allTrainees)
            }
        });
        
    }

};

const userProfileUpdate = function(req, res){
   
    const userId = req.user;
    var image_path;

    if(!userId) {
        res
        .status(404)
        .json({
            "message" : "Not found, userid is required"
        });
        return;
    }else{

         User.findById(userId)
        .exec((err, userdata) => {

            if(!userdata){
                res
                .status(404)
                .json({
                    "message" : "userid is not found"
                });
                return;
            } else if(err) {
                res
                .status(404)
                .json(err);
                return;
            }else{
                if(req.file != null){
                    const profile_image = req.file.path;
                    image_path = profile_image.split('public')[1];
                    userdata.profileImage = image_path;
                }
                
                userdata.firstname = req.body.firstname;
                userdata.lastname= req.body.lastname;
                userdata.gender = req.body.gender;
                userdata.mobile_no = req.body.mobile_no;
                userdata.save((err, userdata) => {
                        if(err){
                            res
                            .status(404)
                            .json(err);
                            return;
                        } else {
                            res
                            .status(200)
                            .json({
                                User: userdata,
                                Message: "Profile Image Uploaded"
                            });
                        }
                });
                
            }
        })
    }
};

const userDelete =  function(req, res){
    
    const userId = req.user;

    if(userId){
        User
        .findByIdAndRemove(userId)
        .exec ((err, userdata) => {
            if(err){
                res
                .status(404)
                .json(err);
                return;
            }
            res
            .status(200)
            .json({
                "message" : "User sucessfully deleted"
            });
        });
    } else {
        res
        .status(404)
        .json({
            "message" : "No userid"
        });
    }
}


const forgotPassword = async function(req, res){
    //Generate and set password reset token
    const passwordgenerate = generatePasswordReset();
    console.log(passwordgenerate);

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(passwordgenerate, salt);


    const email = req.body.email;

     User.find({'email': email}) 
    .exec((err, userdata) => {
        if(!userdata){
            res
            .status(404)
            .json({
                "message" : "Email invalid"
            });
            return;
        } else if(err) {
            res
            .status(404)
            .json(err);
            return;
        }
        console.log(userdata);

        userdata.password= secPass;
        userdata.save((err, userdata) => {

            // let link = "http://" + req.headers.host + "/api/auth/reset/" + user.resetPasswordToken;
            // const mailOptions = {
            //     to: email,
            //     from: process.env.FROM_EMAIL,
            //     subject: "Password change request",
            //     text: `Hi ${userdata.firstname} \n 
            // Please check your new Password. \n\n
            // ${passwordgenerate} \n\n
            // Please don't share and Login with this new password.\n`,
            // };

            // sgMail.send(mailOptions, (error, result) => {
                if (err) return res.status(500).json({message: err.message});

                res.status(200).json({
                    message: 'A reset email has been sent to ' + email + '.'});
            // });
        });
})
}

const generatePasswordReset = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_";
  
    for (var i = 0; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

const userFetch = function(req, res){
    
    const userId = req.params.id;

    User.findById(userId)
    .exec((err, userdata) => {
        res
        .json({
            password: userdata.password
        });       
    });
}

const resetPassword = async function(req, res){
    
    const userId = req.user;
    console.log(userId);

    const user = User.findById(userId);

    const url = '/userFetch/'+userId;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if(!userId) {
        res
        .status(404)
        .json({
            "message" : "Not found, userid is required"
        });
        return;
    }

    const passwordCompare = await bcrypt.compare(req.body.old_password, result.password );

    const new_password = req.body.new_password;
    const confirm_new_password = req.body.confirm_new_password;

    if(new_password == confirm_new_password)
    {
        const salt = await bcrypt.genSalt(10);
        const secNewPass = await bcrypt.hash(req.body.new_password, salt);  
        
        
        user.exec((err, userdata) => {
            if(!userdata){
                res
                .status(404)
                .json({
                    "message" : "userid is not found"
                });
                return;
            } else if(err) {
                res
                .status(404)
                .json(err);
                return;
            }
    
    
            if(!passwordCompare){
                res
                .status(400)
                .json({
                    error: "Your Current password is Incorrect."
                });
                return;
            }
            else{
                userdata.password= secNewPass;
                userdata.save((err, userdata) => {
                    if(err){
                        res
                        .status(404)
                        .json(err);
                    } else {
                        res
                        .status(200)
                        .json({
                            'message': 'Your Password is Updated.'
                        });
                    }
                });
            }
    
        })  
    }
    else
    {
        res
        .status(401)
        .json({
            "message" : "Unauthorized: Password Not Match"
        });
        return;
    }
}



module.exports = {
    userLogin,
    userRegister,
    userProfile,
    userProfileUpdate,
    userDelete,
    forgotPassword,
    resetPassword,
    generatePasswordReset,
    userFetch,
    usersReadAll
};