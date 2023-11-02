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
  res.status(200).json(clientes);
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
    res.status(201).json({ message: "Cliente y credenciales creadas con éxito", cliente: clienteNuevo, tarjeta: newTarjeta, credenciales: credenciales });
  } catch (error) {
    console.error("Error al guardar las credenciales:", error);
    res.status(500).send({ error: "Hubo un error al guardar las credenciales" });
  }
}

async function actualizarCliente(req, res) {
  const connection = await connectToDatabase();
  const clientRepository = getRepository(Clientes);

  const { id } = req.params; // Suponiendo que el id del cliente se pasa como parámetro

  try {
    const cliente = await clientRepository.findOne({ where: { id: id } });
    if (!cliente) {
      return res.status(404).send({ message: "Cliente no encontrado" });
    }

    // Actualiza los campos del cliente según lo que se haya proporcionado en la solicitud
    if (req.body.nombre) {
      cliente.nombre = req.body.nombre;
    }
    if (req.body.apellido) {
      cliente.apellido = req.body.apellido;
    }
    if (req.body.dni) {
      cliente.dni = req.body.dni;
    }
    if (req.body.email) {
      cliente.email = req.body.email;
    }
    if (req.body.sueldo_neto) {
      cliente.sueldo_neto = req.body.sueldo_neto;
    }

    await clientRepository.save(cliente);
    res.status(201).json({ message: "Cliente actualizado con éxito", cliente: cliente });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    res.status(500).send({ error: "Error al actualizar el cliente" });
  }
}
async function eliminarCliente(req, res) {
  const connection = await connectToDatabase();
  const clientRepository = getRepository(Clientes);

  const { id } = req.params; // Suponiendo que el id del cliente se pasa como parámetro

  try {
    const cliente = await clientRepository.findOne({ where: { id: id } });
    if (!cliente) {
      return res.status(404).send({ message: "Cliente no encontrado" });
    }

    await clientRepository.remove(cliente); // Elimina el cliente de la base de datos
    res.status(200).json({ message: "Cliente eliminado con éxito", cliente: cliente });
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).send({ error: "Error al eliminar el cliente" });
  }
}

module.exports = { getClientes, crearCliente, actualizarCliente, eliminarCliente };
