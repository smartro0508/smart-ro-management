import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes after this middleware require authentication
router.use(protect);

router.get('/', userController.getUsers);
router.get('/profile', userController.getUserProfile);

export default router;
