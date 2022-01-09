const express = require("express");
const User = require("../models/user");
const app = express();
const bcrypt = require("bcryptjs");

/* get */
app.get("/user", (req, res) => {
  User.find({}, "username email role").exec((err, usuaris) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      usuaris,
    });
  });
});

/* put */
app.put("/user", (req, res) => {
  console.log(1);
  let body = req.body;
  let user = new User({
    username: body.username,
    password: bcrypt.hashSync(body.password, 10),
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      user: userDB,
    });
  });
});

/* delete */
app.delete("/user", (req, res) => {
  User.deleteOne({ _id: req.body.id }, (err) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    };

    res.json({
      ok: true,
    });
  });
})
module.exports = app;
