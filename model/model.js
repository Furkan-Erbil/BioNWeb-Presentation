// model/model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patient = new Schema({
  name: String, // String is shorthand for {type: String}
  age: Number,
  virus: String,
  status: Boolean
  
});

module.exports = mongoose.model("PatientSchema", patient);

