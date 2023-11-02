const express = require("express");
const router = express.Router();
const { getAsesores, crearAsesor, actualizarAsesor, eliminarAsesor } = require("../controllers/asesoresController");
const asesoresValidate = require("../controllers/asesoresController.validate");
router.get("/", asesoresValidate.getAsesores, getAsesores);
router.post("/", asesoresValidate.crearAsesor, crearAsesor);
router.put("/:id", asesoresValidate.actualizarAsesor, actualizarAsesor);
router.delete("/:id", asesoresValidate.eliminarAsesor, eliminarAsesor);

module.exports = router;