const Project = requiere("../models/project");

const save = (req, res)=>{
    return res.status(200).send({
        message:"Probando controlador"
    });
}

module.exports = {
    save
}