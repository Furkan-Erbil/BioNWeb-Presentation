// controller/controller.js
var PatientSchema = require('../model/model');

exports.rootlogger = (req, res, next) => {
  console.log('Patient information:');
  next()
}
  
exports.addLogger = (req, res, next) => {
  console.log('new Patient arrived');
  next()
}

exports.deleteLogger = (req, res, next) => {
  console.log('a Patient is cured');
  next()
}


exports.markLogger = (req, res, next) => {
  console.log('a Patient is vaccinated');
  next()
}

exports.routerLogger = (req, res, next) => {
  console.log('router handles');
  next()
}

// route handling functions
exports.getAllPatients = (req, res, next) => {
  PatientSchema.find({}, (err, patients) => {
    res.render('index', {Patients: patients, title: 'Patients-List' });
  });
}


exports.addPatient = (req, res, next) => {
  let PatientName = req.body.PatientName
  let PatientAge = req.body.PatientAge
  let PatientVirus = req.body.PatientVirus

  PatientSchema.create({name: PatientName, age: PatientAge, virus: PatientVirus, status: false}, (err, document ) => {
    console.log(document);
    res.send({ id: document._id})
  });
  
}

exports.deletePatient = (req, res, next) => {
  let id = req.body.id
  //mongoose function
  PatientSchema.deleteOne({_id: id}, (err, doc) => {
    res.send({success: true})
  });
}

exports.markPatient = (req, res, next) => {
  let id = req.body.id
  PatientSchema.findOne({_id: id}).exec((err, doc) => {
    PatientSchema.findOneAndUpdate({_id: id}, {status: !doc.status}, (err, doc) => {
      res.send({success: true})
    });
  }) 
}
