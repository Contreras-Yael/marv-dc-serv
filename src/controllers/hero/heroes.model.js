const { body, validationResult } = require('express-validator');

const Heroemodel = {
    create:[

    ],

    edit:[
    body('name').notEmpty().isString().withMessage('Testing'),
    ]
};


module.exports =  Heroemodel;
