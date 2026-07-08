const {Schema, model} = require("mongoose");


const heroschema = new Schema({

    name:{ type: String, required: true, trim: true,},

    powerstats:{
         intelligence: { type: String, default: "1" },
         strength: {type: String, default: "1"},
         speed:{type: String, default: "1"},
         durability:{type: String, default: "1"},
         power:{type: String, default: "1"},
         combat:{type: String, default: "1"},
        },
    
    biography:{
        "full-name":{type: String, default: "importa poco" },
        "alter-egos":{type: String,default: "importa poco"},
        "place-of-birth":{type: String,default: "importa poco"},
        alignment:{type: String,default: "importa poco"},
        publisher:{type: String,default: "importa poco"},
    },

     appearance:{
        gender: {type: String,default: "importa poco"},
        race: {type: String,default: "importa poco"},
        height: {type: String,default: "importa poco"},
        weight: {type: String,default: "importa poco"},
        "eye-color": {type: String,default: "importa poco"},
        "hair-color": {type: String,default: "importa poco"},
    },
    work:{
         occupation: { type: String, default: "importa poco"},
         base: {type: String,default: "importa poco"}
    },
  image:{
    url:{type: String, default: "default.jpg"} 
  },
});

module.exports = model("Hero", heroschema); 