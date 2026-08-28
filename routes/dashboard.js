const express        = require('express');
const { requireAuth } = require('../middleware/auth');
const router          = express.Router();

// requireAuth se ejecuta primero → si no hay sesión, redirige al login
router.get('/', requireAuth, (req, res) => {
  res.json({
    mensaje: `Bienvenido, ${req.session.usuario}!`,
    rol: req.session.rol
  });
});

module.exports = router;