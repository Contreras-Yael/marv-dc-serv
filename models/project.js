//importar mongoose

const {Schema, model} = require("mongoose");

//crear esquema
const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
    },
    state:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        default:"default.png"

    },
    created_at:{
        type: Date,
        default: Date.now
    },
})


module.exports = model("Project", projectSchema); 


