//dependencias
const express = require('express');
const cors = require("cors");
//son las escenciales para el levantamiento de servidor y 
const conect = require("./src/config/connection_2");
// const prueba = require("./src/config/connection_3");
const { conectarDB } = require('./src/config/connection_3');
const { heroes_api } = require('./src/config/connection');

//creacion de servidor funciona en ambas partes 
const app = express();
const PORT = 3000;

 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));



app.get('/api/heroes', async(req, res) => {
    console.log("llamado");
try{
const personaje = await heroes_api();
res.json(personaje);
}  catch(error){
    res.status(500).json({mensaje: 'No funciona, carga de personaje'});
}
});

//back mongo
 conect();

//conversion a objetos
 app.use(express.urlencoded({extended:true}));

 const heroroute = require("./src/routes/project");
 app.use('/api/heroes', heroroute);


    // app.listen(PORT, () => {
    //     console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    // });


async function iniciarServidor() {
    try {
        if (typeof conect === 'function') conect(); 
        
        await conectarDB(); 
        
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose con éxito en http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.error("No se pudo iniciar el sistema o la base de datos:", error);
    }
}

iniciarServidor();
