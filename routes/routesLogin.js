const express = require('express');
const router = express.Router();
const { iniciarSesion } = require('../controllers/loginController');

// Ruta para la funcionalidad de inicio de sesión
router.post('/', iniciarSesion);

module.exports = router;