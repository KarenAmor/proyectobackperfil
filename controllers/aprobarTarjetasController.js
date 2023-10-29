const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Tarjetas = require("../db/entities/Tarjetas");
const Clientes = require("../db/entities/Clientes");
const Productos = require("../db/entities/Productos");
const sendMail = require('../util/correoAprobacionTarjeta');

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

    res.send({
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
await sendMail(email, subject, templatePath, cliente.nombre, cliente.apellido, tarjeta.numero_tarjeta, categoria, tarjeta.monto_disponible);
  } catch (error) {
    console.error("Error al aprobar la tarjeta:", error);
    res.status(500).send({ error: "Error al aprobar la tarjeta" });
  }
}

module.exports = { aprobarTarjeta };