const express = require('express');
const cors = require("cors");
const helmet = require('helmet');
const { heroes_api } = require('./database/connection');

const app = express();

const PORT = 3977;

app.use(cors());

// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// );

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

app.get('/api/imagen-odio', async (req, res) => {
  const urlReal = req.query.url;
  if (!urlReal) return res.status(400).send('Falta la URL de la imagen');

  try {
    // 1. Usamos fetch, que maneja redirecciones (301/302) automáticamente
    const respuestaApi = await fetch(urlReal, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.superherodb.com/'
      }
    });

    // 2. Si el guardia nos sigue rechazando, lo imprimimos en tu terminal
    if (!respuestaApi.ok) {
      console.log(`Fallo en SuperHeroDB. Código exacto: ${respuestaApi.status}`);
      return res.status(404).send('Imagen bloqueada');
    }

    // 3. Convertimos la imagen y la enviamos a Angular
    const arrayBuffer = await respuestaApi.arrayBuffer();
    const bufferImagen = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', respuestaApi.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.send(bufferImagen);

  } catch (error) {
    console.error('Error interno del puente:', error.message);
    res.status(500).send('Error en el servidor');
  }
});


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});