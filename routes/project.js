//Cargar express
const express = require("express");
const router = express.Router();

// cargar controlador
const ProjectController = require("../controllers/hero/heroes_controllers");

//Definir rutas
router.post("/save", ProjectController.save);
router.get("/projects", ProjectController.projects);

//exportar rutas

module.exports = router;