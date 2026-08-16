import { Purchase, ContactUs, Product } from '../models/index.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Op } from 'sequelize';

export const getAnalyticsReports = asyncHandler(async (req, res) => {
  const serviceCalls = await ContactUs.count();
  const totalRevenueNum = await Purchase.sum('totalAmount') || 0;
  
  const formatRevenue = (num) => {
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return `${num}`;
  };
  const totalRevenue = formatRevenue(totalRevenueNum);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  const chartData = [];
  for (let i = 5; i >= 0; i--) {
    let d = new Date();
    d.setMonth(currentMonth - i);
    
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const endDate = `${nextYear}-${nextMonth.toString().padStart(2, '0')}-01`;

    const sales = await Purchase.count({
      where: {
        purchaseDate: { [Op.gte]: startDate, [Op.lt]: endDate }
      }
    });

    const services = await ContactUs.count({
      where: {
        createdAt: { [Op.gte]: startDate, [Op.lt]: endDate }
      }
    });

    chartData.push({
      name: months[d.getMonth()],
      sales,
      services
    });
  }

  const products = await Product.findAll({ limit: 3 });
  const colors = ["bg-blue-500", "bg-indigo-500", "bg-emerald-500"];
  
  const topModels = products.map((prod, index) => {
    const mockCount = Math.max(10, 100 - (index * 30));
    return {
      name: prod.name,
      count: mockCount,
      color: colors[index % colors.length],
      percent: `${mockCount}%`
    };
  });

  if (topModels.length === 0) {
    topModels.push({ name: "No products available", count: 0, color: "bg-slate-300", percent: "0%" });
  }

  const data = {
    chartData,
    topModels,
    totalRevenue,
    serviceCalls
  };
  
  return res.success(data, 'Reports fetched successfully', 200);
});
