const express = require("express");
const router = express.Router();

const Project = require("../../models/project");

const save = (req, res)=>{

    let body = req.body;

    if(!body.name||!body.description||!body.state){
        return res.status(400).send({
            status:"error",
            message:"faltan datos por enviar"
        });
    }

    let projecsav = new Project(body);

    projecsav.save().then(project => {

        if(!project){
            return res.status(404).send({
                status: "success",
                message:"se guardo",
            });
        }

        return res.status(200).send({
            status: "success",
            project
        });

    }).catch(error =>{
        return res.status(500).send({
            status: "error",
            message:"Error al guaradar",
            error:"",
        });
    })


}

const projects=(req, res) =>{
    
    Project.find()
        .then(projects =>{
            if(!projects){
                return res.status(404).send({
                    status:"error",
                    message:"No hay proyectos para mostrar"
                });
            }
            return res.status(200).send({
                status:"success",
                projects
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

module.exports = {
    save,
    projects
}