const express = require('express');
const cors = require("cors");
const helmet = require('helmet');
const { heroes_api } = require('./database/connection');

const app = express();

const PORT = 3977;

app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api/heroes/general', async(req, res) => {
try{
const personaje = await heroes_api();
res.json(personaje);

}  catch(error){
    res.status(500).json({mensaje: 'No funciona, carga de personaje'});
}
});

app.get('/api/imagen-odio', (req, res) => {
  const urlReal = req.query.url;
  if (!urlReal) return res.status(400).send('Falta la URL de la imagen');

  // Configuración humana obligatoria para burlar al servidor externo
  const opciones = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  };

  // Usamos el cliente nativo de Node.js para descargar los bytes reales de la foto
  require('https').get(urlReal, opciones, (respuestaApi) => {
    
    if (respuestaApi.statusCode !== 200) {
      return res.status(404).send('Imagen no encontrada en el servidor externo');
    }

    // Ponemos las cabeceras para abrir los candados en tu Angular
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    // BOMBAZO AUTOMÁTICO: Conectamos la descarga de internet directo a tu pantalla de Angular
    respuestaApi.pipe(res);

  }).on('error', (error) => {
    console.error('Fallo en el puente de imagen:', error.message);
    res.status(500).send('Error en el puente de imagen');
  });
});


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});