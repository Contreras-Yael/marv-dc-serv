//Cargar express
const express = require("");
const router = express.Router();

// cargar controlador

const ProjectController = require("../controllers/hero");

//Definir rutas
router.post("/save", ProjectController.save);

//exportar rutas

module.exports = router;