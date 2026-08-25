import express from 'express';
import * as invoiceServiceController from '../controllers/invoiceService.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/get-all', invoiceServiceController.getServices);
router.post('/get/:id', invoiceServiceController.getService);
router.post('/search', invoiceServiceController.searchServices);
router.use(protect);
router.post('/create', invoiceServiceController.createService);
router.post('/update/:id', invoiceServiceController.updateService);
router.post('/delete/:id', invoiceServiceController.deleteService);
export default router;