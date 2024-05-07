const express = require("express");
const auth = require("../middleware/auth");
const proyectosController = require("../controllers/proyectoController");

const router = express.Router();

router
    .get("/getAllProyectos", auth, proyectosController.getAllProyectos)
module.exports = router;