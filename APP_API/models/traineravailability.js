const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const trainerAvailabilitySchema = new mongoose.Schema({
    trainer_id : { 
        type: Schema.Types.ObjectId, 
        ref:'trainerModel' 
    },
    day_id : {
        type: Schema.Types.ObjectId, 
        ref:'Days'
    },
    start_time : {
        type: String,
    },
    end_time : {
        type: String,
    }
});

//create indexes
module.exports = mongoose.model('Traineravailability', trainerAvailabilitySchema, 'available_time');



