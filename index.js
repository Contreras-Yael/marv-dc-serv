// dependencias
const express = require('express');
const cors = require("cors");

// Conexiones de base de datos
// const conect = require("./src/config/connection_2");        //mongoose
const {conectarmcli} = require("./src/config/connection_3"); //MongoClient
const { heroes_api } = require('./src/config/connection');   //api

// servidor
const app = express();
const PORT = 3000;

let db; 

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoitn

// Api internet
// app.get('/api/heroes-internet/:id', async(req, res) => {
//     console.log("Api de heroes en internet - ID Individual");
//     try {
//         const idBuscada = req.params.id; 

//         const listaCompleta = await heroes_api();
        
//         const personaje = listaCompleta.find(h => h.id.toString() === idBuscada.toString());
        
//         if (!personaje) {
//             return res.status(404).json({ mensaje: 'Héroe no encontrado' });
//         }
//         res.json(personaje);
//     } catch(error) {
//         console.error("Error revisar:", error);
//         res.status(500).json({ mensaje: 'No funciono la extraccion de la api' });
//     }
// });

app.get('/api/heroes-internet', async(req, res) => {
    console.log("Api dee heroes en internet");
    try {
        const personaje = await heroes_api();
        res.json(personaje);
    } catch(error) {
        res.status(500).json({ mensaje: 'No funciono la extraccion de la api' });
    }
});

// prueba de mongoclient (YA NO VA A TRONAR)
app.get("/api/test", async (req, res) => {
  console.log("Se usa client");

  try {
    // Verificación de seguridad si la BD no ha cargado
    if (!db) {
        return res.status(500).json({ mensaje: "Aun no funciona la bd" });
    }

    const personajes = await db
      .collection("heros")
      .find()
      .toArray();

    res.json(personajes);
  } catch (error) {
    console.error("fallo api/test:", error);
    res.status(500).json({ mensaje: "No se obtuvieron datos" });
  }
});

// rutas
const heroroute = require("./src/routes/project");
// mongoose, ruta
app.use('/api/heroes', heroroute); 

async function iniciarServidor() {
    try {

        // mongoose
        // if (typeof conect === 'function') conect(); 
        
        // mongoclient
        db = await conectarmcli();  
        
        // Levantamos el servidor Express UNA SOLA VEZ
        app.listen(PORT, () => {
            console.log(`Servidor funcionando url:  http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.error("Todo trono, por algo que no se que sea pero trono:", error);
    }
}



iniciarServidor();