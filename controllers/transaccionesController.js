const { getRepository } = require("typeorm");
const Transacciones = require("../db/entities/Transacciones");

// Ejemplo de uso de la entidad de transacciones
async function realizarTransaccion(transaccionData) {
  const connection = await connectToDatabase();
  const transaccionesRepository = getRepository(Transacciones);

  try {
    // Crear una nueva transacción
    const nuevaTransaccion = transaccionesRepository.create(transaccionData);

    // Guardar la transacción en la base de datos
    await transaccionesRepository.save(nuevaTransaccion);

    // Otras operaciones con la entidad de transacciones...

  } catch (error) {
    console.error("Error al realizar la transacción:", error);
    // Manejar el error
  }
}
module.exports = { realizarTransaccion };