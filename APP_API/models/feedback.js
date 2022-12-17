const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const feedbackSchema = new mongoose.Schema({
    trainer_id : {
        type: Schema.Types.ObjectId, 
        ref:'trainerModel' 
    },
    trainee_id : {
        type: Schema.Types.ObjectId, 
        ref:'User' 
    },
    rating : {
        type: Number,
        min: 0,
        max: 5
    },
    review : {
        type: String
    }
});

//create indexes
module.exports = mongoose.model('Feedbacks', feedbackSchema, 'feedbacks');



