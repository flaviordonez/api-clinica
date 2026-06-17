import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    edad: {
        type: Number,
        required: true
    },

    historialClinico: {
        type: String,
        required: true
    },

    activo: {
        type: Boolean,
        required: true
    }

});

export default mongoose.model(
    "Paciente",
    pacienteSchema
);