//Set up Dependencies
const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

router.get('/', (req, res) => {
  res.redirect('/burgers');
});

router.get('/burgers', (req, res) => {
  burger.all(burger_data => {
    res.render('index', { burger_data });
  });
});

router.post('/burgers/create', (req, res) => {
  if (req.body.burger_name == '') {
    console.log('No burger name entered');
    res.redirect('/');
  } else {
    burger.create(req.body.burger_name, result => {
      console.log(result);
      res.redirect('/');
    });
  }
});

router.put('/burgers/update', (req, res) => {
  burger.update(req.body.burger_id, result => {
    console.log(result);
    res.redirect('/');
  });
});

module.exports = router;
