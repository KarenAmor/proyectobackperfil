const express = require('express');
const router = express.Router();
const { realizarTransaccion} = require('../controllers/transaccionesController');

router.post('/', realizarTransaccion);

module.exports = router;