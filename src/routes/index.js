import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.success({ status: 'UP' }, 'Server is running', 200);
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
