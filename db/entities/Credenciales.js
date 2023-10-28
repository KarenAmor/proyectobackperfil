const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Credenciales",
  tableName: "credenciales",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    dni: {
      type: "int",
      nullable: false,
      unique: true,
    },
    password: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
  },
});