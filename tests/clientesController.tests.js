const getClientes = require( "../controllers/clientesController.js")

describe("getClientes()", () => {
  it("should return a list of clients", async () => {
    const clientes = await getClientes();
    expect(clientes).toBeDefined();
    expect(clientes.length).toBeGreaterThan(0);
  });
});