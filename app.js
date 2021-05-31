//Express Setup --------------------------------------------------------
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//to be able to implement static css files, images, etc. in public folder
app.use(express.static('public'));


//Setup View-Template ------------------------------------------
const path = require('path');
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "hbs");


//Logic in Controller vs app
const Controller = require('./controller/controller');
var rootLogger = function (req, res, next) {
    console.log('You did following action: ');
    next()
}
app.use(Controller.rootlogger);

app.get('/', (req, res, next) => {
    res.redirect('/Patients')
})

//Use Middelware functions from Router
const indexRouter = require('./routes/router');
app.use("/Patients", indexRouter);


/*Example Routing (+Middleware function)
app.get("/empty", function (req, res, next) {
    //console.log("message is coming");
    res.send("Good Job!");
})*/

// Setup Mongoose -----------------------------------------------------------
const mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost/toDoList';
mongoose.connect(mongoDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//to avoid warning
mongoose.set('useFindAndModify', false);


/* for Hello world example (show in the beginning of presentation)
app.use("/", (req, res) => {
  res.send('Welcome to your todo list');
})*/


app.listen(4000, () => {
    console.log("Server running on port 4000");
})
