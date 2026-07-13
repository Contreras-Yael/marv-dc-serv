const { MongoClient } = require("mongodb");

const Coneccion = async () => {
  try {
    const url = "mongodb://127.0.0.1:27017/hero_academy";

    const client = await MongoClient.connect(url);
    
    const db = client.db();

    console.log("Conexion client");
    
    return db;
    
  } catch (error) {
    console.error("Fallo la conexion de mongoclient:", error);
    throw error;
  }
};

module.exports = { Coneccion };
