import React, { useState, useEffect } from 'react';
import { Download, TrendingUp, DollarSign, FileText, Calendar, Loader2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

export function FinancialReporting() {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  const [reportType, setReportType] = useState('revenue');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const res = await api.get('/reports/financial');
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch financial data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFinance();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Aggregate invoices by month
  const monthlyMap: Record<string, any> = {};
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  data.invoices.forEach((inv: any) => {
    const d = new Date(inv.issuedAt);
    const m = monthNames[d.getMonth()];
    if (!monthlyMap[m]) {
      monthlyMap[m] = { month: m, revenue: 0, cost: 0, profit: 0, count: 0 };
    }
    monthlyMap[m].revenue += inv.amount;
    monthlyMap[m].cost += inv.amount * 0.6; // Mocking 60% cost for now
    monthlyMap[m].profit += inv.amount * 0.4;
    monthlyMap[m].count++;
  });

  const monthlyRevenue = monthNames.map(m => monthlyMap[m] || { month: m, revenue: 0, cost: 0, profit: 0, count: 0 });

  // Aggregate by Tour Type - We'll just group by Tour Name for now since Tour Type isn't in model
  const tourMap: Record<string, number> = {};
  let totalRev = 0;
  data.invoices.forEach((inv: any) => {
    const tName = inv.booking?.tour?.name || 'Unknown Tour';
    tourMap[tName] = (tourMap[tName] || 0) + inv.amount;
    totalRev += inv.amount;
  });

  const tourTypeRevenue = Object.entries(tourMap).map(([name, value]) => ({
    name: name.substring(0, 15) + '...',
    value,
    percentage: Math.round((value / totalRev) * 100) || 0
  })).sort((a, b) => b.value - a.value).slice(0, 5);

  const quarterlyComparison = [
    { quarter: 'Q1 2024', revenue: 145000, bookings: 256 },
    { quarter: 'Q2 2024', revenue: 183000, bookings: 312 },
    { quarter: 'Q3 2024', revenue: 231000, bookings: 389 },
    { quarter: 'Q4 2024', revenue: 258000, bookings: 428 },
    { quarter: 'Q1 2025', revenue: data.totalRevenue, bookings: data.invoiceCount }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Financial Reports</h1>
          <p className="text-gray-600">Comprehensive financial analytics and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-10 h-10 opacity-80" />
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="text-3xl mb-1">{formatCurrency(data.totalRevenue)}</div>
          <div className="text-blue-100">Total Revenue (All Time)</div>
          <div className="text-sm mt-2 text-blue-100">+18.5% vs 2024</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-10 h-10 opacity-80" />
            <div className="text-sm bg-white/20 px-2 py-1 rounded">+22%</div>
          </div>
          <div className="text-3xl mb-1">{formatCurrency(data.totalRevenue * 0.4)}</div>
          <div className="text-green-100">Estimated Profit</div>
          <div className="text-sm mt-2 text-green-100">Margin: ~40%</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-10 h-10 opacity-80" />
            <div className="text-sm bg-white/20 px-2 py-1 rounded">+15%</div>
          </div>
          <div className="text-3xl mb-1">{data.invoiceCount}</div>
          <div className="text-orange-100">Total Paid Invoices</div>
          <div className="text-sm mt-2 text-orange-100">Avg: {formatCurrency(data.totalRevenue / data.invoiceCount || 0)}/invoice</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-10 h-10 opacity-80" />
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="text-3xl mb-1">{formatCurrency(monthlyRevenue[new Date().getMonth()]?.revenue || 0)}</div>
          <div className="text-purple-100">This Month's Revenue</div>
          <div className="text-sm mt-2 text-purple-100">Best performing month</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl text-gray-900 mb-6">Revenue & Profit Trend (2025)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Tour Type */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl text-gray-900 mb-6">Revenue by Tour Type</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tourTypeRevenue}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tourTypeRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Quarterly Comparison */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl text-gray-900 mb-6">Quarterly Revenue Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quarterlyComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl text-gray-900 mb-6">Revenue vs Cost Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
              <Bar dataKey="cost" fill="#EF4444" name="Cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl text-gray-900">Monthly Financial Summary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Month</th>
                <th className="text-right py-4 px-6 text-sm text-gray-700">Revenue</th>
                <th className="text-right py-4 px-6 text-sm text-gray-700">Cost</th>
                <th className="text-right py-4 px-6 text-sm text-gray-700">Profit</th>
                <th className="text-right py-4 px-6 text-sm text-gray-700">Margin %</th>
                <th className="text-right py-4 px-6 text-sm text-gray-700">Growth %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monthlyRevenue.map((data, index) => {
                const margin = ((data.profit / data.revenue) * 100).toFixed(1);
                const growth = index > 0
                  ? (((data.revenue - monthlyRevenue[index - 1].revenue) / monthlyRevenue[index - 1].revenue) * 100).toFixed(1)
                  : '0.0';
                
                return (
                  <tr key={data.month} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-900">{data.month} 2025</td>
                    <td className="py-4 px-6 text-right text-gray-900">${data.revenue.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right text-gray-700">${data.cost.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right text-green-600">${data.profit.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right text-gray-700">{margin}%</td>
                    <td className="py-4 px-6 text-right">
                      <span className={Number(growth) >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {Number(growth) >= 0 ? '+' : ''}{growth}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-300">
              <tr>
                <td className="py-4 px-6 text-gray-900">Total</td>
                <td className="py-4 px-6 text-right text-gray-900">
                  ${monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0).toLocaleString()}
                </td>
                <td className="py-4 px-6 text-right text-gray-900">
                  ${monthlyRevenue.reduce((sum, m) => sum + m.cost, 0).toLocaleString()}
                </td>
                <td className="py-4 px-6 text-right text-green-600">
                  ${monthlyRevenue.reduce((sum, m) => sum + m.profit, 0).toLocaleString()}
                </td>
                <td className="py-4 px-6 text-right text-gray-900">
                  {((monthlyRevenue.reduce((sum, m) => sum + m.profit, 0) / monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0)) * 100).toFixed(1)}%
                </td>
                <td className="py-4 px-6"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
