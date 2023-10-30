const express = require("express");
const router = express.Router();
const { getClientes, crearCliente, actualizarCliente } = require("../controllers/clientesController");

router.get("/", getClientes);
router.post("/", crearCliente);
router.put("/:id", actualizarCliente);

module.exports = router;