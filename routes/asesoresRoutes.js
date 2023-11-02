const express = require("express");
const router = express.Router();
const { getAsesores, crearAsesor, actualizarAsesor, eliminarAsesor } = require("../controllers/asesoresController");

router.get("/", getAsesores);
router.post("/", crearAsesor);
router.put("/:id", actualizarAsesor);
router.delete("/:id", eliminarAsesor);

module.exports = router;