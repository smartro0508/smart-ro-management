import express from 'express';
import * as expenseController from '../controllers/expense.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/create', expenseController.createExpense);
router.post('/get-all', expenseController.getExpenses);
router.post('/get/:id', expenseController.getExpense);
router.post('/update/:id', expenseController.updateExpense);
router.post('/delete/:id', expenseController.deleteExpense);

export default router;
