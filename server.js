
var express = require('express');
var expressValidator = require('express-validator');
var ejs = require('ejs');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var passport = require('passport'); // Express-compatible authentication middleware for Node.js.
var social = require('./app/passport/passport')(app, passport); // Import passport.js End Points/API
var multer  = require('multer');



var Login = require('./app/routes/login.server.routes');  
var Users = require('./app/routes/user.server.routes');  
var Country = require('./app/routes/country.server.routes');
var State = require('./app/routes/state.server.routes');
var City = require('./app/routes/city.server.routes');
var Company = require('./app/routes/company.server.routes');
var Order = require('./app/routes/order.server.routes');
var Vehicle = require('./app/routes/vehicle.server.routes');
var Appointment = require('./app/routes/appointment.server.routes');
var Checklist = require('./app/routes/checklist.server.routes');
var Tax = require('./app/routes/tax.server.routes');
var storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage });

app.post('/uploadFile', upload.single('file'), function(req, res){
    //console.log('Uploade Successful ', req.file, req.body);
    var myFile = req.file;
    var newName = myFile.filename;
    console.log(myFile);
    res.send(myFile);
});


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static(__dirname + '/public'));
//app.use(session({secret: 'secret', saveUninitialized: true, resave: true }));
app.use('/', Login);
app.use('/', Users);
app.use('/', Country);
app.use('/', State);
app.use('/', City);
app.use('/', Company);
app.use('/', Order);
app.use('/', Vehicle);
app.use('/', Appointment);
app.use('/', Checklist);
app.use('/', Tax);

var db = "mongodb://test:test123@ds113650.mlab.com:13650/autoworkshop";

  mongoose.connect(db, function(err, response){
    if(err){
      console.log(' Failed to connected to ' + db);
    }
    else{
      console.log(' Connected to ' + db);
    }
  });

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
  
app.listen(port, function(){
  console.log('Running the server on port:'+ port);
});

