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
    url:{type: String, default: "importa poco"} 
  },
});

module.exports = model("Hero", heroschema); 

//ver cual sera obligatorio
/*
name:""
powerstats{
    "intelligence": "",
    "strength": "",
    "speed": "",
    "durability": "",
    "power": "",
    "combat": ""
 }

biography{
    "full-name": "Richard Milhouse Jones",
    "alter-egos": "No alter egos found.",
    "place-of-birth": "Scarsdale, Arizona",
    "alignment": "good"
 },

 appearance{
    "gender": "Male",
    "race": "Human",
    "height": [ "6'8", "203 cm"],
    "weight": [ "980 lb", "441 kg"],
    "eye-color": "Yellow",
    "hair-color": "No Hair"
 },

work{
    "occupation": "Musician, adventurer, author; formerly talk show host",
    "base": "-"
  },

 "image": {
    "url": "https://www.superherodb.com/pictures2/portraits/10/100/10060.jpg"
  }
*/