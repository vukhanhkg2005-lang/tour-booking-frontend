import React from 'react';
import { Link } from 'react-router-dom';
import { UserCog, Calculator, Crown, Users, Home } from 'lucide-react';

export function AdminRoleSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white mb-4">Vietnam Tours - Admin Panel</h1>
          <p className="text-xl text-blue-200">Select a role to access the admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Customer Portal */}
          <Link
            to="/"
            className="bg-white rounded-xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl text-gray-900 text-center mb-2">Customer Portal</h2>
            <p className="text-gray-600 text-center mb-4">Browse tours and make bookings</p>
            <div className="text-center">
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
                Public Access
              </span>
            </div>
          </Link>

          {/* Staff Dashboard */}
          <Link
            to="/admin?role=staff"
            className="bg-white rounded-xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <UserCog className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl text-gray-900 text-center mb-2">Staff</h2>
            <p className="text-gray-600 text-center mb-4">Nhân viên</p>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                <span>Tour Management</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                <span>Customer Support</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                <span>Customer Management</span>
              </div>
            </div>
          </Link>

          {/* Accountant Dashboard */}
          <Link
            to="/admin?role=accountant"
            className="bg-white rounded-xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl text-gray-900 text-center mb-2">Accountant</h2>
            <p className="text-gray-600 text-center mb-4">Kế toán</p>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                <span>Invoice Management</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                <span>Refund Processing</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                <span>Financial Reports</span>
              </div>
            </div>
          </Link>

          {/* Manager Dashboard */}
          <Link
            to="/admin?role=manager"
            className="bg-white rounded-xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl text-gray-900 text-center mb-2">Manager</h2>
            <p className="text-gray-600 text-center mb-4">Quản lý</p>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                <span>Employee Management</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                <span>Activity Log</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                <span>System Reports</span>
              </div>
            </div>
          </Link>

          {/* Tour Guide Dashboard */}
          <Link
            to="/admin?role=guide"
            className="bg-white rounded-xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl text-gray-900 text-center mb-2">Tour Guide</h2>
            <p className="text-gray-600 text-center mb-4">Hướng dẫn viên</p>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                <span>Tour Schedules</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                <span>Customer List</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                <span>My Profile</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-blue-200 text-sm">
            Note: In App.tsx, change the <code className="bg-blue-800 px-2 py-1 rounded">userRole</code> variable to test different roles
          </p>
        </div>
      </div>
    </div>
  );
}
