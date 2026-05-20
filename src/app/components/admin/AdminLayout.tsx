import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  MapPin,
  Users,
  MessageSquare,
  FileText,
  DollarSign,
  BarChart3,
  UserCog,
  Activity,
  Menu,
  X,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  userRole: 'staff' | 'accountant' | 'manager' | 'guide';
}

export function AdminLayout({ children, userRole }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    // Dashboard should be active for both '/' and '/admin'
    if (path === '/admin') {
      return location.pathname === '/' || location.pathname === '/admin';
    }
    return location.pathname === path;
  };

  const staffMenuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/tours', icon: MapPin, label: 'Tour Management' },
    { path: '/admin/customers', icon: Users, label: 'Customer Management' },
    { path: '/admin/support', icon: MessageSquare, label: 'Customer Support' },
    { path: '/admin/profile', icon: UserCog, label: 'My Profile' }
  ];

  const accountantMenuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/invoices', icon: FileText, label: 'Invoice Management' },
    { path: '/admin/refunds', icon: DollarSign, label: 'Refund Processing' },
    { path: '/admin/reports', icon: BarChart3, label: 'Financial Reports' },
    { path: '/admin/profile', icon: UserCog, label: 'My Profile' }
  ];

  const guideMenuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/guide/schedules', icon: MapPin, label: 'Tour Schedules' },
    { path: '/admin/profile', icon: UserCog, label: 'My Profile' }
  ];

  const managerMenuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/employees', icon: UserCog, label: 'Employee Management' },
    { path: '/admin/activity-log', icon: Activity, label: 'Activity Log' },
    { path: '/admin/reports', icon: BarChart3, label: 'Reports Overview' },
    { path: '/admin/profile', icon: UserCog, label: 'My Profile' }
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case 'staff':
        return staffMenuItems;
      case 'guide':
        return guideMenuItems;
      case 'accountant':
        return accountantMenuItems;
      case 'manager':
        return managerMenuItems;
      default:
        return [];
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'staff':
        return 'Nhân viên';
      case 'guide':
        return 'Hướng dẫn viên';
      case 'accountant':
        return 'Kế toán';
      case 'manager':
        return 'Quản lý';
      default:
        return '';
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col bg-gray-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo & Toggle */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-800">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">VT</span>
              </div>
              <span className="text-lg">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* User Role Badge */}
        <div className="px-4 py-6 border-b border-gray-800">
          {sidebarOpen ? (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4">
              <div className="text-xs text-blue-200 mb-1">Logged in as</div>
              <div className="text-sm">{getRoleLabel()}</div>
            </div>
          ) : (
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg mx-auto flex items-center justify-center text-xs">
              {userRole.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-gray-900 text-white flex flex-col justify-between">
            <div>
              <div className="h-20 flex items-center justify-between px-6 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">VT</span>
                  </div>
                  <span className="text-lg">Admin Panel</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-4 py-6 border-b border-gray-800">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4">
                  <div className="text-xs text-blue-200 mb-1">Logged in as</div>
                  <div className="text-sm">{getRoleLabel()}</div>
                </div>
              </div>

              <nav className="px-3 py-6 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Logout */}
            <div className="p-3 border-t border-gray-800">
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 lg:flex-none"></div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <div className="text-sm text-gray-900 font-semibold">{user?.name || 'Admin User'}</div>
              <div className="text-xs text-gray-500">{getRoleLabel()}</div>
            </div>
            <div 
              onClick={() => navigate('/admin/profile')}
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white cursor-pointer hover:shadow transition-shadow font-semibold"
            >
              {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'AD'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}