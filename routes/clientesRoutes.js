const express = require("express");
const { getClientes, crearCliente } = require("../controllers/clientesController");

const router = express.Router();

router.get("/", getClientes);
router.post("/", crearCliente);

module.exports = router;
