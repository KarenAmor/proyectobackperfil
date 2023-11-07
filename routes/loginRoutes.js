const express = require('express');
const router = express.Router();
const { iniciarSesion, modificarContrasena, recuperarContrasena } = require('../controllers/loginController');

// Ruta para la funcionalidad de inicio de sesión
router.post('/', iniciarSesion);
router.post('/modificar', modificarContrasena);
router.post('/recuperar', recuperarContrasena);

module.exports = router;