const express = require('express');
const router = express.Router();
const session= require('express-session');
const User = require('../models/userschema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => 
{
    res.render('login');
});

router.post('/', async (req, res) => {
    const user1 = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          confirmpassword: req.body.confirmpassword,
    });
    user1.password = await bcrypt.hash(user1.password, saltRounds);
    await User.create(user1);
    res.redirect('/register');
});

router.post('/login', async (req, res) => {
    const email1 = req.body.email;
    const password1 = req.body.password;
    const f = await User.findOne({ email: email1 });
    if (f) {
      if (bcrypt.compareSync(password1, f.password)) {
        req.session.userId = f.email;
        res.redirect('/addevent');
      } else {
        res.send( 'wrong-password' );
      }
    } else {
      res.redirect('/addevent');
    }
  });

module.exports= router;
