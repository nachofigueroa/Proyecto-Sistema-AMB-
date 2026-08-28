function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    next(); // tiene sesión → continuar
  } else {
    res.redirect('/login.html'); // no tiene sesión → al login
  }
}

module.exports = { requireAuth };