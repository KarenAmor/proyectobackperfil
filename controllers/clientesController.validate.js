const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

const methods = {
  getClientes: [],
  crearCliente: [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('apellido').notEmpty().withMessage('El apellido es requerido'),
    body('dni').notEmpty().withMessage('El DNI es requerido'),
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('sueldo_neto').isNumeric().withMessage('El sueldo neto debe ser numérico'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    validate,
  ],
  actualizarCliente: [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    body('nombre').optional().notEmpty().withMessage('El nombre es requerido'),
    body('apellido').optional().notEmpty().withMessage('El apellido es requerido'),
    body('dni').optional().notEmpty().withMessage('El DNI es requerido'),
    body('email').optional().isEmail().withMessage('El correo electrónico no es válido'),
    body('sueldo_neto').optional().isNumeric().withMessage('El sueldo neto debe ser numérico'),
    validate,
  ],
  eliminarCliente: [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    validate,
  ],
};

module.exports = methods;