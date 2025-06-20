const Product = require('../models/Product');

describe('Validación de producto', () => {
  it('debe fallar si faltan campos obligatorios', async () => {
    const p = new Product({});
    let err;
    try {
      await p.save();
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
    expect(err.errors.name).toBeDefined();
    expect(err.errors.price).toBeDefined();
    expect(err.errors.stock).toBeDefined();
    expect(err.errors.category).toBeDefined();
  });
});
