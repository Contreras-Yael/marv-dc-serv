const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const Hero = require("../../models/recluit_he");


const save = (req, res) => {
  let body = req.body;

  if (!body.name) {
    return res.status(400).send({
      status: "error",
      message: "Faltan datos por enviar"
    });
  }
  let herosav = new Hero(body);
  herosav.save()
    .then(herosav => {
      return res.status(201).send({
        status: "success",
        message: "Recluta guardado",
        herosav
      });
    })
    .catch(error => {
      return res.status(500).send({
        status: "error",
        message: "Error al guardar",
        error: error.message
      });
    });
};

const herolist=(req, res) =>{
    Hero.find()
        .then(herosav =>{
            if(!herosav){
                return res.status(404).send({
                    status:"error",
                    message:"No hay proyectos para mostrar"
                });
            }  
            return res.status(200).send({
                status:"success",
                herosav
            });
        })
        .catch(error =>{
            return res.status().send({
                status:"error",
                message:"error al listar los proyectos",
                error
            });
        });
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

const deletehero=(req,res)=>{

    let id= req.params.id;

    Hero.findByIdAndDelete(id)
    //.deleteOne()    
    .then(hero => {
        if(!hero){
            return res.status(404).send({
                    status:"error",
                    message:"No se encontro al heroe"
            });
        }
        return res.status(200).send({
            status:"success",
            hero
        });
    })
    .catch(error => {
        
        return res.status(500).send({
            status:"error",
            message:"No se encontro al heroe",
            error
        });
    });
}

const updateher = (req, res) => {
    let body = req.body;
    if (!body || !body.id) {
        return res.status(404).send({
            status: "error",
            message: "No se encontro al heroe",
        });
    }
    Hero.findByIdAndUpdate(body.id, body, { returnDocument: 'after' })
        .then(heroupdat => {
            if (!heroupdat) {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontro al heroe"
                });
            }
            return res.status(200).send({
                status: "success",
                hero: heroupdat
            });
        })
        .catch(error => {
            return res.status(500).send({
                status: "error",
                message: "Error al actualizar al heroe",
                error
            });
        });
}

const uploadim = (req, res) => {
    let id = req.params.id;
    const filepath = req.file.path;
    Hero.findById(id)
        .then(heroFound => {
            if (!heroFound) {
                if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
                return res.status(404).send({ 
                    status: "error",
                    message: "No se encontro"
                });
            }
            if (heroFound.image && heroFound.image.url) {
                const oldFileName = heroFound.image.url.trim();

                if (oldFileName !== "default.png" && oldFileName !== "" && oldFileName.length > 0) {
                    const oldImagePath = path.join(__dirname, "../../uploads/images", oldFileName);
                    
                    try {
                        if (fs.existsSync(oldImagePath) && fs.lstatSync(oldImagePath).isFile()) {
                            fs.unlinkSync(oldImagePath);
                        }
                    } catch (err) {
                        console.error("Error al remover imagen antigua:", err.message);
                    }
                }
            }
            return Hero.findByIdAndUpdate(id, { "image.url": req.file.filename }, { new: true });
        })
        .then(heroUpdated => {
            if (!heroUpdated) return;
            return res.status(200).send({
                status: "success",
                message: "Se actualizó la imagen correctamente",
                hero: heroUpdated
            });
        })
        .catch(error => {
            if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
            console.error("Error en el flujo de la imagen:", error);
            return res.status(500).send({
                status: "error",
                message: "Error interno al ejecutar el flujo de guardado",
                error: error.message
            });
        });
}


const getim = (req, res) => {

    let file = req.params.file;

    let filepath = "./src/uploads/images/" + file;

    fs.stat(filepath, (error, exist)=>{
        if(!error && exist){
            return res.sendFile(path.resolve(filepath));
        } else {
            return res.status(404).send({
                status: "error",
                message: "Sacando la imagen"
            });
        }
    } );
}

module.exports = {
    save,
    herolist,
    deletehero,
    updateher,
    herolistind,
    uploadim,
    getim,
}