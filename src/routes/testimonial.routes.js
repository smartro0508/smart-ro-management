import express from 'express';
import * as testimonialController from '../controllers/testimonial.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public route to submit a testimonial
router.post('/create', testimonialController.createTestimonial);

// Public route to get active testimonials
router.post('/get-active', testimonialController.getActiveTestimonials);

// Secure routes for admin access
router.use(protect);

router.post('/get-all', testimonialController.getTestimonials);
router.post('/get/:id', testimonialController.getTestimonial);
router.post('/update-status/:id', testimonialController.updateTestimonialStatus);
router.post('/delete/:id', testimonialController.deleteTestimonial);

export default router;
