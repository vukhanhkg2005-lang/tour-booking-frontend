import React, { useState } from 'react';
import { Search, Filter, Download, User, Calendar, Activity } from 'lucide-react';

export function ActivityLog() {
  const [filterEmployee, setFilterEmployee] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const activityLogs = [
    {
      id: 'LOG-001',
      timestamp: '2025-12-11 14:35:22',
      employeeId: 'E001',
      employeeName: 'Nguyen Van Minh',
      role: 'Staff',
      action: 'Create Tour',
      details: 'Created new tour: Ha Long Bay Premium Cruise',
      ipAddress: '192.168.1.100',
      status: 'Success'
    },
    {
      id: 'LOG-002',
      timestamp: '2025-12-11 14:20:15',
      employeeId: 'E002',
      employeeName: 'Tran Thi Lan',
      role: 'Accountant',
      action: 'Create Invoice',
      details: 'Created invoice INV-2025-156 for customer C-1234',
      ipAddress: '192.168.1.101',
      status: 'Success'
    },
    {
      id: 'LOG-003',
      timestamp: '2025-12-11 13:45:33',
      employeeId: 'E001',
      employeeName: 'Nguyen Van Minh',
      role: 'Staff',
      action: 'Update Tour',
      details: 'Updated tour T002: Changed price from $850 to $899',
      ipAddress: '192.168.1.100',
      status: 'Success'
    },
    {
      id: 'LOG-004',
      timestamp: '2025-12-11 12:15:08',
      employeeId: 'E002',
      employeeName: 'Tran Thi Lan',
      role: 'Accountant',
      action: 'Process Refund',
      details: 'Processed refund $899 for booking B-5678',
      ipAddress: '192.168.1.101',
      status: 'Success'
    },
    {
      id: 'LOG-005',
      timestamp: '2025-12-11 11:30:42',
      employeeId: 'E004',
      employeeName: 'Pham Thi Mai',
      role: 'Manager',
      action: 'Add Employee',
      details: 'Added new employee: Le Van Nam (E006)',
      ipAddress: '192.168.1.102',
      status: 'Success'
    },
    {
      id: 'LOG-006',
      timestamp: '2025-12-11 10:55:19',
      employeeId: 'E003',
      employeeName: 'Le Van Tuan',
      role: 'Staff',
      action: 'Reply Support',
      details: 'Replied to support ticket TK-001',
      ipAddress: '192.168.1.103',
      status: 'Success'
    },
    {
      id: 'LOG-007',
      timestamp: '2025-12-11 10:20:55',
      employeeId: 'E002',
      employeeName: 'Tran Thi Lan',
      role: 'Accountant',
      action: 'Update Invoice',
      details: 'Updated invoice INV-2025-155: Changed status to Paid',
      ipAddress: '192.168.1.101',
      status: 'Success'
    },
    {
      id: 'LOG-008',
      timestamp: '2025-12-11 09:45:31',
      employeeId: 'E001',
      employeeName: 'Nguyen Van Minh',
      role: 'Staff',
      action: 'Delete Tour',
      details: 'Attempted to delete tour T005',
      ipAddress: '192.168.1.100',
      status: 'Failed'
    },
    {
      id: 'LOG-009',
      timestamp: '2025-12-11 09:10:12',
      employeeId: 'E004',
      employeeName: 'Pham Thi Mai',
      role: 'Manager',
      action: 'Update Permissions',
      details: 'Updated permissions for employee E003',
      ipAddress: '192.168.1.102',
      status: 'Success'
    },
    {
      id: 'LOG-010',
      timestamp: '2025-12-11 08:30:00',
      employeeId: 'E002',
      employeeName: 'Tran Thi Lan',
      role: 'Accountant',
      action: 'Generate Report',
      details: 'Generated financial report for November 2025',
      ipAddress: '192.168.1.101',
      status: 'Success'
    }
  ];

  const actionTypes = [
    'Create Tour', 'Update Tour', 'Delete Tour',
    'Create Invoice', 'Update Invoice', 'Cancel Invoice',
    'Process Refund', 'Reply Support',
    'Add Employee', 'Update Employee', 'Delete Employee',
    'Update Permissions', 'Generate Report'
  ];

  const getActionColor = (action: string) => {
    if (action.includes('Create') || action.includes('Add')) return 'text-green-600';
    if (action.includes('Update')) return 'text-blue-600';
    if (action.includes('Delete') || action.includes('Cancel')) return 'text-red-600';
    return 'text-gray-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 text-green-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Activity Log</h1>
          <p className="text-gray-600">Monitor all employee actions and system activities</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export Log</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Total Activities</div>
              <div className="text-2xl text-gray-900">2,456</div>
            </div>
            <Activity className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Today</div>
              <div className="text-2xl text-gray-900">142</div>
            </div>
            <Calendar className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Active Users</div>
              <div className="text-2xl text-gray-900">38</div>
            </div>
            <User className="w-10 h-10 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Failed Actions</div>
              <div className="text-2xl text-gray-900">8</div>
            </div>
            <Activity className="w-10 h-10 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="all">All Employees</option>
            <option value="E001">Nguyen Van Minh</option>
            <option value="E002">Tran Thi Lan</option>
            <option value="E003">Le Van Tuan</option>
            <option value="E004">Pham Thi Mai</option>
          </select>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="all">All Actions</option>
            {actionTypes.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
          <input
            type="date"
            placeholder="Start date"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          />
          <input
            type="date"
            placeholder="End date"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Timestamp</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Employee</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Action</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Details</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">IP Address</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="text-gray-900 text-sm">{log.timestamp}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{log.employeeName}</div>
                    <div className="text-sm text-gray-600">{log.employeeId} - {log.role}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-6 max-w-md">
                    <div className="text-gray-700 truncate">{log.details}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">{log.ipAddress}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing 1 to 10 of 2,456 activities
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
