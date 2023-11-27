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
    codigo_asesor: {
      type: "varchar", // Adjust the type based on the data type you intend to use for the codigo_asesor column
      nullable: true, // Adjust the nullable property based on your requirements
    },
  },
  relations: {
    asesor: {
      type: "many-to-many",
      target: "Asesores",
      joinColumn: {
        name: "codigo_asesor",
        referencedColumnName: "codigo_asesor",
      },
    },
    producto: {
      type: "many-to-one",
      target: "Productos",
      joinColumn: {
        name: "productoId",
        referencedColumnName: "id",
      },
    },
  },
});

module.exports = Clientes;