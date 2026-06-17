// Importa Router de Express
import { Router } from "express";

// Importa el modelo Paciente
import Paciente from "../models/Paciente.js";

// Crea la instancia del router
const router = Router();


// =======================================
// GET - Obtener todos los pacientes de la base de datos
// =======================================
router.get("/", async (req, res) => {

    try {
	
	//busca todos  los pacientes de la colección Paciente en mongoDB
        const pacientes = await Paciente.find();
	
	//Responde con codigo 200 y envía en formato json
        res.status(200).json(pacientes);

    } catch (error) {

	//Sí hay error  responde con código 500 (error del servidor)
        res.status(500).json({
            mensaje: error.message
        });
    }
});


// =======================================
// GET - Obtener paciente por ID
// =======================================
router.get("/:id", async (req, res) => {

    try {
	//busca un paciente por el id recibido el la URL
        const paciente = await Paciente.findById(
            req.params.id
        );
	//busca el paciente
        if (!paciente) {
	//si no encuentra el id responde con código 400 NO ENCONTRADO
            return res.status(404).json({
                mensaje: "Paciente no encontrado"
            });
        }
	//Si lo encuentra devuelve 200 OK
        res.status(200).json(paciente);

    } catch (error) {
	//si hay error captura el error y devulve 400
        res.status(400).json({
            mensaje: "ID inválido",
            error: error.message
        });
    }
});


// =======================================
// POST - Crear paciente
// =======================================
router.post("/", async (req, res) => {
	//Extrae los datos enviado en el body
    const {
        nombre,
        edad,
        historialClinico,
        activo
    } = req.body;
	//valida que los datos sean correctos
    if (
        !nombre ||
        edad === undefined ||
        !historialClinico ||
        activo === undefined
    ) {
	//si hay error devuelve error 400
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    try {
	//crea una nueva instancia del model Paciente
        const paciente = new Paciente({
            nombre,
            edad,
            historialClinico,
            activo
        });
	//Guarda el nuevo paciente en DB
        const nuevoPaciente =
            await paciente.save();
	//si es correcto entrega código 201 CREADO
        res.status(201).json(	
            nuevoPaciente
        );

    } catch (error) {
	//Si hay error devuelve en el servidor, estado 500 
        res.status(500).json({
            mensaje: error.message
        });
    }
});


// =======================================
// PUT - Actualizar paciente
// =======================================
router.put("/:id", async (req, res) => {

    try {
	//Busca un paciente por ID y lo actualiza
        const paciente =
            await Paciente.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true	//devuelve paciente actualizado
                }
            );

        if (!paciente) {
	//Si no encuentra el id devuelve el estado 404
            return res.status(404).json({
                mensaje: "Paciente no encontrado"
            });
        }
	//Si es correcto devuelve estado ok 200 y guarda el Paciente
        res.status(200).json(paciente);

    } catch (error) {
	//Si hay error en el servidor devuelve estado 500
        res.status(500).json({
            mensaje: error.message
        });
    }
});


// =======================================
// DELETE - Eliminar paciente
// =======================================
router.delete("/:id", async (req, res) => {

    try {
	//busca paciente por ID y lo elimina
        const paciente =
            await Paciente.findByIdAndDelete(
                req.params.id
            );
	//Si no encuentra el paciente entrega error 404 NO ENCONTRADO
        if (!paciente) {

            return res.status(404).json({
                mensaje: "Paciente no encontrado"
            });
        }
	//Si es eliminado correctamente entrega estado 200
        res.status(200).json({
            mensaje: "Paciente eliminado"
        });

    } catch (error) {
	//Estado 500 si hay error en el servidor
        res.status(500).json({
            mensaje: error.message
        });
    }
});


// Exportar router
export default router;
