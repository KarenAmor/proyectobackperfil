const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Tarjetas = require("../db/entities/Tarjetas");
const Clientes = require("../db/entities/Clientes");
const Productos = require("../db/entities/Productos");
const sendMail = require('../util/correoAprobacionTarjeta');

async function getTarjetas(req, res) {
  const connection = await connectToDatabase();
  const tarjetasRepository = getRepository(Tarjetas);

  try {
    const { id, numero_tarjeta, tipo_tarjeta, estado_solicitud, fecha_creacion } = req.query;

    let query = tarjetasRepository.createQueryBuilder('tarjetas');

    if (id) {
      query = query.where('tarjetas.id = :id', { id });
    }

    if (numero_tarjeta) {
      query = query.andWhere('tarjetas.numero_tarjeta = :numero_tarjeta', { numero_tarjeta });
    }

    if (tipo_tarjeta) {
      query = query.andWhere('tarjetas.tipo_tarjeta = :tipo_tarjeta', { tipo_tarjeta });
    }

    if (estado_solicitud) {
      query = query.andWhere('tarjetas.estado_solicitud = :estado_solicitud', { estado_solicitud });
    }

    if (fecha_creacion) {
      query = query.andWhere('tarjetas.fecha_creacion = :fecha_creacion', { fecha_creacion });
    }

    const tarjetas = await query.getMany();

    res.status(200).json(tarjetas);
  } catch (error) {
    console.error("Error al obtener las tarjetas:", error);
    res.status(500).send({ error: "Error al obtener las tarjetas" });
  }
}

async function aprobarTarjeta(req, res) {
  const connection = await connectToDatabase();
  const tarjetasRepository = getRepository(Tarjetas);
  const clientRepository = getRepository(Clientes);
  const productosRepository = getRepository(Productos);

  const { numero_tarjeta, estado_solicitud } = req.body;
  let categoria = "";

  try {
    if (req.user.role !== "asesor") {
      return res.status(401).send({ message: "Acceso no autorizado" });
    }

    const tarjeta = await tarjetasRepository.findOne({
      where: { numero_tarjeta: numero_tarjeta },
    });

    if (!tarjeta) {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }

    const cliente = await clientRepository.findOne({
      where: { numero_tarjeta: numero_tarjeta },
    });

    if (!cliente) {
      return res.status(404).send({ message: "Cliente no encontrado" });
    }

    tarjeta.estado_solicitud = estado_solicitud;
    await tarjetasRepository.save(tarjeta);

    // Corregir el switch
    if (cliente.sueldo_neto > 0 && cliente.sueldo_neto < 1000) {
      tarjeta.tipo_tarjeta = 5;
      categoria = "Bronce";
    } else if (cliente.sueldo_neto >= 1000 && cliente.sueldo_neto < 2000) {
      tarjeta.tipo_tarjeta = 4;
      categoria = "Plata";
    } else if (cliente.sueldo_neto >= 2000 && cliente.sueldo_neto < 3000) {
      tarjeta.tipo_tarjeta = 3;
      categoria = "Oro";
    } else if (cliente.sueldo_neto >= 3000 && cliente.sueldo_neto < 4000) {
      tarjeta.tipo_tarjeta = 2;
      categoria = "Platino";
    } else {
      tarjeta.tipo_tarjeta = 1;
      categoria = "Diamante";
    }

    tarjeta.monto_disponible = cliente.sueldo_neto * 2.7;
    tarjeta.clienteId = cliente.id;

    await tarjetasRepository.save(tarjeta);

    const producto = await productosRepository.findOne({ where: { id: tarjeta.tipo_tarjeta } });

    res.status(201).json({
      message: "Tarjeta aprobada con éxito",
      tarjeta: {
        ...tarjeta,
        producto_adquirido: {
          id: producto.id,
          nombre_producto: producto.nombre_producto,
          intereses: producto.intereses
        }
      }
    });

const email = cliente.email;
const subject = 'Aprobación de tarjeta';
const templatePath = '../util/emailTemplate.html';

// Llamar a la función sendMail con los valores necesarios
if (estado_solicitud !== 'rechazado') {
  await sendMail(email, subject, templatePath, cliente.nombre, cliente.apellido, tarjeta.numero_tarjeta, categoria, tarjeta.monto_disponible);
}

} catch (error) {
    console.error("Error al aprobar la tarjeta:", error);
    res.status(500).send({ error: "Error al aprobar la tarjeta" });
  }
}
async function eliminarTarjeta(req, res) {
  try {
    const connection = await connectToDatabase();
    const tarjetasRepository = getRepository(Tarjetas);
    const { id } = req.params;

    if (req.user.role !== "asesor") {
      return res.status(401).send({ message: "Acceso no autorizado" });
    }

    const tarjeta = await tarjetasRepository.findOne({ where: { id: id } });

    if (!tarjeta) {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }

    await tarjetasRepository.remove(tarjeta);

    res.status(200).json({ message: "Tarjeta eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la tarjeta:", error);
    res.status(500).send({ error: "Error al eliminar la tarjeta" });
  }
}

module.exports = { getTarjetas, aprobarTarjeta, eliminarTarjeta };