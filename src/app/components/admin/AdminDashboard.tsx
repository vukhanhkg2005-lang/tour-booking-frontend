import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Users, MapPin, FileText, DollarSign, Loader2 } from 'lucide-react';
import { StaffDashboard } from './StaffDashboard';
import { GuideSchedules } from './GuideSchedules';
import api from '../../services/api';

interface AdminDashboardProps {
  userRole: 'staff' | 'accountant' | 'manager' | 'guide';
}

export function AdminDashboard({ userRole }: AdminDashboardProps) {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userRole === 'staff') return; // Handled by StaffDashboard

    const fetchDashboardData = async () => {
      try {
        const endpoint = userRole === 'manager' || userRole === 'accountant' 
          ? '/reports/general' 
          : '/reports/general';
        const res = await api.get(endpoint);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userRole]);

  // If staff role, show the dedicated staff dashboard
  if (userRole === 'staff') {
    return <StaffDashboard />;
  }

  // If guide role, show the guide schedules dashboard
  if (userRole === 'guide') {
    return <GuideSchedules />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
  };

  const accountantStats = [
    {
      label: 'Total Revenue',
      value: formatCurrency(data?.totalRevenue || 0),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Total Bookings',
      value: data?.totalBookings || 0,
      change: '+5',
      trend: 'up',
      icon: FileText,
      color: 'orange'
    },
    {
      label: 'Confirmed Bookings',
      value: data?.confirmedBookings || 0,
      change: '+2',
      trend: 'up',
      icon: DollarSign,
      color: 'blue'
    },
    {
      label: 'Active Tours',
      value: data?.totalTours || 0,
      change: '+1',
      trend: 'up',
      icon: FileText,
      color: 'purple'
    }
  ];

  const managerStats = [
    {
      label: 'Total Employees / Users',
      value: data?.totalUsers || 0,
      change: '+2',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Active Tours',
      value: data?.totalTours || 0,
      change: '+3',
      trend: 'up',
      icon: MapPin,
      color: 'green'
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(data?.totalRevenue || 0),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Total Bookings',
      value: data?.totalBookings || 0,
      change: '+14',
      trend: 'up',
      icon: FileText,
      color: 'purple'
    }
  ];

  const getStats = () => {
    switch (userRole) {
      case 'accountant':
        return accountantStats;
      case 'manager':
        return managerStats;
      default:
        return [];
    }
  };

  const stats = getStats();

  // Create real recent activities based on recentBookings
  const recentActivities = (data?.recentBookings || []).map((booking: any) => {
    return {
      action: `New Booking: ${booking.tour?.name || 'Tour'}`,
      detail: `By ${booking.user?.name || booking.user?.email || 'Customer'} - ${booking.participants} participants`,
      time: new Date(booking.bookingDate).toLocaleDateString()
    };
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            orange: 'from-orange-500 to-orange-600',
            red: 'from-red-500 to-red-600',
            purple: 'from-purple-500 to-purple-600'
          };

          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${
                    colorClasses[stat.color as keyof typeof colorClasses]
                  } rounded-lg flex items-center justify-center text-white`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl text-gray-900 mb-6">Recent Bookings / Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.detail}</div>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</div>
                </div>
              ))}
              {recentActivities.length === 0 && (
                <p className="text-gray-500 text-sm">No recent activities found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {userRole === 'accountant' && (
                <>
                  <button onClick={() => navigate('/admin/invoices')} className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-left">
                    Create New Invoice
                  </button>
                  <button onClick={() => navigate('/admin/refunds')} className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    Process Refunds
                  </button>
                  <button onClick={() => navigate('/admin/reports')} className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    Generate Report
                  </button>
                </>
              )}
              {userRole === 'manager' && (
                <>
                  <button onClick={() => navigate('/admin/employees')} className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-left">
                    Manage Employees
                  </button>
                  <button onClick={() => navigate('/admin/activity-log')} className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    View Activity Log
                  </button>
                  <button onClick={() => navigate('/admin/reports')} className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    System Reports
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
