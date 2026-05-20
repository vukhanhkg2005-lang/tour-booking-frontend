import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, X, DollarSign, Calendar, User } from 'lucide-react';

export function InvoiceManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const invoices = [
    {
      id: 'INV-2025-001',
      customerId: 'C-1234',
      customerName: 'Nguyen Van A',
      tourName: 'Ha Long Bay Luxury Cruise',
      amount: 2598,
      status: 'Paid',
      paymentMethod: 'Credit Card',
      issueDate: '2025-12-11',
      dueDate: '2025-12-18',
      paidDate: '2025-12-11'
    },
    {
      id: 'INV-2025-002',
      customerId: 'C-5678',
      customerName: 'Tran Thi B',
      tourName: 'Hoi An Ancient Town',
      amount: 1798,
      status: 'Pending',
      paymentMethod: 'Bank Transfer',
      issueDate: '2025-12-10',
      dueDate: '2025-12-17',
      paidDate: null
    },
    {
      id: 'INV-2025-003',
      customerId: 'C-9012',
      customerName: 'Le Van C',
      tourName: 'Phu Quoc Island Paradise',
      amount: 3198,
      status: 'Paid',
      paymentMethod: 'PayPal',
      issueDate: '2025-12-09',
      dueDate: '2025-12-16',
      paidDate: '2025-12-10'
    },
    {
      id: 'INV-2025-004',
      customerId: 'C-3456',
      customerName: 'Pham Thi D',
      tourName: 'Sapa Rice Terrace Trekking',
      amount: 1998,
      status: 'Overdue',
      paymentMethod: 'Bank Transfer',
      issueDate: '2025-11-25',
      dueDate: '2025-12-02',
      paidDate: null
    },
    {
      id: 'INV-2025-005',
      customerId: 'C-7890',
      customerName: 'Hoang Van E',
      tourName: 'Mekong Delta Discovery',
      amount: 1298,
      status: 'Cancelled',
      paymentMethod: 'N/A',
      issueDate: '2025-12-08',
      dueDate: '2025-12-15',
      paidDate: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Overdue':
        return 'bg-red-100 text-red-700';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Invoice Management</h1>
          <p className="text-gray-600">Create, update, and track customer invoices</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
          <div className="text-2xl text-gray-900">$124,560</div>
          <div className="text-sm text-green-600 mt-1">+12.5% this month</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Paid Invoices</div>
          <div className="text-2xl text-gray-900">156</div>
          <div className="text-sm text-green-600 mt-1">+24 this week</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Pending</div>
          <div className="text-2xl text-gray-900">32</div>
          <div className="text-sm text-yellow-600 mt-1">Needs attention</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Overdue</div>
          <div className="text-2xl text-gray-900">5</div>
          <div className="text-sm text-red-600 mt-1">Action required</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          />
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export to Excel
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Invoice ID</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Customer</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Tour</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Amount</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Issue Date</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Due Date</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-900">{invoice.id}</td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{invoice.customerName}</div>
                    <div className="text-sm text-gray-600">{invoice.customerId}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{invoice.tourName}</td>
                  <td className="py-4 px-6 text-gray-900">${invoice.amount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-700">{invoice.issueDate}</td>
                  <td className="py-4 px-6 text-gray-700">{invoice.dueDate}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCreateModal(false)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">Create New Invoice</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="p-6 space-y-6">
              {/* Customer Selection */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Select Customer *</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none">
                      <option value="">Choose customer...</option>
                      <option value="C-1234">Nguyen Van A (C-1234)</option>
                      <option value="C-5678">Tran Thi B (C-5678)</option>
                      <option value="C-9012">Le Van C (C-9012)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Customer Email</label>
                    <input
                      type="email"
                      placeholder="customer@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Tour & Booking Details */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4">Booking Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Tour *</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none">
                      <option value="">Select tour...</option>
                      <option value="T001">Ha Long Bay Luxury Cruise</option>
                      <option value="T002">Hoi An Ancient Town</option>
                      <option value="T003">Phu Quoc Island Paradise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Number of Guests *</label>
                    <input
                      type="number"
                      placeholder="2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Base Price *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        placeholder="1299"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Service Fee</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        placeholder="49"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Issue Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Due Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Payment Method</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none">
                  <option value="">Select payment method...</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  rows={4}
                  placeholder="Any special notes or terms..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
