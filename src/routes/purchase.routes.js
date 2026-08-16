import express from 'express';
import * as purchaseController from '../controllers/purchase.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/create', purchaseController.createPurchase);
router.post('/get-all', purchaseController.getPurchases);
router.post('/get/:id', purchaseController.getPurchase);
router.post('/update/:id', purchaseController.updatePurchase);
router.post('/delete/:id', purchaseController.deletePurchase);

export default router;
