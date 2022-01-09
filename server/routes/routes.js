const express = require("express");
const router = express.Router();

router.use(require('./routes.home'));
router.use(require('./routes.workout'));
router.use(require('./routes.signin'));
router.use(require('./routes.users'));

router.get('*', function (req, res) {
  res.redirect("/home");
});

module.exports = router;
