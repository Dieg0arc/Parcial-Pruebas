const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const Product = require('../models/Product');

beforeAll(async () => {
await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/product-db-test');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Pruebas de integración de productos', () => {
  let productId;

  beforeEach(async () => {
    await Product.deleteMany();

    const producto = await Product.create({
      name: 'Tablet',
      price: 1200000,
      stock: 10,
      category: 'Tecnología'
    });

    productId = producto._id;
  });

  it('debe crear un producto vía API', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Audífonos',
      price: 80000,
      stock: 12,
      category: 'Electrónica'
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Audífonos');
    expect(res.body._id).toBeDefined();
  });

  it('debe listar productos vía API', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debe existir al menos un producto guardado en la base de datos', async () => {
    const productos = await Product.find();
    expect(productos.length).toBeGreaterThan(0);
  });

  it('debe incrementar el stock correctamente', async () => {
    const res = await request(app)
      .post(`/api/products/${productId}/stock-in`)
      .send({ amount: 5 });

    expect(res.status).toBe(200);
    expect(res.body.stock).toBe(15); 
  });
});
