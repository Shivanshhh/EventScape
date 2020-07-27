const express = require('express');
const Ev = require('../models/eventschema');
const router = express.Router();

router.get('/home', async (req, res) => {
  var event_date = [];
  var event_pics = [];
  var event_names = [];
  var event_links = [];
  var event_types = [];

  var alldata = await Ev.Event.find({});
  alldata.forEach(async (doc) => {
    q = new Date(doc.eventdate).getTime();
    if ((Date.now() - q)> 0 ){
     await Ev.Event.findByIdAndDelete(doc._id);
     }
     else{
    event_date.push(doc.eventdate);}
  });
  console.log(event_date);

  function sortDates(dates) {
    return dates.map(function (date) {
      return new Date(date).getTime();
    }).sort(function (a, b) {
      return a - b;
    })
  };
  console.log(alldata);
  var orderedDates = sortDates(event_date);
  console.log(orderedDates);
  var nextDate = orderedDates.filter(function (date) {
    return (Date.now() - date) < 0;
  });

  console.log(nextDate);
  

  console.log(alldata)
  var i = 0;
  for (i = 0; i < 6; i++) {
    q = 0;
    alldata.forEach(function (doc) {
      console.log(doc)
      const d = new Date(doc.eventdate).getTime();
      console.log('doc' + d)
      console.log('date' + nextDate[i])
      if (d == nextDate[i] && q != 1) {
        event_pics.push(doc.image);
        event_names.push(doc.eventname);
        event_links.push(doc.eventlink);
        event_types.push(doc.eventtype);
        delete alldata[doc];
        q = 1;
      }
    })
  };
  var tevent_date = [];
  var tevent_pics = [];
  var tevent_names = [];
  var tevent_links = [];
  var tevent_types = [];

  var talldata = await Ev.Event.find({eventtech: "tech"});
  talldata.forEach(async (doc) => {
    tevent_date.push(doc.eventdate);
  });
  console.log(tevent_date);

  console.log(talldata);
  var torderedDates = sortDates(tevent_date);

  var tnextDate = torderedDates.filter(function (date) {
    return (Date.now() - date) < 0;
  });

  

  var i = 0;
  for (i = 0; i < 6; i++) {
    q = 0;
    talldata.forEach(function (doc) {
      console.log(doc)
      const d = new Date(doc.eventdate).getTime();
      console.log('doc' + d)
      console.log('date' + tnextDate[i])
      if (d == tnextDate[i] && q != 1) {
        tevent_pics.push(doc.image);
        tevent_names.push(doc.eventname);
        tevent_links.push(doc.eventlink);
        tevent_types.push(doc.eventtype);
        delete talldata[doc];
        q = 1;
      }
    })
  };
  var nevent_date = [];
  var nevent_pics = [];
  var nevent_names = [];
  var nevent_links = [];
  var nevent_types = [];

  var nalldata = await Ev.Event.find({eventtech: "nontech"});
  nalldata.forEach(async (doc) => {
    nevent_date.push(doc.eventdate);
  });
  console.log(nevent_date);

  console.log(nalldata);
  var norderedDates = sortDates(nevent_date);

  var nnextDate = norderedDates.filter(function (date) {
    return (Date.now() - date) < 0;
  });

  

  var i = 0;
  for (i = 0; i < 6; i++) {
    q = 0;
    nalldata.forEach(function (doc) {
      console.log(doc)
      const d = new Date(doc.eventdate).getTime();
      console.log('doc' + d)
      console.log('date' + nnextDate[i])
      if (d == nnextDate[i] && q != 1) {
        nevent_pics.push(doc.image);
        nevent_names.push(doc.eventname);
        nevent_links.push(doc.eventlink);
        nevent_types.push(doc.eventtype);
        delete nalldata[doc];
        q = 1;
      }
    })
  };
  // console.log(p);
  // console.log(event_pics);
  //console.log(event_pics[4])
  
  res.render('index.ejs', { image: event_pics, name: event_names, link: event_links, type: event_types,
    timage: tevent_pics, tname: tevent_names, tlink: tevent_links, ttype: tevent_types,
    nimage: nevent_pics, nname: nevent_names, nlink: nevent_links, ntype: event_types });

});

router.post('/home', async (req, res) => {
  const { event } = req.body;
  res.redirect(`/search/${event}`);
});

module.exports= router;
