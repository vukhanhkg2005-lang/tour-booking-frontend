import React, { useState } from 'react';
import { Search, DollarSign, CheckCircle, X, AlertCircle } from 'lucide-react';

export function RefundProcessing() {
  const [selectedRefund, setSelectedRefund] = useState<string | null>(null);

  const refundRequests = [
    {
      id: 'REF-001',
      customerId: 'C-9012',
      customerName: 'Le Van C',
      bookingId: 'B-456',
      tourName: 'Phu Quoc Island Paradise',
      originalAmount: 3198,
      refundAmount: 2878,
      reason: 'Emergency - Family illness',
      requestDate: '2025-12-10',
      status: 'Pending',
      cancellationFee: 320,
      refundPolicy: '90% refund (10% cancellation fee)'
    },
    {
      id: 'REF-002',
      customerId: 'C-5431',
      customerName: 'Hoang Thi E',
      bookingId: 'B-789',
      tourName: 'Ha Long Bay Cruise',
      originalAmount: 2598,
      refundAmount: 2598,
      reason: 'Tour cancelled by operator',
      requestDate: '2025-12-09',
      status: 'Approved',
      cancellationFee: 0,
      refundPolicy: '100% refund (operator cancellation)'
    },
    {
      id: 'REF-003',
      customerId: 'C-7654',
      customerName: 'Pham Van F',
      bookingId: 'B-321',
      tourName: 'Sapa Trekking',
      originalAmount: 1998,
      refundAmount: 999,
      reason: 'Schedule conflict',
      requestDate: '2025-12-08',
      status: 'Processing',
      cancellationFee: 999,
      refundPolicy: '50% refund (late cancellation)'
    },
    {
      id: 'REF-004',
      customerId: 'C-2345',
      customerName: 'Nguyen Thi G',
      bookingId: 'B-654',
      tourName: 'Mekong Delta Tour',
      originalAmount: 1298,
      refundAmount: 1168,
      reason: 'Weather concerns',
      requestDate: '2025-12-07',
      status: 'Completed',
      cancellationFee: 130,
      refundPolicy: '90% refund (10% cancellation fee)'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Refund Processing</h1>
        <p className="text-gray-600">Review and process customer refund requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Pending Requests</div>
              <div className="text-2xl text-gray-900">8</div>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Processing</div>
              <div className="text-2xl text-gray-900">3</div>
            </div>
            <DollarSign className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Completed</div>
              <div className="text-2xl text-gray-900">145</div>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Total Refunded</div>
              <div className="text-2xl text-gray-900">$67,845</div>
            </div>
            <DollarSign className="w-10 h-10 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search refunds..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
          <input
            type="date"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Refund Requests Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Refund ID</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Customer</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Tour</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Original</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Refund</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {refundRequests.map((refund) => (
                <tr key={refund.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-900">{refund.id}</td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{refund.customerName}</div>
                    <div className="text-sm text-gray-600">{refund.customerId}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{refund.tourName}</div>
                    <div className="text-sm text-gray-600">{refund.bookingId}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-900">${refund.originalAmount.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <div className="text-green-600">${refund.refundAmount.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Fee: ${refund.cancellationFee}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(refund.status)}`}>
                      {refund.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => setSelectedRefund(refund.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Process
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Refund Modal */}
      {selectedRefund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedRefund(null)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">Process Refund Request</h2>
              <button
                onClick={() => setSelectedRefund(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Request Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg text-gray-900 mb-4">Request Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Refund ID:</span>
                    <span className="text-gray-900 ml-2">REF-001</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Request Date:</span>
                    <span className="text-gray-900 ml-2">2025-12-10</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Customer:</span>
                    <span className="text-gray-900 ml-2">Le Van C (C-9012)</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="text-gray-900 ml-2">B-456</span>
                  </div>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <h3 className="text-lg text-gray-900 mb-4">Financial Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Original Amount:</span>
                    <span className="text-gray-900">$3,198</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cancellation Fee (10%):</span>
                    <span className="text-red-600">- $320</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-200">
                    <span className="text-gray-900">Refund Amount:</span>
                    <span className="text-2xl text-green-600">$2,878</span>
                  </div>
                </div>
              </div>

              {/* Refund Policy */}
              <div>
                <h3 className="text-lg text-gray-900 mb-2">Applied Policy</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-gray-700">
                  90% refund (10% cancellation fee)
                </div>
              </div>

              {/* Reason */}
              <div>
                <h3 className="text-lg text-gray-900 mb-2">Cancellation Reason</h3>
                <div className="bg-gray-50 rounded-lg p-3 text-gray-700">
                  Emergency - Family illness
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Refund Method *</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none">
                  <option value="">Select refund method...</option>
                  <option value="original">Original Payment Method</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="check">Check</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Internal Notes</label>
                <textarea
                  rows={4}
                  placeholder="Add any internal notes about this refund..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedRefund(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  Reject Request
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all">
                  Approve & Process
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
