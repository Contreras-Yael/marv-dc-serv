const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const Project = require("../../models/recluit_he");
const Hero = require("../../models/recluit_he");


const save = (req, res)=>{
    let body = req.body;
    if(!body.name){
        return res.status(400).send({
            status:"error",
            message:"faltan datos por enviar"
        });
    }
    let herosav = new Hero(body);
    herosav.save().then(herosav => {
        if(!herosav){
            return res.status(404).send({
                status: "success",
                message:"Recluta guardado",
            });
        }
        return res.status(200).send({
            status: "success",
            herosav
        });
    }).catch(error =>{
        return res.status(500).send({
            status: "error",
            message:"Error al guaradar",
            error:"",
        });
    })
}

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

const updateher = (req,res) => {
    let body = req.body;
    Hero.findByIdAndUpdate(body.id, body, { new: true })

    if(!body || !body.id){
        return res.status(404).send({
            status:"error",
            message:"No se encontro al heroe",
        });
    }
    Hero.findByIdAndUpdate(body.id, body,{ new: true })
        .then(heroupdat =>{
            if(!heroupdat){
                return res.status(404).send({
                        status:"error",
                        message:"No se encontro al heroe"
                });
            }
            return res.status(200).send({
                status: "success",
                hero: heroupdat
            })
        })
        .catch(error => {
            return res.status(500).send({
                status:"error",
                message:"No se encontro al heroe",
                error
            });

        });
}

const uploadim = (req, res) => {
    let id = req.params.id;

    if (!req.file) {
        return res.status(404).send({
            status: "error",
            message: "No se subió ninguna imagen"
        });
    }
    const filepath = req.file.path;
    const extens = path.extname(req.file.originalname).toLowerCase().replace(".", "");
    const valextend = ["png", "jpg", "jpeg", "gif"];

    if (!valextend.includes(extens)) {
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);

        return res.status(400).json({
            status: "error",
            message: "Extensión inválida. Solo se permiten formatos png, jpg, jpeg o gif",
        });
    }

    Hero.findByIdAndUpdate(id, { "image.url": req.file.filename }, { new: false })
        .then(heroupdat => {
            if (!heroupdat) {
                if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
                return res.status(404).send({
                    status: "error",
                    message: "no se encontro el personaje destino"
                });
            }

            if (heroupdat.image && heroupdat.image.url !== "default.png") {
                
                const oldImagePath = "./src/uploads/images/" + heroupdat.image.url;

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            return res.status(200).send({
                status: "success",
                message: "se actualizo la imagen",
                hero: heroupdat
            });
        })
        .catch(error => {
            if (fs.existsSync(filepath)) fs.unlinkSync(filepath);

            return res.status(500).send({
                status: "error",
                message: "Error interno al ejecutar la consulta en MongoDB",
                error: error.message
            });
        });
}

const getim = (req, res) => {

    let file = req.params.file;

    let filepath = "./uploads/images/" + file;

    fs.stat(filepath, (error, exist)=>{
        if(!errpr && exist){
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