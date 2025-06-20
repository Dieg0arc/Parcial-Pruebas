const mongoose = require('mongoose');
const Product = require('../models/Product');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/product-db-test');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

beforeEach(async () => {
  await Product.deleteMany();
});

describe('Lógica de negocio de productos', () => {
  it('debe crear un producto', async () => {
    const p = await Product.create({
      name: 'Laptop',
      price: 2500000,
      stock: 5,
      category: 'Tecnología'
    });
    expect(p._id).toBeDefined();
    expect(p.name).toBe('Laptop');
  });

  it('debe actualizar stock', async () => {
    const p = await Product.create({
      name: 'Mouse',
      price: 50000,
      stock: 10,
      category: 'Periféricos'
    });
    p.stock += 5;
    const updated = await p.save();
    expect(updated.stock).toBe(15);
  });

  it('debe eliminar un producto', async () => {
    const p = await Product.create({
      name: 'Teclado',
      price: 80000,
      stock: 20,
      category: 'Periféricos'
    });
    await Product.findByIdAndDelete(p._id);
    const deleted = await Product.findById(p._id);
    expect(deleted).toBeNull();
  });
});
