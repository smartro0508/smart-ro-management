import express from 'express';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';
import customerRoutes from './customer.routes.js';
import productRoutes from './product.routes.js';
import contactUsRoutes from './contactUs.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import expenseRoutes from './expense.routes.js';
import purchaseRoutes from './purchase.routes.js';

import dashboardRoutes from './dashboard.routes.js';
import reportRoutes from './report.routes.js';
import settingRoutes from './setting.routes.js';
import invoiceRoutes from './invoice.routes.js';

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
router.use('/expenses', expenseRoutes);
router.use('/purchases', purchaseRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/reports', reportRoutes);
router.use('/settings', settingRoutes);

export default router;
