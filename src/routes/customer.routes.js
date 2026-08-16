import express from 'express';
import * as customerController from '../controllers/customer.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // Secure all customer routes

router.post('/create', customerController.createCustomer);
router.post('/get-all', customerController.getCustomers);
router.post('/get/:id', customerController.getCustomer);
router.post('/update/:id', customerController.updateCustomer);
router.post('/delete/:id', customerController.deleteCustomer);

export default router;
