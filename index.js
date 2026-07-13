// dependencias
const express = require('express');
const cors = require("cors");

// Conexiones de base de datos
const conect = require("./src/config/connection_2");        //mongoose
const { Coneccion } = require('./src/config/connection_3'); //MongoClient
const { heroes_api } = require('./src/config/connection');   //api

// servidor
const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoitn

// Api internet
app.get('/api/heroes-internet/:id', async(req, res) => {
    console.log("Api de heroes en internet - ID Individual");
    try {
        const idBuscada = req.params.id; 

        const listaCompleta = await heroes_api();
        
        const personaje = listaCompleta.find(h => h.id.toString() === idBuscada.toString());
        
        if (!personaje) {
            return res.status(404).json({ mensaje: 'Héroe no encontrado' });
        }
        res.json(personaje);
    } catch(error) {
        console.error("Error detallado en el backend:", error);
        res.status(500).json({ mensaje: 'No funciona, carga de personaje de internet' });
    }
});


app.get('/api/heroes-internet', async(req, res) => {
    console.log("Api dee heroes en internet");
    try {
        const personaje = await heroes_api();
        res.json(personaje);
    } catch(error) {
        res.status(500).json({ mensaje: 'No funciona, carga de personaje de internet' });
    }
});

// prueba de mongoclient
app.get('/api/test', async(req, res) => {
    console.log("Conexion endpoitn");
    try {
        // 1. Ejecutas la conexión para obtener el objeto de la BD
        const db = await Coneccion();
        
        // 2. Apuestas a tu colección de héroes de forma nativa y los traes todos
        const personajes = await db.collection("heros").find().toArray();
        
        // 3. Se los respondes a Angular en formato JSON
        res.json(personajes);
        
    } catch(error) {
        console.error("Error en /api/test:", error);
        res.status(500).json({ mensaje: 'No funciona, falla al conectar o extraer de Mongo Client' });
    }
});

// rutas
const heroroute = require("./src/routes/project");
// mongoose, ruta
app.use('/api/heroes', heroroute); 

// intento de arrenque total
async function iniciarServidor() {
    try {
        // mongoose
        if (typeof conect === 'function') conect(); 
        
        // mongoclient
        if (typeof clienthero === 'function') {

            console.log("Mongo client sirvio");
        }

        // Levantamos el servidor Express UNA SOLA VEZ
        app.listen(PORT, () => {
            console.log(`Servidor funcionando url:  http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.error("Todo trono, por algo que no se que sea pero trono:", error);
    }
}

iniciarServidor();