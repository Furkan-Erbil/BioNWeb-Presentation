// router/router.js
var express = require('express');
const controller = require('../controller/controller');
var router = express.Router();

//router.use(controller.routerLogger);

//get all Patients from database
router.get('/' , controller.rootlogger , controller.getAllPatients);

//add a Patient to database
router.post('/add', controller.addLogger, controller.addPatient);

//delete a Patient from database
router.post('/delete', controller.deleteLogger, controller.deletePatient);

// mark a Patient as done
router.post('/changestatus', controller.markLogger, controller.markPatient);


module.exports = router;

