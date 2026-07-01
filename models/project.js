//importar mongoose

const {Schema, model} = requiere("mongoose");

//crear esquema
const projectSchema = Schema({
    name: {
        type: String,
        reqired: true,
        trim: true,
    },
    description:{
        type:string
    },
    state:{
        type: String,
        required
    },
    image:{
        type: String(),
        default:"default.png"

    },
    created_at:{
        type: Date,
        default: Date.now
    },
})


module.exports = model("projectSchema")

