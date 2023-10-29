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

  try {
    // Verifica si el usuario tiene el rol de asesor
    if (req.user.role !== "asesor") {
      return res.status(401).send({ message: "Acceso no autorizado" });
    }

    // Obtiene la tarjeta de la base de datos
    const tarjeta = await tarjetasRepository.findOne({
      where: { numero_tarjeta: numero_tarjeta },
    });

    if (!tarjeta) {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }

    // Obtiene el cliente de la base de datos
    const cliente = await clientRepository.findOne({
      where: { numero_tarjeta: numero_tarjeta },
    });

    if (!cliente) {
      return res.status(404).send({ message: "Cliente no encontrado" });
    }

    // Actualiza el estado de la solicitud de la tarjeta según el valor proporcionado en el cuerpo de la solicitud
    tarjeta.estado_solicitud = estado_solicitud;
    await tarjetasRepository.save(tarjeta);

    // Actualiza el tipo de tarjeta de la solicitud
    switch (cliente.sueldo_neto) {
      case 0 < cliente.sueldo_neto && cliente.sueldo_neto < 1000:
        tarjeta.tipo_tarjeta = 1; 
        break;
      case 1000 < cliente.sueldo_neto && cliente.sueldo_neto < 2000:
        tarjeta.tipo_tarjeta = 2; 
        break;
      case 2000 < cliente.sueldo_neto && cliente.sueldo_neto < 3000:
        tarjeta.tipo_tarjeta = 3; 
        break;
      case 3000 < cliente.sueldo_neto && cliente.sueldo_neto < 4000:
        tarjeta.tipo_tarjeta = 4; 
        break;
      default:
        tarjeta.tipo_tarjeta = 5; 
    }

    // Calcular y asignar el monto disponible
    tarjeta.monto_disponible = cliente.sueldo_neto * 2.7;

    // Asigna el id del cliente a la tarjeta
    tarjeta.clienteId = cliente.id;

    // Guarda la tarjeta actualizada en la base de datos
    await tarjetasRepository.save(tarjeta);
// Obtiene el producto asociado al tipo de tarjeta
const producto = await productosRepository.findOne({ where: { id: tarjeta.tipo_tarjeta } });

// Agrega la información del producto a la respuesta
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
// Aquí se envía el correo electrónico al cliente
const email = cliente.email; // Puedes cambiarlo para que sea el correo del cliente
const subject = 'Aprobación de tarjeta';
const templatePath = '../util/emailTemplate.html';

  await sendMail(email, subject, templatePath);

} catch (error) {
console.error("Error al aprobar la tarjeta:", error);
res.status(500).send({ error: "Error al aprobar la tarjeta" });
}
}

module.exports = { aprobarTarjeta };