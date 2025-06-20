const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/ProductRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);


app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor corriendo' });
});


module.exports = app;
