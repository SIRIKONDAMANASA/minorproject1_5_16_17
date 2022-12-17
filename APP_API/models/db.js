//that we require mongoose in this file
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/gym2DBex';
mongoose.connect(dbURI);

// connected , error ,diconnected are connection events

mongoose.connection.on('connected',function()
{
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err=>{
    console.log('Mongoose connection eror:',err);
});
mongoose.connection.on('disconnected',()=>{
    console.log("Mongoose disconnected");
});


const gracefulShutdown = (msg,callback)=>{
    mongoose.connection.close( ()=>{
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

// nodemon changes
process.once('SIGUSR2',()=>{

    gracefulShutdown('nodemon restart',()=>{
        process.kill(process.pid,'SIGUSR2');
    });
});

// for app termination
process.on('SIGINT',()=>{
    gracefulShutdown('app termination',()=>{
        process.exit(0);
    });
});

// for heroku app termination
process.on('SIGTERM',()=>{
    gracefulShutdown('Heroku app termination',()=>{
        process.exit(0);
    });
});
module.exports = {
    mongoURI: dbURI,
    connect: mongoose.createConnection(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
};

require('./trainers');
require('./user'); 
require('./traineravailability');
require('./feedback');
require('./day');
require('./diet');
require('./exercise')
