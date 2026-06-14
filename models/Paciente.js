//Importamos la librería mongoose que permite trabajar con mongodb
const mongoose = require("mongoose");

//Define la estructura de la collection Paciente
const pacienteSchema = new mongoose.Schema({
	//Campo nombre de tipo string
    nombre: {
        type: String,
        required: true
    },
	//campo edad de tipo number
    edad: {
        type: Number,
        required: true
    },
	//campo historialClinico de tipo string obligatorio
    historialClinico: {
        type: String,
        required: true
    },
	//campo activo de tipo boolean
    activo: {
        type: Boolean,
        required: true
    }
});

//experta el modelo Paciente y permite ser usado  en otras partes del proyecto
module.exports = mongoose.model("Paciente", pacienteSchema);
