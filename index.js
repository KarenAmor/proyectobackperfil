const express = require("express");
const swaggerUiExpress = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const { createConnection } = require("typeorm");
const autenticacionMiddleware = require('./middleware/autenticacionMiddleware'); 

const clientesRoutes = require("./routes/clientesRoutes");
const loginRoutes = require("./routes/loginRoutes");
const aprobarTajetasRoutes = require("./routes/aprobarTarjetasRoutes"); 
const { connectToDatabase } = require("./database");
const bodyParser = require("body-parser");

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
app.use("/aprobar-tarjeta", aprobarTajetasRoutes);


// Inicia la aplicación en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor en funcionamiento en el puerto 3000");
});

module.exports = app;