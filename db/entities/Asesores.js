const { EntitySchema } = require("typeorm");

const Asesores = new EntitySchema({
  name: "Asesores",
  tableName: "asesores",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
    },
    apellido: {
      type: "varchar",
    },
    dni: {
      type: "varchar",
    },
    rol: {
      type: "varchar",
    },
    telefono: {
      type: "varchar",
    },
    correo: {
      type: "varchar",
    },
    codigo_asesor: {
      type: "varchar",
    },
  },
});

module.exports = Asesores;
