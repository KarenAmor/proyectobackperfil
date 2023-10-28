const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Clientes = require("../db/entities/Clientes");
const Credenciales = require("../db/entities/Credenciales");
const Tarjetas = require("../db/entities/Tarjetas");
const bcrypt = require('bcryptjs');

async function getClientes(req, res) {
  const connection = await connectToDatabase();
  const clientRepository = getRepository(Clientes);
  const clientes = await clientRepository.find();
  res.send(clientes);
}

// Genera un número de tarjeta aleatorio
function generarNumeroTarjeta() {
  return Math.floor(Math.random() * 99999999999) + 10000000000;
}
// Genera un número aleatorio de tres dígitos
function generarCodigoSeguridad() {
  return Math.floor(100 + Math.random() * 900); 
}

async function crearCliente(req, res) {
  const connection = await connectToDatabase();
  const clientRepository = getRepository(Clientes);
  const credentialsRepository = getRepository(Credenciales);
  const tarjetasRepository = getRepository(Tarjetas);

  const cliente = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    numero_tarjeta: generarNumeroTarjeta(),
    dni: req.body.dni,
    email: req.body.email,
    sueldo_neto: req.body.sueldo_neto
  };

  // Crear una nueva tarjeta para el cliente
  const tarjeta = tarjetasRepository.create({
    numero_tarjeta: cliente.numero_tarjeta,
    codigo_seguridad: generarCodigoSeguridad(),
    estado_solicitud: req.body.estado_solicitud || "pendiente" // Establece el estado_solicitud
  });
  const newTarjeta = await tarjetasRepository.save(tarjeta);

  const clienteNuevo = await clientRepository.save(cliente);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Crear las credenciales para el cliente
  const credenciales = {
    dni: req.body.dni,
    password: hashedPassword,
  };

  try {
    await credentialsRepository.save(credenciales);
    res.send({ message: "Cliente y credenciales creadas con éxito", cliente: clienteNuevo, tarjeta: newTarjeta, credenciales: credenciales });
  } catch (error) {
    console.error("Error al guardar las credenciales:", error);
    res.status(500).send({ error: "Hubo un error al guardar las credenciales" });
  }
}

module.exports = { getClientes, crearCliente };