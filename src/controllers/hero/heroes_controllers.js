const express = require("express");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

const fs = require("fs");
const path = require("path");
//const Hero = require("../../models/recluit_he");

// const hero2 = require("");

const { conectarmcli } = require('../../config/connection_3'); 



const save = async (req, res) => {
  try {
    const db = await conectarmcli();

    const body = req.body;

    if (!body.name) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar"
      });
    }

    // MongoDB agrega automáticamente el _id
    const resultado = await db
      .collection("heros")
      .insertOne(body);

    const herosav = {
      ...body,
      _id: resultado.insertedId
    };

    return res.status(201).json({
      status: "success",
      message: "Recluta guardado",
      herosav
    });

  } catch (error) {
    console.error("Error al guardar:", error);

    return res.status(500).json({
      status: "error",
      message: "Error al guardar",
      error: error.message
    });
  }
};


const herolist = async (req, res) => {
    try {
        const db = await conectarmcli();

        const herosav = await db.collection("heros").find().toArray();

        if (!herosav || herosav.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No encontro heroes"
            });
        }  

        return res.status(200).json({
            status: "success",
            herosav
        });

    } catch (error) {
        console.error("Error de mongo client:", error);
        
        return res.status(500).json({ 
            status: "error",
            mensaje: "Error lectura en el driver nativo",
            error: error.message 
        });
    }
}


const herolistind=(req, res) =>{
    let id= req.params.id;

    Hero.findById(id)
  //  Hero.find()
        .then(herosav =>{
            if(!herosav){
                return res.status(404).send({
                    status:"error",
                    message:"No hay heroes para mostrar"
                });
            }  
            return res.status(200).send({
                status:"success",
                herosav
            });
        })
        .catch(error =>{
            return res.status(500).send({
                status:"error",
                message:"error al encontrar por id",
                error
            });
        });
}

const deletehero = async (req, res) => {
  try {
    const db = await conectarmcli();
    const id = req.params.id;

    const hero = await db.collection("heros").findOne({
      _id: new ObjectId(id)
    });

    if (!hero) {
      return res.status(404).send({
        status: "error",
        message: "No se encontró al héroe"
      });
    }

    await db.collection("heros").deleteOne({
      _id: new ObjectId(id)
    });

    return res.status(200).send({
      status: "success",
      hero
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al eliminar al héroe",
      error: error.message
    });
  }
};


const updateher = async(req, res) => {
try{
    const db = await conectarmcli();
    const heroid = req.body.id || req.body._id;

    if(!heroid){
        return res.status(400).json({
        status: "error", mensaje: "Falta el ID en el cuerpo de la petición" 
        });
    }

    let update = { ...req.body };
    var {name} = req.body;

    delete update.id;
    delete update._id;
    

    const resultado = await db.collection("heros").updateOne(
        { _id: new ObjectId(heroid) }, 
        { $set: update }
    );

    if(resultado.matchedCount === 0){
        return res.status(404).json({
            status: "error",
            message: "No se encontró el héroe en la base de datos local"
        })
    }

        return res.status(200).json({
        status: "success",
        mensaje: "Actualizado ",
        modificados: resultado.modifiedCount
    });

}catch(error){
    console.log(error);
response.code = 500
}

}

const uploadim = async (req, res) => {
  let id = req.params.id;
  const filepath = req.file.path;

  try {
    const db = await conectarmcli();

    // Antes: Hero.findById(id)
    const heroFound = await db.collection("heros").findOne({
      _id: new ObjectId(id)
    });

    if (!heroFound) {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      return res.status(404).send({
        status: "error",
        message: "No se encontró"
      });
    }

    // Eliminar la imagen anterior
    if (heroFound.image && heroFound.image.url) {
      const oldFileName = heroFound.image.url.trim();

      if (
        oldFileName !== "default.png" &&
        oldFileName !== ""
      ) {
        const oldImagePath = path.join(
          __dirname,
          "../../uploads/images",
          oldFileName
        );

        if (
          fs.existsSync(oldImagePath) &&
          fs.lstatSync(oldImagePath).isFile()
        ) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    // Antes: Hero.findByIdAndUpdate(...)
    await db.collection("heros").updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          "image.url": req.file.filename
        }
      }
    );

    // Extraemos nuevamente al héroe actualizado
    const heroUpdated = await db.collection("heros").findOne({
      _id: new ObjectId(id)
    });

    return res.status(200).send({
      status: "success",
      message: "Se actualizó la imagen correctamente",
      hero: heroUpdated
    });

  } catch (error) {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    console.error("Error en el flujo de la imagen:", error);

    return res.status(500).send({
      status: "error",
      message: "Error interno al guardar la imagen",
      error: error.message
    });
  }
};

const getim = (req, res) => {
  let file = req.params.file;

  let filepath = path.join( __dirname, "../../uploads/images",file);

  fs.stat(filepath, (error, exist) => {
    if (!error && exist) {
      return res.sendFile(path.resolve(filepath));
    }

    return res.status(404).send({
      status: "error",
      message: "No se encontró la imagen"
    });
  });
};


module.exports = {
    save,
    herolist,
    deletehero,
    updateher,
    herolistind,
    uploadim,
    getim,
}