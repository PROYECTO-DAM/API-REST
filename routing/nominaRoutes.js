const express = require("express");
const auth = require("../middleware/auth");
const nominaController = require("../controllers/nominaController");

const router = express.Router();

router
  .get("/getNominasByUserId", auth, nominaController.getNominasByUser)
  .get("/getNominaById", auth, nominaController.getNominaDelMes)
  .post("/insertarNominas", nominaController.insertarNominas)

module.exports = router;