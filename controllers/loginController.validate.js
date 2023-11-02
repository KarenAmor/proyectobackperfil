const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

const methods = {
  iniciarSesion: [
    body('dni').notEmpty().withMessage('El DNI es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    validate,
  ],
};

module.exports = methods;