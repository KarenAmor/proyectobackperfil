const express = require('express');
const router = express.Router();
const autenticacionMiddleware = require('../middleware/autenticacionMiddleware');
const { getTarjetas, aprobarTarjeta, eliminarTarjeta } = require('../controllers/aprobarTarjetasController');

// Ruta para la funcionalidad de aprobación de tarjetas
router.get('/', autenticacionMiddleware, getTarjetas);
router.post('/', autenticacionMiddleware, aprobarTarjeta);
router.delete('/:id', autenticacionMiddleware, eliminarTarjeta);

module.exports = router;