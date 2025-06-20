const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/low-stock', productController.getLowStockProducts); 
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/:id/stock-in', productController.increaseStock);
router.post('/:id/stock-out', productController.decreaseStock);

module.exports = router;
