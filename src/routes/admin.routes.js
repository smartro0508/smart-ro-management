import express from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/get-all', adminController.getAdmins);
router.post('/get-profile', adminController.getAdminProfile);

export default router;
