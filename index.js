const express = require("express");
const swaggerUiExpress = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const { createConnection } = require("typeorm");
const { connectToDatabase } = require("./database");
const bodyParser = require("body-parser");
const autenticacionMiddleware = require('./middleware/autenticacionMiddleware'); 

const clientesRoutes = require("./routes/clientesRoutes");
const loginRoutes = require("./routes/loginRoutes");
const tarjetasRoutes = require("./routes/tarjetasRoutes"); 
const asesoresRoutes = require("./routes/asesoresRoutes");

const app = express();

// Configuracion bodyParser
app.use(bodyParser.json());
// Agrega swagger a la aplicación
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));

// Ruta para manejar la solicitud a la raíz de la aplicación
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la página principal!");
});

app.use("/clientes", clientesRoutes);
app.use("/login", loginRoutes);
app.use("/tarjetas", tarjetasRoutes);
app.use("/asesores", asesoresRoutes);

/* Catch Validation error */
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
      error: err.error.toString()
    });
  } else { next(err); }
});


// Inicia la aplicación en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor en funcionamiento en el puerto 3000");
});

module.exports = app;