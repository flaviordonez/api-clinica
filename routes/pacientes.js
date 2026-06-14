// Importa el framework Express, para crear el servidor y manejar rutas HTTP
const express = require("express");

// Crea un enrutador de Express para definir rutas de forma modular
const router = express.Router();

// Importa el modelo "Paciente" desde la carpeta models
// Permite interactuar con la colección de pacientes en MongoDB
const Paciente = require("../models/Paciente");

// Ruta GET que obtiene todos los pacientes de la base de datos
router.get("/", async (req, res) => {

    try {
        // Busca todos los registros de la colección Paciente en MongoDB
        const pacientes = await Paciente.find();

        // Responde con estado 200 (OK) y envía los pacientes en formato JSON
        res.status(200).json(pacientes);

    } catch (error) {
        // Si ocurre un error, responde con estado 500 (error del servidor)
        res.status(500).json({
            // Envía el mensaje del error
            mensaje: error.message
        });
    }
});


// Ruta POST que permite crear un nuevo paciente
router.post("/", async (req, res) => {

    // Extrae los datos enviados en el body de la petición
    const {
        nombre,
        edad,
        historialClinico,
        activo
    } = req.body;

    // Valida que todos los campos requeridos estén presentes
    if (
        !nombre ||
        edad === undefined ||
        !historialClinico ||
        activo === undefined
    ) {
        // Si falta algún campo, responde con error 400 (Bad Request)
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    try {

        // Crea una nueva instancia del modelo Paciente con los datos recibidos
        const paciente = new Paciente({
            nombre,
            edad,
            historialClinico,
            activo
        });

        // Guarda el nuevo paciente en la base de datos
        const nuevoPaciente =
            await paciente.save();

        // Responde con estado 201 (creado) y el paciente guardado
        res.status(201).json(nuevoPaciente);

    } catch (error) {

        // Si ocurre un error en el servidor, responde con estado 500
        res.status(500).json({
            mensaje: error.message
        });
    }
});

// Ruta PUT que actualiza un paciente por su ID
router.put("/:id", async (req, res) => {

    try {

        // Busca un paciente por ID y lo actualiza con los datos enviados en el body
        // { new: true } hace que devuelva el documento ya actualizado
        const paciente =
            await Paciente.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        // Si no se encuentra el paciente, responde con error 404
        if (!paciente) {
            return res.status(404).json({
                mensaje: "Paciente no encontrado"
            });
        }

        // Si se actualiza correctamente, responde con estado 200 y el paciente actualizado
        res.status(200).json(paciente);

    } catch (error) {

        // Si ocurre un error en el servidor, responde con estado 500
        res.status(500).json({
            mensaje: error.message
        });
    }
});


// Ruta DELETE que elimina un paciente por su ID
router.delete("/:id", async (req, res) => {

    try {

        // Busca un paciente por ID y lo elimina de la base de datos
        const paciente =
            await Paciente.findByIdAndDelete(
                req.params.id
            );

        // Si no se encuentra el paciente, responde con error 404
        if (!paciente) {
            return res.status(404).json({
                mensaje: "Paciente no encontrado"
            });
        }

        // Si se elimina correctamente, responde con mensaje de éxito
        res.status(200).json({
            mensaje: "Paciente eliminado"
        });

    } catch (error) {

        // Si ocurre un error en el servidor, responde con estado 500
        res.status(500).json({
            mensaje: error.message
        });
    }
});


// Ruta GET que obtiene un paciente por su ID
router.get("/:id", async (req, res) => {

    try {

        const paciente = await Paciente.findById(req.params.id);

        if (!paciente) {
            return res.status(404).json({
                mensaje: "Paciente no encontrado"
            });
        }

        res.status(200).json(paciente);

    } catch (error) {

        return res.status(400).json({
            mensaje: "ID inválido",
            error: error.message
        });
    }
});

// Exporta el router
module.exports = router;
