const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const daySchema = new mongoose.Schema({
    day_name :{
        type: String
    }
});

//create indexes
module.exports = mongoose.model('Days', daySchema, 'days');



