//Cargar express
const express = require("express");
const router = express.Router();

// cargar controlador
const HeroController = require("../controllers/hero/heroes_controllers");

//Definir rutas
// router.post("/save", ProjectController.save);
// router.get("/projects", ProjectController.projects);

router.post("/save", HeroController.save);
router.get("/herolist", HeroController.herolist);
//exportar rutas

module.exports = router;