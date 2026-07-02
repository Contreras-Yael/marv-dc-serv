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
        "full-name":{type: String,},
        "alter-egos":{type: String,},
        "place-of-birth":{type: String,},
        alignment:{type: String,},
    },

     appearance:{
        gender: {type: String,},
        race: {type: String,},
        height: {type: String,},
        weight: {type: String,},
        "eye-color": {type: String,},
        "hair-color": {type: String,},
    },
    work:{
         occupation: { type: String},
         base: {type: String}
    },
  image:{
    url:{type: String} 
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