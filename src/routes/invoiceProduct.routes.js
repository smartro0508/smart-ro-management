import express from 'express';
import * as invoiceProductController from '../controllers/invoiceProduct.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/get-all', invoiceProductController.getProducts);
router.post('/get/:id', invoiceProductController.getProduct);
router.post('/search', invoiceProductController.searchProducts);
router.use(protect);
router.post('/create', invoiceProductController.createProduct);
router.post('/update/:id', invoiceProductController.updateProduct);
router.post('/delete/:id', invoiceProductController.deleteProduct);
export default router;