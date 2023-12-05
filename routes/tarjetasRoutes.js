const express = require('express');
const router = express.Router();
const autenticacionMiddleware = require('../middleware/autenticacionMiddleware');
const { getTarjetas, aprobarTarjeta, eliminarTarjeta } = require('../controllers/tarjetasController');
const tarjetaValidate = require('../controllers/tarjetasController.validate');

// Ruta para la funcionalidad de aprobación de tarjetas
router.get('/', autenticacionMiddleware, tarjetaValidate.getTarjetas, getTarjetas);
router.post('/', autenticacionMiddleware, tarjetaValidate.aprobarTarjeta, aprobarTarjeta);
router.delete('/:id', autenticacionMiddleware, tarjetaValidate.eliminarTarjeta,eliminarTarjeta);

module.exports = router;