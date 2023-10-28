const { createConnection, getConnection } = require("typeorm");

let connection = null;

async function connectToDatabase() {
  if (!connection) {
    connection = await createConnection({
      type: "sqlite",
      database: "db/echo.db",
      synchronize: true,
      entities: [
       require("./db/entities/Clientes"),
       require("./db/entities/Credenciales"),
       require("./db/entities/Tarjetas"),
       require("./db/entities/Asesores"),
      
      ],
    });
  }

  return connection;
}

module.exports = { connectToDatabase };