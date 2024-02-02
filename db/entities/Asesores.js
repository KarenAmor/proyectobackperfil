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
  relations: {
    clientes: {
      type: "many-to-many",
      target: "Clientes",
      inverseJoinColumn: {
        name: "codigo_asesor",
        referencedColumnName: "codigo_asesor",
      },
    },
  },
});

module.exports = Asesores;
