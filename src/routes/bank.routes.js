import express from 'express';
import * as bankController from '../controllers/bank.controller.js';
import { validateBank } from '../validators/bank.validator.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // Secure all bank routes

router.post('/create', validateBank, bankController.createBank);
router.post('/update', validateBank, bankController.updateBank);
router.post('/get', bankController.getBank);

export default router;
