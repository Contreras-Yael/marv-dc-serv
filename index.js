const express = require('express');
const cors = require("cors");
const { heroes_api } = require('./database/connection');

const app = express();

const PORT = 3977;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api/heroes', async(req, res) => {
try{
const personaje = await heroes_api();
res.json(personaje);

}  catch(error){
    res.status(500).json({mensaje: 'No funciona, carga de personaje'});
}
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});