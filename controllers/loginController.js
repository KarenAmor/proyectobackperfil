const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Clientes = require("../db/entities/Clientes");
const Asesores = require("../db/entities/Asesores"); 
const Credenciales = require("../db/entities/Credenciales");
const bcrypt = require('bcryptjs');

async function iniciarSesion(req, res) {
  const connection = await connectToDatabase();
  const clientRepository = getRepository(Clientes);
  const asesoresRepository = getRepository(Asesores); 
  const credentialsRepository = getRepository(Credenciales);

  const { dni, password } = req.body;

  try {
    const credentials = await credentialsRepository.findOne({ where: { dni } });

    if (!credentials) {
      return res.status(404).send({ message: "Credenciales inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, credentials.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: "Credenciales inválidas" });
    }

    const cliente = await clientRepository.findOne({ where: { dni } });

    // Verifica si el DNI está presente en la tabla de asesores
    const asesor = await asesoresRepository.findOne({ where: { dni } });

    if (asesor) {
      res.send({ message: "Inicio de sesión exitoso, Asesor", cliente });
    } else {
      res.send({ message: "Inicio de sesión exitoso, Bienvenido", cliente });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send({ error: "Error al iniciar sesión" });
  }
}

module.exports = { iniciarSesion };