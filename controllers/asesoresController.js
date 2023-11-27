const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Asesores = require("../db/entities/Asesores");
const Credenciales = require("../db/entities/Credenciales");
const bcrypt = require('bcryptjs');

async function getAsesores(req, res) {
  const connection = await connectToDatabase();
  const asesoresRepository = getRepository(Asesores);
  const asesores = await asesoresRepository.find();
  res.status(200).json(asesores);
}

async function crearAsesor(req, res) {
  const connection = await connectToDatabase();
  const asesoresRepository = getRepository(Asesores);
  const credentialsRepository = getRepository(Credenciales);

  const randomNumber = Math.floor(Math.random() * 10000) + 1;
  const asesores = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    rol: req.body.rol,
    codigo_asesor: randomNumber,
    telefono: req.body.telefono,
    correo: req.body.correo
  };

  const asesorNuevo = await asesoresRepository.save(asesores);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Crear las credenciales para el cliente
  const credenciales = {
    dni: req.body.dni,
    password: hashedPassword,
  };

  try {
    await credentialsRepository.save(credenciales);
    res.status(201).json({ message: "Asesor y credenciales creadas con éxito", asesor: asesorNuevo, credenciales: credenciales });
  } catch (error) {
    console.error("Error al guardar las credenciales:", error);
    res.status(500).send({ error: "Hubo un error al guardar las credenciales" });
  }
}
async function actualizarAsesor(req, res) {
    const connection = await connectToDatabase();
    const asesoresRepository = getRepository(Asesores);
  
    const { id } = req.params;  // Obtener el ID del asesor de los parámetros de la solicitud
  
    try {
      const asesor = await asesoresRepository.findOne({ where: { id: id } });
  
      if (!asesor) {
        return res.status(404).send({ error: "Asesor no encontrado" });
      }
  
      asesor.nombre = req.body.nombre || asesor.nombre; 
      asesor.apellido = req.body.apellido || asesor.apellido// Actualizar el nombre si se proporciona en el cuerpo de la solicitud
      asesor.dni = req.body.dni || asesor.dni; // Actualizar el DNI si se proporciona en el cuerpo de la solicitud
      asesor.rol = req.body.rol || asesor.rol;
      asesor.telefono = req.body.telefono || asesor.telefono
      asesor.correo = req.body.correo || asesor.correo
      
      await asesoresRepository.save(asesor); // Guardar el asesor actualizado
  
      res.status(201).json({ message: "Asesor actualizado con éxito", asesor: asesor });
    } catch (error) {
      console.error("Error al actualizar el asesor:", error);
      res.status(500).send({ error: "Hubo un error al actualizar el asesor" });
    }
  }
  
  async function eliminarAsesor(req, res) {
    const connection = await connectToDatabase();
    const asesoresRepository = getRepository(Asesores);
  
    const { id } = req.params;
  
    try {
      const asesor = await asesoresRepository.findOne({ where: { id: id } });
  
      if (!asesor) {
        console.log("Asesor no encontrado");
  
        return res.status(404).send({ error: "Asesor no encontrado" });
      }
  
      console.log("Eliminando el asesor:", asesor);
  
      await asesoresRepository.remove(asesor); // Eliminar el asesor de la base de datos
  
      res.status(200).json({ message: "Asesor eliminado con éxito", asesor: asesor });
    } catch (error) {
      console.error("Error al eliminar el asesor:", error);
      res.status(500).send({ error: "Hubo un error al eliminar el asesor" });
    }
  }  
  
  module.exports = { getAsesores, crearAsesor, actualizarAsesor, eliminarAsesor };