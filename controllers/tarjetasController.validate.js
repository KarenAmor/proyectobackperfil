const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

const methods = {
  getTarjetas: [],
  aprobarTarjeta: [
    body('numero_tarjeta').notEmpty().withMessage('El número de tarjeta es requerido'),
    body('estado_solicitud').notEmpty().withMessage('El estado de solicitud es requerido'),
    validate,
  ],
  eliminarTarjeta: [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    validate,
  ],
};

module.exports = methods;