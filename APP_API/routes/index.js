var express = require('express');
var router = express.Router();
var authUser = require('../middleware/authUser')
const multer = require('multer');
var path = require('path');
const mongoConfig = require('../models/db');
var fs = require('fs');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  

const file_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var userId = req.user;
        var dir = './public/data/uploads/'+userId+'/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null,dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = '-' + Date.now() + '-'
        cb(null, file.originalname + uniqueSuffix + path.extname(file.originalname))

    }
  })

const profile_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var userId = req.user;
        var dir = './public/data/uploads/'+userId+'/profileImage/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null,dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = '-' + Date.now() + '-'
        cb(null, file.originalname + uniqueSuffix + path.extname(file.originalname))
    }
  })

const upload_files = multer({ storage: file_storage });

const profile_Image = multer({ storage: profile_storage });

// Users routes and controllers
var ctrlUsers = require('../controllers/user');

router.route('/register').post(ctrlUsers.userRegister);
router.post('/login',ctrlUsers.userLogin);
router.route('/gettrainees').get(authUser , ctrlUsers.usersReadAll)

router
    .route('/userprofile') 
    .get( authUser , ctrlUsers.userProfile)
    .post( authUser , profile_Image.single('profileImage'), ctrlUsers.userProfileUpdate); 
router.delete('/user', authUser , ctrlUsers.userDelete); 

router.post('/forgotPassword',ctrlUsers.forgotPassword);
router.get('/userFetch/:id', ctrlUsers.userFetch);
router.put('/reset-password', authUser, ctrlUsers.resetPassword);


// Trainer Routes and Controller
var ctrlTrainers = require('../controllers/trainer');
router
    .route('/trainers') // what request url is called
    .get(authUser, ctrlTrainers.trainersReadAll)
    .post(authUser, upload_files.array('document_file', 5), ctrlTrainers.trainerCreate);

router
    .route('/trainers/:trainerid')
    .get(authUser, ctrlTrainers.trainersReadOne)
    .put(authUser, ctrlTrainers.trainersUpdateOne)
    .delete(authUser, ctrlTrainers.trainersDeleteOne);


// presently working on this.    
router
    .route('/approveTrainer')
        .get(authUser, ctrlTrainers.checkPendingTrainers);
    
router
    .route('/approveTrainer/:trainerid')
        .put(authUser, ctrlTrainers.approveTrainerProfile);

//Availability Routes and Controller
var ctrlDaysAvailability = require('../controllers/day');
router.route('/schedule/:dayid').get(authUser, ctrlDaysAvailability.daysAvailabilityByTrainerDetail); // update trainer availability

//Availability Routes and Controller
var ctrlTrainerAvailability = require('../controllers/traineravailability');

router.route('/addtraineravailability').post(authUser, ctrlTrainerAvailability.trainerAvailabilityCreate); //creating trainer availability
router.route('/gettraineravailability').get(authUser, ctrlTrainerAvailability.trainerAvailabilityDetail);  //getting a list trainer availability
router.route('/updatetraineravailability/:availableid').put(authUser, ctrlTrainerAvailability.trainerAvailabilityUpdate); // update trainer availability
router.route('/deletetraineravailability/:availableid').delete(authUser, ctrlTrainerAvailability.trainerAvailabilityDelete); // delete feedback

//Feedback Routes and Controller
var ctrlFeedback = require('../controllers/feedback');

router.post('/addfeedback',authUser, ctrlFeedback.feedbackCreate); //creating feedback
router.get('/getfeedback/:trainerid',authUser, ctrlFeedback.feedbackList);  //getting feeedbacks
router.delete('/deletefeedback/:feedbackid', authUser, ctrlFeedback.feedbackDelete); // delete feedback

var ctrlDiet = require('../controllers/diet');

router.route('/adddiet').post(authUser, ctrlDiet.dietCreate); //creating feedback
router.route('/getdiet').get(authUser, ctrlDiet.viewdiet);  //getting feeedbacks
router.route('/getalldiet').get(authUser, ctrlDiet.viewdietAll);  //getting feeedbacks
 // delete feedback
var ctrlExe = require('../controllers/exercise');
router.route('/addexercise').post(authUser, ctrlExe.exeCreate); //creating feedback
router.route('/getexercise').get(authUser, ctrlExe.viewExe);  //getting feeedbacks
router.route('/getallexercises').get(authUser, ctrlExe.viewexeAll);  //getting feeedbacks

module.exports = router;