const app = require('./index');
const mongoose = require('mongoose');

const port = 3000;

mongoose.connect('mongodb://localhost:27017/product-db')
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB', err);
  });
