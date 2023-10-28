const express = require("express");
const { createConnection } = require("typeorm");
const clientesRoutes = require("./routes/clientesRoutes");
const loginRoutes = require("./routes/routesLogin");
const { connectToDatabase } = require("./database");
const bodyParser = require("body-parser");

const app = express();

// Configuracion bodyParser
app.use(bodyParser.json());

// Ruta para manejar la solicitud a la raíz de la aplicación
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la página principal!");
});

app.use("/clientes", clientesRoutes);
app.use("/login", loginRoutes );

// Inicia la aplicación en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor en funcionamiento en el puerto 3000");
});

module.exports = app;