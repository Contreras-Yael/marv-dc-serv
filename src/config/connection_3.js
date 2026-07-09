const {MongoClient} = require ('mongodb') ;

const url = "mongodb://127.0.0.1:27017";
const dbl = "hero_academy";

const client = new MongoClient(url);
let db = null;

async function probarConexion() {
  try {
  await client.connect();
  db = client.db("hero_academy");
  console.log("¡Qué onda! Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos :", error);
  }
}

const getDB = () => db;

module.exports = {conectarDB, getDB };


