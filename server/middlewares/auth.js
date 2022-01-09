const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');

/* Verifica que está logeado */
const verificaToken = (req, res, next) => {
  jwt.verify(req.cookies.session, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    };
    req.usuari = decoded.usuari;
    next();
  })
};

let denyLogin = (req, res, next) => {
  jwt.verify(req.cookies.session, process.env.SEED, (err, decoded) => {
    if (err) {
      return next();
    };
    res.redirect("/");
  })
};

module.exports = { verificaToken, denyLogin }