const { EntitySchema } = require("typeorm");

const Asesores = new EntitySchema({
  name: "Asesores",
  tableName: "asesores",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    nombre: {
      type: "varchar"
    },
    dni: {
      type: "varchar"
    },
    rol: {
      type: "varchar"
    }
  }
});

module.exports = Asesores;