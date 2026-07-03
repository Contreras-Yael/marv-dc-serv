const express = require("express");
const router = express.Router();

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

module.exports = {
    save,
    herolist,
    deletehero,
    updateher,
    herolistind,
}


// const save = (req, res)=>{
//     let body = req.body;
//     if(!body.name||!body.description||!body.state){
//         return res.status(400).send({
//             status:"error",
//             message:"faltan datos por enviar"
//         });
//     }
//     let projecsav = new Project(body);
//     projecsav.save().then(project => {
//         if(!project){
//             return res.status(404).send({
//                 status: "success",
//                 message:"se guardo",
//             });
//         }
//         return res.status(200).send({
//             status: "success",
//             project
//         });
//     }).catch(error =>{
//         return res.status(500).send({
//             status: "error",
//             message:"Error al guaradar",
//             error:"",
//         });
//     })
// }