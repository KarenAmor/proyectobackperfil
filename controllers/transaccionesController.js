const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Transacciones = require("../db/entities/Transacciones");

async function realizarTransaccion(transaccionData) {
  const connection = await connectToDatabase();
  const transaccionesRepository = getRepository(Transacciones);

  try {
    // Puedes ajustar la lógica según tus necesidades
    const nuevaTransaccion = new Transacciones();
    nuevaTransaccion.tarjeta = transaccionData.tarjeta;
    nuevaTransaccion.fecha = new Date();
    nuevaTransaccion.monto = transaccionData.monto;
    nuevaTransaccion.estado = "pendiente"; // Puedes ajustar el estado según tus necesidades

    switch (transaccionData.tipo_transaccion) {
      case "compra":
        nuevaTransaccion.tipo_transaccion = "compra";
        nuevaTransaccion.intereses = calcularInteresesCompra(transaccionData.monto);
        nuevaTransaccion.cuota_manejo = calcularCuotaManejo();
        nuevaTransaccion.valor_total_pagar =
          transaccionData.monto + nuevaTransaccion.intereses + nuevaTransaccion.cuota_manejo;
        break;
      case "retiro":
        nuevaTransaccion.tipo_transaccion = "retiro";
        nuevaTransaccion.intereses = calcularInteresesRetiro(transaccionData.monto);
        nuevaTransaccion.cuota_manejo = calcularCuotaManejo();
        nuevaTransaccion.valor_total_pagar =
          transaccionData.monto + nuevaTransaccion.intereses + nuevaTransaccion.cuota_manejo;
        break;
      case "transferencia":
        nuevaTransaccion.tipo_transaccion = "transferencia";
        // Agrega lógica específica para transferencias si es necesario
        break;
      default:
        console.error("Tipo de transacción no válido");
        return;
    }

    // Guarda la nueva transacción en la base de datos
    await transaccionesRepository.save(nuevaTransaccion);

    // Realiza otras operaciones según tus necesidades, por ejemplo, actualizar el saldo del cliente, etc.

  } catch (error) {
    console.error("Error al realizar la transacción:", error);
  } finally {
    // Cierra la conexión a la base de datos cuando hayas terminado
    await connection.close();
  }
}

// Funciones de ejemplo para calcular intereses y cuota de manejo
function calcularInteresesCompra(monto) {
  // Implementa la lógica para calcular intereses de compra
  return 0.1 * monto; // Ejemplo: 10% del monto
}

function calcularInteresesRetiro(monto) {
  // Implementa la lógica para calcular intereses de retiro
  return 0.05 * monto; // Ejemplo: 5% del monto
}

function calcularCuotaManejo() {
  // Implementa la lógica para calcular la cuota de manejo
  return 10.0; // Ejemplo: Cuota fija de 10 unidades
}

module.exports = { realizarTransaccion };