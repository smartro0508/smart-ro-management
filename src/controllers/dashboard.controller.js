import { Product, Customer, Expense, Purchase, Invoice } from '../models/index.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Op } from 'sequelize';

const getMonthDates = (monthsAgo) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  const pad = (n) => n < 10 ? '0' + n : n;
  
  const startStr = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`;
  const endStr = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`;
  
  return { start: startStr, end: endStr, date: start };
};

export const getDashboardStats = asyncHandler(async (req, res) => {
  const activeProducts = await Product.count({ where: { status: 'active' } });
  const totalCustomers = await Customer.count();
  
  const expensesSum = await Expense.sum('amount') || 0;
  const purchasesSum = await Purchase.sum('totalAmount') || 0;
  const operatingExpenses = Number(expensesSum) + Number(purchasesSum);

  const grossVolume = await Invoice.sum('subtotal') || 0;
  const totalRevenue = await Invoice.sum('grandTotal') || 0;
  
  const chartData = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const promises = [];
  
  for (let i = 11; i >= 0; i--) {
    const { start, end, date } = getMonthDates(i);
    const monthName = monthNames[date.getMonth()];
    
    promises.push((async () => {
      const monthRevenue = await Invoice.sum('grandTotal', {
        where: { invoiceDate: { [Op.gte]: start, [Op.lte]: end } }
      }) || 0;

      const monthExp = await Expense.sum('amount', {
        where: { date: { [Op.gte]: start, [Op.lte]: end } }
      }) || 0;
      
      const monthPur = await Purchase.sum('totalAmount', {
        where: { purchaseDate: { [Op.gte]: start, [Op.lte]: end } }
      }) || 0;
      
      const monthExpenses = Number(monthExp) + Number(monthPur);
      const monthProfit = Number(monthRevenue) - monthExpenses;
      
      return {
        name: monthName,
        revenue: Number(monthRevenue),
        profit: Number(monthProfit),
        index: i
      };
    })());
  }
  
  const results = await Promise.all(promises);
  results.sort((a, b) => b.index - a.index);
  
  results.forEach(r => {
    chartData.push({
      name: r.name,
      revenue: r.revenue,
      profit: r.profit
    });
  });

  const data = {
    grossVolume: Number(grossVolume), 
    totalRevenue: Number(totalRevenue), 
    outstandingBalances: 0, 
    activeProducts,
    totalCustomers,
    operatingExpenses,
    chartData
  };
  return res.success(data, 'Dashboard fetched successfully', 200);
});

// Trigger nodemon restart
