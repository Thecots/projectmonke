const express = require("express");
const path = require('path');
const router = express.Router();
const { verificaToken, denyLogin } = require("../middlewares/auth");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get('/login', denyLogin, (req, res) => {
  res.render('signin', { signin: true })
})

router.post('/login', denyLogin, (req, res) => {
  try {
    if (!req.body.username || !req.body.password) return res.json({ ok: false });
    User.findOne({ username: req.body.username }, (err, result) => {
      if (err) return res.json({ ok: false });
      if (!result) return res.json({ ok: false });
      if (!bcrypt.compareSync(req.body.password, result.password)) return res.json({ ok: false });
      let token = jwt.sign(
        {
          user: result.username,
        },
        process.env.SEED,
        {
          expiresIn: process.env.CADUCITAT_TOKEN,
        }
      )
      return res.json({
        ok: true,
        token
      })
    });
  } catch (error) {
    res.send({ ok: false });
  }
})

module.exports = router;
