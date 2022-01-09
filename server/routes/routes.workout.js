const { verificaToken } = require("../middlewares/auth");
const cookieParser = require("cookie-parser");
const express = require("express");
const router = express.Router();
router.use(cookieParser())

router.get('/workout/create', verificaToken, (req, res) => {
  res.render('createWorkout.hbs', { header: { ok: true }, workout: true });
});

module.exports = router;
