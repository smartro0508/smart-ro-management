import { Product, Customer, Expense, Purchase } from '../models/index.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const activeProducts = await Product.count({ where: { status: 'Active' } });
  const totalCustomers = await Customer.count();
  
  const expenses = await Expense.sum('amount') || 0;
  const purchases = await Purchase.sum('totalAmount') || 0;
  
  const data = {
    grossVolume: purchases, 
    totalRevenue: 845650, 
    outstandingBalances: 32500, 
    activeProducts,
    totalCustomers,
    operatingExpenses: expenses,
    chartData: [
      { name: 'Jan', revenue: 400000, profit: 240000 },
      { name: 'Feb', revenue: 300000, profit: 139800 },
      { name: 'Mar', revenue: 200000, profit: 98000 },
      { name: 'Apr', revenue: 278000, profit: 190800 },
      { name: 'May', revenue: 189000, profit: 48000 },
      { name: 'Jun', revenue: 239000, profit: 138000 },
      { name: 'Jul', revenue: 349000, profit: 230000 },
      { name: 'Aug', revenue: 420000, profit: 280000 },
      { name: 'Sep', revenue: 510000, profit: 340000 },
      { name: 'Oct', revenue: 480000, profit: 310000 },
      { name: 'Nov', revenue: 600000, profit: 410000 },
      { name: 'Dec', revenue: 845650, profit: 530000 },
    ]
  };
  return res.success(data, 'Dashboard fetched successfully', 200);
});
