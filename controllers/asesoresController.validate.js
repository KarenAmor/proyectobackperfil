const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

const methods = {
  getAsesores: [],
  crearAsesor: [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('dni').notEmpty().withMessage('El DNI es requerido'),
    body('rol').notEmpty().withMessage('El rol es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    validate,
  ],
  actualizarAsesor: [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    body('nombre').optional().notEmpty().withMessage('El nombre es requerido'),
    body('dni').optional().notEmpty().withMessage('El DNI es requerido'),
    body('rol').optional().notEmpty().withMessage('El rol es requerido'),
    validate,
  ],
  eliminarAsesor: [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    validate,
  ],
};

module.exports = methods;