const express = require('express');
const router = express.Router();
const autenticacionMiddleware = require('../middleware/autenticacionMiddleware');
const { getTarjetas, aprobarTarjeta, eliminarTarjeta } = require('../controllers/aprobarTarjetasController');
const aprobarTarjetaValidate = require('../controllers/aprobarTarjetasController.validate');

// Ruta para la funcionalidad de aprobación de tarjetas
router.get('/', autenticacionMiddleware, aprobarTarjetaValidate.getTarjetas, getTarjetas);
router.post('/', autenticacionMiddleware, aprobarTarjetaValidate.aprobarTarjeta, aprobarTarjeta);
router.delete('/:id', autenticacionMiddleware, aprobarTarjetaValidate.eliminarTarjeta,eliminarTarjeta);

module.exports = router;