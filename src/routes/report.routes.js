import express from 'express';
import * as reportController from '../controllers/report.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(protect);
router.post('/get', reportController.getAnalyticsReports);

export default router;
