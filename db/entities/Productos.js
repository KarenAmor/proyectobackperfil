const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Productos",
  tableName: "productos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    nombre_producto: {
      type: "string",
      length: 25,
      nullable: false
    },
    intereses: {
      type: "float",
      nullable: false
    }
  }
});