// Importa el modelo Paciente
import Paciente from "../models/Paciente.js";

// Define las funciones que ejecutan las consultas y mutaciones
const resolvers = {

    // Obtener todos los pacientes
    pacientes: async () => {

        return await Paciente.find();
    },

    // Obtener un paciente por ID
    paciente: async ({ id }) => {

        return await Paciente.findById(id);
    },

    // Crear un nuevo paciente
    crearPaciente: async (args) => {

        const paciente =
            new Paciente(args);

        return await paciente.save();
    },

    // Actualizar paciente existente
    actualizarPaciente: async (args) => {

        return await Paciente.findByIdAndUpdate(
            args.id,
            args,
            {
                new: true
            }
        );
    },

    // Eliminar paciente por ID
    eliminarPaciente: async ({ id }) => {

        await Paciente.findByIdAndDelete(id);

        return "Paciente eliminado";
    }
};

// Exporta los resolvers
export default resolvers;