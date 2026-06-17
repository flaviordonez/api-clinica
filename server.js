/******************************************
 IMPORTACIONES RESTFULL
 *****************************************/
 
// carga variables del archivo .env
import dotenv from "dotenv";

// Importamos Express para crear el SERVIDOR
import express from "express";

// Importa Mongoose para conectar con MONGODB
import mongoose from "mongoose";

// Importa middleware CORS para peticione
import cors from "cors";

// Importa rutas
import pacientesRoutes from "./routes/pacientes.js";

/********************************************
 IMPORTACIONES GRAPHQL
 *******************************************/
// Lectura de archivos
import fs from "fs";

// Funciones de GraphQL
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

// Importa los resolvers
import resolvers from "./graphql/resolvers.js";
/***********************************************
***********************************************/

// Cargar variables de entorno
dotenv.config();

/*********************************************
Crea la aplicación Express para RESTFULL
*********************************************/
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

/***********************************************
 CARGA EL ESQUEMA GRAPHQL
 ***********************************************/
// Lee el archivo schema.graphql y construye el esquema GraphQL
const schema = buildSchema(
    fs.readFileSync(
        "./graphql/schema.graphql",
        "utf8"
    )
);
//**********************************************/


// Conexión a MongoDB utilizando el archivo .env
mongoose.connect(process.env.MONGO_URI)
.then(() => {				//Se ejecuta si la CONX. es OK
    console.log("MongoDB conectado");
})
.catch(err => {		//Si hay error durante la CONEXION
    console.error("Error en la conexión:", err);
});

//Ruta principal RAÍZ
app.get("/", (req,res) => {
    res.json({
	mensaje: "API clínica funcionando"
    });
});

//Rutas de pacientes
app.use(
    "/api/pacientes",
     pacientesRoutes
);

/********************************************
 ENDPOINT ÚNICO GRAPHQL
 *******************************************/

//Endpoint único para GraphQL
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue: resolvers,

        // Habilita la interfaz gráfica para pruebas
        graphiql: true
    })
);
//********************************************/

// Inicia el servidor en el puerto 3000
app.listen(
    process.env.PORT,
    () => {
	console.log(
	    `Servidor ejecutándose en puerto ${process.env.PORT}`

	    );
	}
);
