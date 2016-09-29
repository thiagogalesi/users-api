var User = require('../models/user');
var express = require('express');
var logger = require('winston');
var util = require('util');

var router = express.Router();
// GET /users
// Get a list of users
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }

    res.json(users);
  });
});

router.put('/:id', function(req, res) {
  logger.info("Put called");
  logger.info(req.body);
  User.findOneAndUpdate({
      _id: req.params.id
    }, req.body, {},
    function(err, o) {
      logger.info('put cb');
      if (err) {
          return res.status(500).json({
              error: "Error updating user: " + err
          });
      }
      return res.json({'id': o._id});
    });
});

router.post('/', function(req, res) {
  logger.info("Post called");
  logger.info(req.body);
  logger.info(req.query);
  var udata = req.body;
  var u = User(udata);
  u.save(function(err, o, n) {
    if (err) {
      return res.status(500).json({
        error: "Error saving user: " + err
      });
    }
    res.json({'id': o._id});
  });
});

// GET /users/:id
// Get a user by ID
router.get('/:id', function(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });
});

module.exports = router;
