const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const exerciseSchema = new mongoose.Schema({
    trainer_id : {
        type: Schema.Types.ObjectId, 
        ref:'trainerModel' 
    },
    trainee_id : {
        type: Schema.Types.ObjectId, 
        ref:'User' 
    },
    MrngExercises : {
        type: String
    },
    EvngExercises : {
        type: String
    }
});

//create indexes
module.exports = mongoose.model('Exercises', exerciseSchema, 'exercises');