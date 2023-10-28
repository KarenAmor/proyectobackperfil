const EntitySchema = require("typeorm").EntitySchema;

const Productos = new EntitySchema({
  name: "Productos",
  tableName: "productos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    nombre_producto: {
      type: "varchar",
      length: 25,
      nullable: false
    },
    intereses: {
      type: "float",
      nullable: false
    }
  }
});
module.exports = Productos;