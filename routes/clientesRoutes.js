const express = require("express");
const router = express.Router();
const clienteValidate = require("../controllers/clientesController.validate");
const { getClientes, crearCliente, actualizarCliente} = require("../controllers/clientesController");

router.get("/", clienteValidate.getClientes, getClientes);
router.post("/",clienteValidate.crearCliente, crearCliente);
router.put("/:id", clienteValidate.actualizarCliente, actualizarCliente);

module.exports = router;