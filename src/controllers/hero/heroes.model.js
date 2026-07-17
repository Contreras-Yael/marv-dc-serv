const {body} = require('express-validator');
const {validateResult} = require('../../middlewares/validate');

const Heroemodel = {
    create:[
    body('name')
            .exists().withMessage('Nombre debe estar incluido')
            .notEmpty().withMessage('Nombre no puede estar vacío')
            .isString().withMessage('Nombre debe ser texto'),

        (req, res, next) => {
            validateResult(req, res, next);
        }
    ],

    edit:[
        body('name')
            .optional() // entiendo que es opciional y revisa 
            .notEmpty().withMessage('Nombre no puede estar vacío')
            .isString().withMessage('Nombre debe ser texto'),
            
        (req, res, next) => {
            validateResult(req, res, next);
        }
    
    
    ]
};


module.exports =  Heroemodel;
