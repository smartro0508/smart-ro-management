import express from 'express';
import * as invoiceController from '../controllers/invoice.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/create', invoiceController.createInvoice);
router.post('/get-all', invoiceController.getInvoices);
router.post('/get/:id', invoiceController.getInvoiceById);
router.post('/update/:id', invoiceController.updateInvoice);
router.post('/delete/:id', invoiceController.deleteInvoice);

export default router;
