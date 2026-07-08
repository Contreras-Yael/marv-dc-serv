//Cargar express
const express = require("express");
const router = express.Router();

// cargar controlador
const HeroController = require("../controllers/hero/heroes_controllers");
const upload = require("../middlewares/upload");
const model = require("../models/recluit_he");

//Definir rutas
// router.post("/save", ProjectController.save);
// router.get("/projects", ProjectController.projects);

router.post("/save", HeroController.save);
router.get("/herolist", HeroController.herolist);
router.get("/herolist/:id", HeroController.herolistind);
router.put("/update", HeroController.updateher)
router.delete("/delete/:id", HeroController.deletehero);
router.put("/upload/:id", upload.single("file"), HeroController.uploadim);
router.get("/image/:file", HeroController.getim)
//exportar rutas

module.exports = router;