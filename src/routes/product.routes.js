import express from 'express';
import * as productController from '../controllers/product.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadProductImages } from '../middleware/upload.middleware.js';
import { resizeProductImages } from '../middleware/imageResize.middleware.js';

const router = express.Router();

router.use(protect);

router.post(
  '/create',
  uploadProductImages,
  resizeProductImages,
  productController.createProduct
);
router.post('/get-all', productController.getProducts);
router.post('/get/:id', productController.getProduct);
router.post(
  '/update/:id',
  uploadProductImages,
  resizeProductImages,
  productController.updateProduct
);
router.post('/delete/:id', productController.deleteProduct);

export default router;
