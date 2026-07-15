const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);


const conectarmcli = async () => {
  try {
    await client.connect();

    const db = client.db("hero_academy");

    console.log(" Conexion a Mongoclient");

    return db;
  } catch (error) {
    console.error("Algo fallo:", error);
    throw error;
  }
};

module.exports = {
  conectarmcli,
};