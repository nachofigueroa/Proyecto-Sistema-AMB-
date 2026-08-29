// routes/planificaciones.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// READ: Obtener todas las planificaciones
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM planificaciones');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE: Crear una nueva planificación (Alta)
router.post('/', async (req, res) => {
    const { titulo, materia, descripcion, fecha_entrega, estado, usuario_id } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO planificaciones 
            (titulo, materia, descripcion, fecha_entrega, estado, usuario_id) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [titulo, materia, descripcion, fecha_entrega, estado || 'Pendiente', usuario_id]
        );
        res.json({ id: result.insertId, message: 'Planificación creada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE: Modificar una planificación (Modificación)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, materia, descripcion, fecha_entrega, estado } = req.body;
    try {
        await db.query(
            `UPDATE planificaciones SET 
            titulo = ?, materia = ?, descripcion = ?, fecha_entrega = ?, estado = ? 
            WHERE id = ?`,
            [titulo, materia, descripcion, fecha_entrega, estado, id]
        );
        res.json({ message: 'Planificación actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE: Eliminar una planificación (Baja)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM planificaciones WHERE id = ?', [id]);
        res.json({ message: 'Planificación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
