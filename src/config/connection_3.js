const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

async function conectarmcli() {
  try {
    await client.connect();
    
    const baseDatos = client.db("hero_academy");
    
    console.log("Conexion a Mongo");
    return baseDatos; 
  } catch (error) {
    console.error("Error connection_3:", error);
    throw error;
  }
}

module.exports = {
  conectarmcli,
};
