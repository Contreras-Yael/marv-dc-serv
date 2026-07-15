//Cargar express
const express = require("express");
const router = express.Router();

// cargar controlador
const HeroController = require("../controllers/hero/heroes_controllers");
const upload = require("../middlewares/upload");
const model = require("../models/recluit_he");
const Heroemodel = require("../controllers/hero/heroes.model");


router.post("/save", HeroController.save);
router.get("/herolist", HeroController.herolist);
router.get("/herolist/:id", HeroController.herolistind);
router.put("/update", Heroemodel.edit, HeroController.updateher)
router.delete("/delete/:id", HeroController.deletehero);
router.put("/upload/:id", upload.single("file"), HeroController.uploadim);


router.get("/image/:file", HeroController.getim)


module.exports = router;

//usar el modelo en los routes

