// Middleware de autenticación
const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Asesores = require("../db/entities/Asesores");
const bcrypt = require('bcryptjs');
const autenticacionMiddleware = async (req, res, next) => {
    const connection = await connectToDatabase();
    const asesoresRepository = getRepository(Asesores);
  
    const { dni, password } = req.body;
  
    try {
      // Verifica si el usuario existe en la tabla de asesores
      const asesor = await asesoresRepository.findOne({ where: { dni } });
  
      if (!asesor) {
        return res.status(401).send({ message: "Credenciales inválidas" });
      }
  
      // Verifica si el rol del usuario es "asesor"
      if (asesor.rol !== "asesor") {
        return res.status(403).send({ message: "Acceso denegado" });
      }
  
      // Establece la propiedad `req.user` con los datos del usuario autenticado
      req.user = {
        dni: dni,
        role: "asesor",
        asesor: asesor
      };
  
      next();
    } catch (error) {
      console.error("Error al autenticar al usuario:", error);
  
      // Maneja el error de manera más específica
      if (error.name === "EntityNotFoundError") {
        return res.status(404).send({ message: "Credenciales inválidas" });
      } else {
        return res.status(500).send({ error: "Error al autenticar al usuario" });
      }
    }
  };
  
  module.exports = autenticacionMiddleware;  