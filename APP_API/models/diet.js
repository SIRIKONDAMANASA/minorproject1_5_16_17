const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dietSchema = new mongoose.Schema({
    trainer_id : {
        type: Schema.Types.ObjectId, 
        ref:'trainerModel' 
    },
    trainee_id : {
        type: Schema.Types.ObjectId, 
        ref:'User' 
    },
    breakfast : {
        type: String
    },
    lunch : {
        type: String
    },
    dinner : {
        type: String
    }
});

//create indexes
module.exports = mongoose.model('Diets', dietSchema, 'diets');