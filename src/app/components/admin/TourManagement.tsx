import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X, MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import api from '../../services/api';

export function TourManagement() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTour, setEditingTour] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    durationDays: 3,
    price: 999,
    maxParticipants: 20,
    startDate: new Date().toISOString().split('T')[0],
    description: ''
  });

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tours');
      const data = response.data.data || response.data;
      setTours(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch tours", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const openCreateModal = () => {
    setEditingTour(null);
    setFormData({
      name: '',
      destination: '',
      durationDays: 3,
      price: 999,
      maxParticipants: 20,
      startDate: new Date().toISOString().split('T')[0],
      description: ''
    });
    setShowCreateModal(true);
  };

  const openEditModal = (tour: any) => {
    setEditingTour(tour);
    setFormData({
      name: tour.name || '',
      destination: tour.destination || '',
      durationDays: tour.durationDays || 3,
      price: tour.price || 999,
      maxParticipants: tour.maxParticipants || 20,
      startDate: tour.startDate ? new Date(tour.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      description: tour.description || ''
    });
    setShowCreateModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tour này?")) return;
    try {
      await api.delete(`/tours/${id}`);
      setTours(prev => prev.filter(t => (t._id || t.id) !== id));
      alert("Xóa tour thành công!");
    } catch (error: any) {
      console.error("Failed to delete tour", error);
      alert(error.response?.data?.message || "Xóa tour thất bại. Vui lòng thử lại!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTour) {
        // Update existing tour
        const id = editingTour._id || editingTour.id;
        const res = await api.put(`/tours/${id}`, formData);
        setTours(prev => prev.map(t => (t._id || t.id) === id ? res.data : t));
        alert("Cập nhật tour thành công!");
      } else {
        // Create new tour
        const res = await api.post('/tours', formData);
        setTours(prev => [res.data, ...prev]);
        alert("Tạo tour mới thành công!");
      }
      setShowCreateModal(false);
    } catch (error: any) {
      console.error("Failed to save tour", error);
      alert(error.response?.data?.message || "Lưu tour thất bại. Vui lòng kiểm tra lại thông tin!");
    }
  };

  // Filtered tours
  const filteredTours = tours.filter(tour => {
    const matchesSearch = 
      (tour.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tour.destination || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status can be determined dynamically based on start date or capacity
    const isClosed = tour.currentParticipants >= tour.maxParticipants || new Date(tour.startDate) < new Date();
    const status = isClosed ? 'closed' : 'active';
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && status === filterStatus;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Tour Management</h1>
          <p className="text-gray-600">Create, update, and manage tour packages</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Tour</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tours..."
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
            <option value="closed">Closed</option>
          </select>
          <button 
            onClick={fetchTours}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Tours Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Tour ID</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Tour Name</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Location</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Duration</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Price</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Capacity</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Bookings</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-sm text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-500">Đang tải danh sách tours...</td>
                </tr>
              ) : filteredTours.length > 0 ? (
                filteredTours.map((tour) => {
                  const tourId = tour._id || tour.id;
                  const isClosed = tour.currentParticipants >= tour.maxParticipants || new Date(tour.startDate) < new Date();
                  return (
                    <tr key={tourId} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-gray-900 font-medium">{tourId.slice(-6).toUpperCase()}</td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900 font-medium">{tour.name}</div>
                        <div className="text-xs text-gray-600">Start: {new Date(tour.startDate).toLocaleDateString()}</div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{tour.destination}</td>
                      <td className="py-4 px-6 text-gray-700">{tour.durationDays} Days</td>
                      <td className="py-4 px-6 text-gray-900 font-semibold">${tour.price}</td>
                      <td className="py-4 px-6 text-gray-700">{tour.maxParticipants}</td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900">{tour.currentParticipants || 0}/{tour.maxParticipants}</div>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.min(100, ((tour.currentParticipants || 0) / tour.maxParticipants) * 100)}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            !isClosed
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {!isClosed ? 'Active' : 'Closed'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => openEditModal(tour)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(tourId)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-500">Không tìm thấy tour phù hợp.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Tour Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCreateModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl text-gray-900 font-semibold">{editingTour ? 'Edit Tour Package' : 'Create New Tour'}</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4 font-medium">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Tour Name *</label>
                    <input
                      type="text"
                      placeholder="e.g., Ha Long Bay Cruise"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Location *</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="e.g., Ha Long Bay"
                        value={formData.destination}
                        onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Duration (Days) *</label>
                    <input
                      type="number"
                      placeholder="e.g., 3"
                      value={formData.durationDays}
                      onChange={(e) => setFormData(prev => ({ ...prev, durationDays: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      required
                      min={1}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Price (USD) *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        placeholder="1299"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        required
                        min={0}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Max Capacity *</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        placeholder="20"
                        value={formData.maxParticipants}
                        onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 0 }))}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        required
                        min={1}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Start Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4 font-medium">Description / Details</h3>
                <textarea
                  rows={4}
                  placeholder="Enter detailed description..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
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
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg"
                >
                  {editingTour ? 'Save Changes' : 'Create Tour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
