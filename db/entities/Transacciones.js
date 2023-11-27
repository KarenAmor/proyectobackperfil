const EntitySchema = require("typeorm").EntitySchema;

const Transacciones = new EntitySchema({
  name: "Transacciones",
  tableName: "transacciones",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    tarjeta: {
      type: "string",
      length: 25,
      nullable: false
    },
    fecha: {
      type: "date",
      nullable: false
    },
    monto: {
      type: "float",
      nullable: false
    },
    estado: {
      type: "string",
      length: 25,
      nullable: false
    },
    tipo_transaccion: {
      type: "string",
      length: 25,
      nullable: false
    }
  }
});

module.exports = Transacciones;