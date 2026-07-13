const mongoose = require("mongoose");

const connection = async() => {

    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/hero_academy");

        console.log("Conexion con localhost");

    }catch(error){
        console.log(error);
        throw new Error("Algo fallo en la conexion 2");
    }
}

module.exports = connection;