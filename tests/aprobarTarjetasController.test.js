const aprobarTarjetasController = require('../controllers/aprobarTarjetasController');
const request = require('supertest');
const app = require('../index'); // asegúrate de reemplazar 'index' con el nombre correcto de tu archivo principal

describe('Pruebas para el controlador de Tarjetas', () => {
  it('Debería obtener todas las tarjetas', async () => {
    const response = await request(app).get('/aprobar-tarjeta'); // Deberías usar la ruta definida en tu archivo de rutas
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('tarjetas');
  });

  it('Debería aprobar una tarjeta', async () => {
    // Aquí deberías definir un objeto tarjeta con los datos necesarios
    const tarjeta = {
      // ...detalles de la tarjeta...
    };
    const response = await request(app).post('/aprobar-tarjeta').send(tarjeta); // Deberías usar la ruta definida en tu archivo de rutas
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Tarjeta aprobada con éxito');
  });

  it('Debería eliminar una tarjeta', async () => {
    const response = await request(app).delete('/aprobar-tarjeta/6'); // Asegúrate de que el id exista en tu base de datos y usa la ruta definida en tu archivo de rutas
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Tarjeta eliminada con éxito');
  });
});

afterAll((done) => {
  server.close();
  done();
});
