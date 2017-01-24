"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../src/users');
mongoose.Promise = require('bluebird');


router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if(err) { throw err; }
    else {
      res.send(data.skills);
    }
  })
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    hashedPassword: req.body.hashedPassword
  }, (err, data) => {
    if(err) {throw err};
    res.send(data);
  })
});

router.patch('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id,
    { $set: req.body }, { new: true },
    function (err, data) {
      if (err) throw err;
      res.send(data);
    });
});

router.delete('/:id', (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if(err) throw err;
    data.remove((err, data) => {
      if(err) throw err;
      res.send(data);
    })
  })
});


module.exports = router;
