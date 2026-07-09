const {MongoClient} = require ('mongodb') ;

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
let db = null;

async function conectarDB() {
  try {
  await client.connect();
  db = client.db("hero_academy");
  console.log("Parece funcionar el mogoclient");
  } catch (error) {
    console.error("Pues algo fallo en la conexion:", error);
  }
}

function getDB() {
  return db;
}

module.exports = { conectarDB, getDB };
