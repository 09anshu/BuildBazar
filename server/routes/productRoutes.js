const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getSellerProducts,
  getRecommendations,
} = require('../controllers/productController');
const { protect, admin, seller } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, seller, createProduct);
router.route('/seller').get(protect, seller, getSellerProducts);
router.get('/top', getTopProducts);
router.get('/:id/recommendations', getRecommendations);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, seller, deleteProduct)
  .put(protect, seller, updateProduct);
router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;
