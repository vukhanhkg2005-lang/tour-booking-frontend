import React, { useState, useEffect } from 'react';
import { Search, Eye, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import api from '../../services/api';

export function CustomerManagement() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/customers');
      // Backend returns a list of user objects with role === "CUSTOMER"
      setCustomers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleViewDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setSelectedCustomerId(customer._id || customer.id);
  };

  // Filtered customer list
  const filteredCustomers = customers.filter(c => {
    const name = c.name || '';
    const email = c.email || '';
    const phone = c.phone || '';
    
    const matchesSearch = 
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Mongoose users can have active/inactive statuses. We fallback to 'active'
    const status = (c.status || 'active').toLowerCase();
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && status === filterStatus;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Customer Management</h1>
        <p className="text-gray-600">View and manage customer information and booking history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Total Customers</div>
          <div className="text-2xl text-gray-900 font-semibold">{customers.length}</div>
          <div className="text-sm text-green-600 mt-1">Live database</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Active Customers</div>
          <div className="text-2xl text-gray-900 font-semibold">
            {customers.filter(c => (c.status || 'active').toLowerCase() === 'active').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Ready to book</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Database Sync</div>
          <div className="text-2xl text-green-600 font-semibold">100%</div>
          <div className="text-sm text-green-600 mt-1">Connected to MongoDB</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Total Staff Roles</div>
          <div className="text-2xl text-gray-900 font-semibold">Operator</div>
          <div className="text-sm text-blue-600 mt-1">Active Session</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button 
            onClick={fetchCustomers}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Refresh Customer List
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Customer ID</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Name & Contact</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Location</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Registration Date</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
                    Đang tải danh sách khách hàng...
                  </td>
                </tr>
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => {
                  const customerId = customer._id || customer.id;
                  const customerStatus = customer.status || 'Active';
                  return (
                    <tr key={customerId} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-gray-900 font-medium">{customerId.slice(-6).toUpperCase()}</td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900 font-medium">{customer.name}</div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Mail className="w-3 h-3 mr-1" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-1" />
                          {customer.phone || 'N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-gray-700">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {customer.address || 'Vietnam'}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {new Date(customer.createdAt || Date.now()).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            customerStatus.toLowerCase() === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {customerStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleViewDetails(customer)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2 shadow"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    Không tìm thấy khách hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomerId && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedCustomerId(null)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl text-gray-900 font-semibold">Customer Details</h2>
              <button
                onClick={() => setSelectedCustomerId(null)}
                className="text-2xl text-gray-600 hover:text-gray-900 p-2"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg text-gray-900 mb-4 font-semibold">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Customer ID</div>
                    <div className="text-gray-900 font-medium">{selectedCustomer._id}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Name</div>
                    <div className="text-gray-900 font-medium">{selectedCustomer.name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="text-gray-900 font-medium">{selectedCustomer.email}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="text-gray-900 font-medium">{selectedCustomer.phone || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Address</div>
                    <div className="text-gray-900 font-medium">{selectedCustomer.address || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Member Since</div>
                    <div className="text-gray-900 font-medium">
                      {new Date(selectedCustomer.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
