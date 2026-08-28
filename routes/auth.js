const express = require('express');
const router  = express.Router();
const db      = require('../db');

// POST /auth/login
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  // â†“ cada grupo adapta tabla y columnas a su DB
  const query = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ?';

  db.query(query, [usuario, password], (err, resultados) => {
    if (err) {
      return res.status(500).json({ error: 'Error del servidor' });
    }

    if (resultados.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseÃ±a incorrectos' });
    }

    // Login exitoso â†’ guardar en sesiÃ³n
    const user = resultados[0];
    req.session.userId  = user.id;
    req.session.usuario = user.usuario;
    req.session.rol     = user.rol;

    res.json({ success: true, redirect: '/dashboard.html' });
  });
});

// POST /auth/logout
router.post("/logout", (req, res) => {

  req.session.destroy(() => {

    res.json({
      success: true
    });

  });

});

module.exports = router;
router.post("/logout", (req, res) => {

    req.session.destroy();

    res.json({
        mensaje: "Sesion cerrada"
    });

});