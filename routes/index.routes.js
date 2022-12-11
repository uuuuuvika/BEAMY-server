const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");


router.get('/user/:userId', (req, res, next) => {

  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: 'You suck!' });
    return;
  }
  User.findById({_id: userId})
    .then(foundUser => res.status(200).json(foundUser))
    .catch(error => res.json(error));
});

module.exports = router;