import express from 'express';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';
import customerRoutes from './customer.routes.js';
import productRoutes from './product.routes.js';
import contactUsRoutes from './contactUs.routes.js';
import testimonialRoutes from './testimonial.routes.js';

const router = express.Router();

router.post('/health', (req, res) => {
  res.success({ status: 'UP' }, 'Server is running', 200);
});

router.use('/auth', authRoutes);
router.use('/admins', adminRoutes);
router.use('/customers', customerRoutes);
router.use('/products', productRoutes);
router.use('/contact-us', contactUsRoutes);
router.use('/testimonials', testimonialRoutes);

export default router;
