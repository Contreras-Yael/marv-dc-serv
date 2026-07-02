//dependencias
const express = require('express');
const cors = require("cors");
//son las escenciales para el levantamiento de servidor y 
const conect = require("./database/connection_2");
const { heroes_api } = require('./database/connection');

conect();

//creacion de servidor
const app = express();
const PORT = 3977;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//parece que esto ya esta

const projectRoutes = require("./routes/project");

app.use('/api/project', projectRoutes);

app.get('/api/heroes', async(req, res) => {

    console.log("llamado");

try{
const personaje = await heroes_api();
res.json(personaje);

}  catch(error){
    res.status(500).json({mensaje: 'No funciona, carga de personaje'});
}
});


app.get('/pruebita', (req,res)=>{

    console.log("ejecucion del endpoint de prueba");
    return res.status(200).send(`
        <section>
            <h1>Pruebas</h1>
        </section>
        `)

});
+
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
