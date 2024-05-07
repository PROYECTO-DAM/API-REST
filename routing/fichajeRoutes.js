const express = require("express");
const auth = require("../middleware/auth");
const fichajesController = require("../controllers/fichajesController");

const router = express.Router();

router
  .get("/getFichajesByUserId", auth, fichajesController.getFichajesByUser)
  .get("/getFichajeById", auth, fichajesController.getFichajeById)
  .post("/fichar", auth, fichajesController.fichar)
  .put("/updateFichaje", auth, fichajesController.updateFichaje)
  .delete("/deleteFichaje", auth, fichajesController.borrarFichaje)
  .get("/obtenerFichajesCalcularNomina", fichajesController.getFichajesMensualesPorUsuario)

module.exports = router;
