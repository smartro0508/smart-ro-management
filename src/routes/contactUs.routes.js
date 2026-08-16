import express from 'express';
import * as contactUsController from '../controllers/contactUs.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public route to create a contact us message
router.post('/create', contactUsController.createContactUs);

// Secure routes for admin access
router.use(protect);

router.post('/get-all', contactUsController.getContactUsList);
router.post('/get/:id', contactUsController.getContactUs);
router.post('/update-status/:id', contactUsController.updateContactUsStatus);
router.post('/delete/:id', contactUsController.deleteContactUs);

export default router;
