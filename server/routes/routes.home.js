const { verificaToken } = require("../middlewares/auth");
const cookieParser = require("cookie-parser");
const express = require("express");
const router = express.Router();
router.use(cookieParser())

router.get('/home', verificaToken, (req, res) => {
  res.render('home', { header: { ok: true, home: true } });
});

module.exports = router;
