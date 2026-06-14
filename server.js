// Carga las variables de entorno definidas en el archivo .env
require("dotenv").config();

// Importa el framework Express
const express = require("express");

// Importa Mongoose para conectarse y trabajar con MongoDB
const mongoose = require("mongoose");

// Importa CORS para permitir peticiones desde otros dominios
const cors = require("cors");

// Crea una instancia de la aplicación Express
const app = express();

// Habilita CORS para todas las rutas de la aplicación
app.use(cors());

// Permite que la aplicación reciba y procese datos en formato JSON
app.use(express.json());


//Conexión Base de datos
// Establece la conexión con la base de datos MongoDB
mongoose.connect(
    "mongodb://127.0.0.1:27017/clinica_db"
)

// Se ejecuta si la conexión es exitosa
.then(() => {
    console.log("MongoDB conectado");
})

// Se ejecuta si ocurre un error durante la conexión
.catch(err => {
    console.log(err);
});

//Importar rutas
// Importa las rutas relacionadas con los pacientes
const pacientesRoutes =
    require("./routes/pacientes");

// Asocia las rutas de pacientes al prefijo "/api/pacientes"
// Todas las rutas definidas en pacientesRoutes comenzarán con esta URL
app.use(
    "/api/pacientes",
    pacientesRoutes
);

//Declarar Puerto
// Inicia el servidor en el puerto 3000
app.listen(3000, () => {

    // Muestra un mensaje en la consola cuando el servidor se inicia correctamente
    console.log(
        "Servidor ejecutándose en puerto 3000"
    );
});


// node server.js

