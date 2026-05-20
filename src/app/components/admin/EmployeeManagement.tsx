import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, User, Mail, Phone, Shield } from 'lucide-react';

export function EmployeeManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const employees = [
    {
      id: 'E001',
      name: 'Nguyen Van Minh',
      email: 'minh.nguyen@vietnamtours.com',
      phone: '+84 123 456 789',
      role: 'Staff',
      department: 'Operations',
      status: 'Active',
      joinDate: '2023-01-15',
      permissions: ['tour_create', 'tour_update', 'customer_view']
    },
    {
      id: 'E002',
      name: 'Tran Thi Lan',
      email: 'lan.tran@vietnamtours.com',
      phone: '+84 123 456 790',
      role: 'Accountant',
      department: 'Finance',
      status: 'Active',
      joinDate: '2023-03-20',
      permissions: ['invoice_create', 'invoice_update', 'refund_process', 'reports_view']
    },
    {
      id: 'E003',
      name: 'Le Van Tuan',
      email: 'tuan.le@vietnamtours.com',
      phone: '+84 123 456 791',
      role: 'Staff',
      department: 'Operations',
      status: 'Active',
      joinDate: '2023-05-10',
      permissions: ['tour_create', 'tour_update', 'customer_view', 'support_manage']
    },
    {
      id: 'E004',
      name: 'Pham Thi Mai',
      email: 'mai.pham@vietnamtours.com',
      phone: '+84 123 456 792',
      role: 'Manager',
      department: 'Management',
      status: 'Active',
      joinDate: '2022-11-01',
      permissions: ['all']
    },
    {
      id: 'E005',
      name: 'Hoang Van Nam',
      email: 'nam.hoang@vietnamtours.com',
      phone: '+84 123 456 793',
      role: 'Accountant',
      department: 'Finance',
      status: 'Inactive',
      joinDate: '2023-07-15',
      permissions: ['invoice_create', 'reports_view']
    }
  ];

  const allPermissions = [
    { id: 'tour_create', label: 'Create Tours', category: 'Tour Management' },
    { id: 'tour_update', label: 'Update Tours', category: 'Tour Management' },
    { id: 'tour_delete', label: 'Delete Tours', category: 'Tour Management' },
    { id: 'customer_view', label: 'View Customers', category: 'Customer Management' },
    { id: 'customer_edit', label: 'Edit Customers', category: 'Customer Management' },
    { id: 'support_manage', label: 'Manage Support Tickets', category: 'Customer Support' },
    { id: 'invoice_create', label: 'Create Invoices', category: 'Finance' },
    { id: 'invoice_update', label: 'Update Invoices', category: 'Finance' },
    { id: 'refund_process', label: 'Process Refunds', category: 'Finance' },
    { id: 'reports_view', label: 'View Reports', category: 'Reporting' },
    { id: 'reports_export', label: 'Export Reports', category: 'Reporting' },
    { id: 'employee_manage', label: 'Manage Employees', category: 'Administration' },
    { id: 'activity_log', label: 'View Activity Log', category: 'Administration' }
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Manager':
        return 'bg-purple-100 text-purple-700';
      case 'Accountant':
        return 'bg-blue-100 text-blue-700';
      case 'Staff':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Employee Management</h1>
          <p className="text-gray-600">Manage staff, assign roles, and control permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Total Employees</div>
          <div className="text-2xl text-gray-900">48</div>
          <div className="text-sm text-green-600 mt-1">+2 this month</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Active</div>
          <div className="text-2xl text-gray-900">45</div>
          <div className="text-sm text-gray-600 mt-1">93.8% of total</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Departments</div>
          <div className="text-2xl text-gray-900">5</div>
          <div className="text-sm text-gray-600 mt-1">Operations, Finance, etc.</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">New This Month</div>
          <div className="text-2xl text-gray-900">2</div>
          <div className="text-sm text-blue-600 mt-1">View onboarding</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="all">All Roles</option>
            <option value="manager">Manager</option>
            <option value="accountant">Accountant</option>
            <option value="staff">Staff</option>
          </select>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="all">All Departments</option>
            <option value="operations">Operations</option>
            <option value="finance">Finance</option>
            <option value="management">Management</option>
            <option value="support">Support</option>
          </select>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export List
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Employee ID</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Name & Contact</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Role</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Department</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Join Date</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-900">{employee.id}</td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-600">{employee.email}</div>
                    <div className="text-sm text-gray-600">{employee.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${getRoleBadgeColor(employee.role)}`}>
                      {employee.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{employee.department}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        employee.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{employee.joinDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee.id);
                          setShowRoleModal(true);
                        }}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">Add New Employee</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Nguyen Van A"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="email@vietnamtours.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="+84 123 456 789"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Role *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none">
                    <option value="">Select role...</option>
                    <option value="staff">Staff (Nhân viên)</option>
                    <option value="accountant">Accountant (Kế toán)</option>
                    <option value="manager">Manager (Quản lý)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Department *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none">
                    <option value="">Select department...</option>
                    <option value="operations">Operations</option>
                    <option value="finance">Finance</option>
                    <option value="management">Management</option>
                    <option value="support">Customer Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Join Date *</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Role & Permissions Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowRoleModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">Manage Roles & Permissions</h2>
              <button
                onClick={() => setShowRoleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Assign Role</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none">
                  <option value="staff">Staff (Nhân viên)</option>
                  <option value="accountant">Accountant (Kế toán)</option>
                  <option value="manager">Manager (Quản lý)</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg text-gray-900 mb-4">Permissions</h3>
                <div className="space-y-4">
                  {['Tour Management', 'Customer Management', 'Customer Support', 'Finance', 'Reporting', 'Administration'].map((category) => (
                    <div key={category} className="border border-gray-200 rounded-lg p-4">
                      <div className="text-gray-900 mb-3">{category}</div>
                      <div className="space-y-2">
                        {allPermissions
                          .filter((p) => p.category === category)
                          .map((permission) => (
                            <label key={permission.id} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
                              />
                              <span className="text-sm text-gray-700">{permission.label}</span>
                            </label>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
