const { EntitySchema } = require("typeorm");

const Transacciones = new EntitySchema({
  name: "Transacciones",
  tableName: "transacciones",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    tarjeta: {
      type: "varchar",
      length: 25,
      nullable: false,
    },
    fecha: {
      type: "datetime",
      nullable: false,
    },
    monto: {
      type: "decimal",
      precision: 10, // Ajusta según tus necesidades
      scale: 2, // Ajusta según tus necesidades
      nullable: false,
    },
    estado: {
      type: "varchar",
      length: 25,
      nullable: false,
    },
    tipo_transaccion: {
      type: "enum",
      enum: ["compra", "retiro", "transferencia"],
      nullable: false,
    },
    intereses: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true, // Puede ser nulo si no aplica
    },
    cuota_manejo: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true, // Puede ser nulo si no aplica
    },
    valor_total_pagar: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
  },
});

module.exports = Transacciones;