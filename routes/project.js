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
router.get("/herolist/:id", HeroController.herolistind);
router.put("/update", HeroController.updateher)
router.delete("/delete/:id", HeroController.deletehero);
//exportar rutas

module.exports = router;