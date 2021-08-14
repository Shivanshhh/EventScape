const express = require('express');
const router = express.Router();
const session= require('express-session');
const Ev = require('../models/eventschema');
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 

const redirectLogin = (req, res, next) => {
    next();
}; 
  
var storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null, './routes/uploads') 
  }, 
  filename: (req, file, cb) => { 
    cb(null, file.fieldname + '-' + Date.now())  
  } 
}); 

var upload = multer({ storage: storage }); 

router.get('/', redirectLogin, (req, res) => {
  res.render('add-event');
});

router.post('/', upload.single('image'), async (req,res) =>{
  var eventname= req.body.eventname;
  const event= new Ev.Event({
      eventname: req.body.eventname,
      fees: req.body.fees,
      eventtype: req.body.type,
      eventvenue: req.body.eventvenue,
      eventdate: req.body.eventdate,
      eventtime: req.body.eventtime,
      eventlink: req.body.eventlink,
      image: {
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
          contentType: 'image/png',
      },
      eventtech: req.body.technical,
      eventdescription:req.body.eventdescription,
      });
      const event1= new Ev.Event1({
        eventname: req.body.eventname,
        fees: req.body.fees,
        eventtype: req.body.type,
        eventvenue: req.body.eventvenue,
        eventdate: req.body.eventdate,
        eventtime: req.body.eventtime,
        eventlink: req.body.eventlink,
        image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/png',
        },
        eventtech: req.body.technical,
        eventdescription:req.body.eventdescription,
        });

await Ev.Event.create(event);
await Ev.Event1.create(event1);
console.log("db working");
res.redirect(`/event/${eventname}`);
});

module.exports=router;

