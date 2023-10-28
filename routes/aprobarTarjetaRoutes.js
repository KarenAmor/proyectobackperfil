const express = require('express');
const router = express.Router();
const autenticacionMiddleware = require('../middleware/autenticacionMiddleware');
const { aprobarTarjeta } = require('../controllers/aprobarTarjetasController');

// Ruta para la funcionalidad de aprobación de tarjetas
router.post('/', autenticacionMiddleware, aprobarTarjeta);

module.exports = router;