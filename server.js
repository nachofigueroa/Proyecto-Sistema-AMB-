const express = require("express");
const path = require("path");
const conexion = require("./db");

const app = express();

// Middlewares necesarios para recibir datos en req.body (JSON y formularios)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Puerto ajustado para el Grupo 7 (Puerto 3007 o 3005 según prefieras)
const PORT = 3007;

// Ruta de prueba
app.get("/Apellido", (req, res) => {
    conexion.query("SELECT * FROM usuarios", (err, results) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).send("Error en la consulta");
            return;
        }
        res.json(results);
    });
});

// Ruta de Login
app.post("/login", (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.json({ ok: false, mensaje: "Faltan datos" });
    }

    // Consulta a la tabla usuarios
    const query = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";
    conexion.query(query, [usuario, password], (err, results) => {
        if (err) {
            console.error("Error en la consulta de login:", err);
            return res.status(500).json({ ok: false, mensaje: "Error en el servidor" });
        }

        if (results.length > 0) {
            res.json({ ok: true, mensaje: "Login exitoso", usuario: results[0] });
        } else {
            res.json({ ok: false, mensaje: "Usuario o contraseña incorrectos" });
        }
    });
});

// Servidor escuchando (siempre al final del archivo)
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
