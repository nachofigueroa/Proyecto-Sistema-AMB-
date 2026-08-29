const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "10.0.9.40",
    user: "root",
    password: "1234",
    database: "Grupo7_Planificaciones",
    port: 3306
});

conexion.connect((err) => {
    if (err) {
        console.error("error de conexion:", err);
        return;
    }
    console.log("conectado a la base de datos");
});

module.exports = conexion;
