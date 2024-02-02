const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Clientes = require("../db/entities/Clientes");
const Credenciales = require("../db/entities/Credenciales");
const Tarjetas = require("../db/entities/Tarjetas");
const Asesores = require("../db/entities/Asesores"); // Ajusta la ruta según la ubicación real de tus entidades
const Productos = require("../db/entities/Productos"); // Ajusta la ruta según la ubicación real de tus entidades

const bcrypt = require('bcryptjs');

const ESTADO_SOLICITUD_PENDIENTE = "pendiente";

async function getClientes(req, res) {
  try {
    const connection = await connectToDatabase();
    const clientRepository = getRepository(Clientes);
    const clientes = await clientRepository.find();
    res.status(200).json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).send({ error: "Hubo un error al obtener clientes" });
  }
}

function generarNumeroTarjeta() {
  return Math.floor(Math.random() * 99999999999) + 10000000000;
}

function generarCodigoSeguridad() {
  return Math.floor(100 + Math.random() * 900);
}

async function crearCliente(req, res) {
  try {
    const connection = await connectToDatabase();
    const clientRepository = getRepository(Clientes);
    const credentialsRepository = getRepository(Credenciales);
    const tarjetasRepository = getRepository(Tarjetas);

    // Validar datos de entrada
    const { nombre, apellido, dni, email, sueldo_neto, codigo_asesor, password } = req.body;
    if (!nombre || !apellido || !dni || !email || !sueldo_neto || !codigo_asesor || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios para crear el cliente" });
    }

    const cliente = {
      nombre,
      apellido,
      numero_tarjeta: generarNumeroTarjeta(),
      dni,
      email,
      sueldo_neto,
      codigo_asesor
    };

    const tarjeta = tarjetasRepository.create({
      numero_tarjeta: cliente.numero_tarjeta,
      codigo_seguridad: generarCodigoSeguridad(),
      estado_solicitud: req.body.estado_solicitud || ESTADO_SOLICITUD_PENDIENTE,
    });

    const clienteNuevo = await clientRepository.save(cliente);
    const clienteId = clienteNuevo.id;

    tarjeta.clienteId = clienteId;
    const newTarjeta = await tarjetasRepository.save(tarjeta);
    const hashedPassword = await bcrypt.hash(password, 10);

    const credenciales = {
      dni,
      password: hashedPassword,
    };

    await credentialsRepository.save(credenciales);
    res.status(201).json({ message: "Cliente y credenciales creadas con éxito", cliente: clienteNuevo, tarjeta: newTarjeta, credenciales: credenciales });
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    res.status(500).send({ error: "Hubo un error al crear el cliente y sus credenciales" });
  }
}

async function actualizarCliente(req, res) {
  try {
    const connection = await connectToDatabase();
    const clientRepository = getRepository(Clientes);

    const { id } = req.params;
    const cliente = await clientRepository.findOne({ where: { id } });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Actualiza solo los campos proporcionados en la solicitud
    Object.assign(cliente, req.body);

    await clientRepository.save(cliente);
    res.status(200).json({ message: "Cliente actualizado con éxito", cliente });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    res.status(500).send({ error: "Hubo un error al actualizar el cliente" });
  }
}

async function eliminarCliente(req, res) {
  try {
    const connection = await connectToDatabase();
    const clientRepository = getRepository(Clientes);

    const { id } = req.params;
    const cliente = await clientRepository.findOne({ where: { id } });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    await clientRepository.remove(cliente);
    res.status(200).json({ message: "Cliente eliminado con éxito", cliente });
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).send({ error: "Hubo un error al eliminar el cliente" });
  }
}

module.exports = { getClientes, crearCliente, actualizarCliente, eliminarCliente };