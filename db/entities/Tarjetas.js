const { EntitySchema } = require("typeorm");

const Tarjetas = new EntitySchema({
  name: "Tarjetas",
  tableName: "tarjetas",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    numero_tarjeta: {
      type: "varchar", 
      length: 25,
      nullable: false
    },
    codigo_seguridad: {
      type: "int",
      nullable: false
    },
    tipo_tarjeta: {
      type: "int",
      nullable: true
    },
    monto_disponible: {
      type: "float",
      nullable: true
    },
    estado_solicitud: {
      type: "varchar",
      length: 20,
      nullable: true
    },
    clienteId:{
      type: "int",
      nullable: true
    },
    fecha_creacion: {
      type: "datetime",
      createDate: true
    }
  },
  relations: {
    cliente: {
      type: "many-to-one",
      target: "Clientes",
      inverseSide: "numero_tarjeta", // Nombre de la propiedad en la entidad Clientes que se refiere a las tarjetas
    },
  },
});

module.exports = Tarjetas;