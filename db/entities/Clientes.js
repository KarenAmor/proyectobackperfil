const { EntitySchema } = require("typeorm");

const Clientes = new EntitySchema({
  name: "Clientes",
  tableName: "clientes",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
      length: 25,
      nullable: false,
    },
    apellido: {
      type: "varchar",
      length: 25,
      nullable: false,
    },
    numero_tarjeta: {
      type: "varchar",
      length: 25,
      nullable: false,
      unique: true,
    },
    dni: {
      type: "int",
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 25,
      nullable: false,
    },
    sueldo_neto: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
  },
  relations: {
    tarjetas: {
      type: "one-to-many",
      target: "Tarjetas",
      inverseSide: "numero_tarjeta", // Asegúrate de que coincida con el nombre de la propiedad en la entidad Tarjetas
    },
    producto: {
      type: "many-to-one",
      target: "Productos",
      joinColumn: {
        name: "productoId",
        referencedColumnName: "id",
      },
    }, // Aquí se añadió la llave de cierre que faltaba
  },
});

module.exports = Clientes;