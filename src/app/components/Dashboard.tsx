import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Calendar, CreditCard, LogOut, FileText, Heart } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import { TourCard } from './TourCard';

export function Dashboard() {
  const { user, logout, updateUserInfo } = useAuth();
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'favorites' | 'invoices'>('profile');

  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await api.get('/bookings/my');
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch user bookings", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchInvoices = async () => {
    setLoadingInvoices(true);
    try {
      const res = await api.get('/bookings/invoices');
      setInvoices(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch user invoices", error);
    } finally {
      setLoadingInvoices(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'bookings' || activeTab === 'invoices') {
      fetchBookings();
      fetchInvoices();
    }
  }, [activeTab]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đặt tour này không?")) return;
    try {
      await api.put(`/bookings/${bookingId}/cancel`);
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'CANCELLED' } : b));
      alert("Hủy đặt tour thành công!");
    } catch (error: any) {
      console.error("Failed to cancel booking", error);
      alert(error.response?.data?.message || "Có lỗi xảy ra khi hủy đặt tour.");
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserInfo({
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone,
        address: profileForm.address
      });
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Cập nhật thất bại, vui lòng thử lại.");
    }
  };

  // Helper to derive initials for profile pic
  const initials = profileForm.name
    ? profileForm.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'US';

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your bookings and account settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl">
                  {initials}
                </div>
                <h3 className="text-xl text-gray-900">{user?.name || 'Guest'}</h3>
                <p className="text-sm text-gray-600">{user?.email || ''}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'bookings'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Bookings</span>
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'favorites'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  <span>Favorites</span>
                </button>
                <button
                  onClick={() => setActiveTab('invoices')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'invoices'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Invoices</span>
                </button>

                <button 
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl text-gray-900 mb-6">Personal Information</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Địa chỉ</label>
                    <input
                      type="text"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl text-gray-900 mb-6">My Bookings</h2>
                  {loadingBookings ? (
                    <div className="text-center py-12 text-gray-500">Đang tải danh sách đặt tour...</div>
                  ) : bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => {
                        const tour = booking.tour || {};
                        const tourImage = tour.image || 'https://images.unsplash.com/photo-1562005094-c724030f99bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.0&q=80&w=1080';
                        return (
                          <div key={booking._id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row gap-4">
                              <img
                                src={tourImage}
                                alt={tour.name || 'Vietnam Tour'}
                                className="w-full md:w-32 h-32 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="text-xl text-gray-900 mb-1">{tour.name || 'Vietnam Tour'}</h3>
                                    <div className="flex items-center text-gray-600 text-sm mb-2">
                                      <MapPin className="w-4 h-4 mr-1" />
                                      <span>{tour.destination || 'Vietnam'}</span>
                                    </div>
                                  </div>
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                      booking.status === 'CONFIRMED'
                                        ? 'bg-green-100 text-green-700'
                                        : booking.status === 'CANCELLED'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}
                                  >
                                    {booking.status}
                                  </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{new Date(tour.startDate || booking.bookingDate).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    <span>{booking.participants} khách</span>
                                  </div>
                                  <div className="flex items-center">
                                    <CreditCard className="w-4 h-4 mr-1" />
                                    <span>${(tour.price || 0) * booking.participants}</span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
                                    <button
                                      onClick={() => handleCancelBooking(booking._id)}
                                      className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm"
                                    >
                                      Hủy Đặt Tour
                                    </button>
                                  )}
                                  {booking.paymentStatus === 'PAID' && (
                                    <button
                                      onClick={() => {
                                        const invoice = invoices.find(inv => inv.booking?._id === booking._id);
                                        if (invoice) {
                                          setSelectedInvoice(invoice);
                                        } else {
                                          alert("Không tìm thấy hóa đơn thực tế cho đơn đặt tour này.");
                                        }
                                      }}
                                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium flex items-center"
                                    >
                                      <FileText className="w-4 h-4 mr-1" />
                                      Xem Hóa Đơn
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">Bạn chưa thực hiện đặt tour nào.</div>
                  )}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl text-gray-900 mb-6 font-semibold">Favorite Tours</h2>
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map((tour) => (
                      <TourCard key={tour.id} {...tour} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">You haven't saved any tours yet</p>
                    <Link
                      to="/tours"
                      className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      Browse Tours
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl text-gray-900 mb-6">Lịch Sử Hóa Đơn</h2>
                {loadingInvoices ? (
                  <div className="text-center py-12 text-gray-500">Đang tải danh sách hóa đơn...</div>
                ) : invoices.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-4 text-gray-700">Mã Hóa Đơn</th>
                          <th className="text-left py-4 px-4 text-gray-700">Tên Tour</th>
                          <th className="text-left py-4 px-4 text-gray-700">Ngày Xuất</th>
                          <th className="text-left py-4 px-4 text-gray-700">Thành Tiền</th>
                          <th className="text-left py-4 px-4 text-gray-700">Trạng Thái</th>
                          <th className="text-left py-4 px-4 text-gray-700">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((invoice) => (
                          <tr key={invoice._id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 text-gray-900 font-medium">#{invoice._id.slice(-8).toUpperCase()}</td>
                            <td className="py-4 px-4 text-gray-700 font-medium">{invoice.booking?.tour?.name || 'Tour Du Lịch'}</td>
                            <td className="py-4 px-4 text-gray-600">{new Date(invoice.issuedAt).toLocaleDateString('vi-VN')}</td>
                            <td className="py-4 px-4 text-gray-900 font-semibold">${invoice.amount}</td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                                  invoice.status === 'PAID'
                                    ? 'bg-green-100 text-green-700'
                                    : invoice.status === 'CANCELLED'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}
                              >
                                {invoice.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <button 
                                onClick={() => setSelectedInvoice(invoice)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                              >
                                <FileText className="w-4 h-4 mr-1" />
                                Xem Chi Tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">Bạn chưa có hóa đơn thanh toán nào.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold p-2 animate-bounce-subtle"
            >
              &times;
            </button>
            
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-6 mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                    HÓA ĐƠN ĐẶT TOUR
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    selectedInvoice.status === 'PAID' 
                      ? 'bg-green-50 text-green-600' 
                      : selectedInvoice.status === 'CANCELLED'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-yellow-50 text-yellow-600'
                  }`}>
                    {selectedInvoice.status === 'PAID' ? 'ĐÃ THANH TOÁN' : selectedInvoice.status === 'CANCELLED' ? 'ĐÃ HỦY' : 'CHƯA THANH TOÁN'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Mã HD: {selectedInvoice._id.slice(-8).toUpperCase()}</h3>
                <p className="text-sm text-gray-500 mt-1">Ngày xuất: {new Date(selectedInvoice.issuedAt).toLocaleString('vi-VN')}</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-black text-blue-600 tracking-tight">ANTIGRAVITY</h2>
                <p className="text-xs text-gray-500 font-medium">Hệ Thống Đặt Tour Cao Cấp</p>
              </div>
            </div>

            {/* Invoice Info Details */}
            <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-500 uppercase text-xs tracking-wider mb-2">Khách Hàng</h4>
                <p className="text-gray-900 font-semibold">{user?.name}</p>
                <p className="text-gray-600">{user?.email}</p>
                {user?.phone && <p className="text-gray-600">{user?.phone}</p>}
              </div>
              <div>
                <h4 className="font-semibold text-gray-500 uppercase text-xs tracking-wider mb-2">Nhân Viên Xác Nhận</h4>
                <p className="text-gray-900 font-semibold">{selectedInvoice.accountant?.name || 'Hệ Thống Tự Động'}</p>
                <p className="text-gray-600">{selectedInvoice.accountant?.email || 'support@antigravity.vn'}</p>
              </div>
            </div>

            {/* Tour Item table */}
            <div className="border border-gray-100 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-left text-gray-500">
                    <th className="py-3 px-4 font-semibold">Tên Tour / Dịch Vụ</th>
                    <th className="py-3 px-4 font-semibold text-center">Số Khách</th>
                    <th className="py-3 px-4 font-semibold text-right">Đơn Giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-700">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{selectedInvoice.booking?.tour?.name || 'Tour Du Lịch'}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" /> {selectedInvoice.booking?.tour?.destination || 'Việt Nam'}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">{selectedInvoice.booking?.participants || 1}</td>
                    <td className="py-4 px-4 text-right font-semibold">${selectedInvoice.booking?.tour?.price || selectedInvoice.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Invoice Total */}
            <div className="flex justify-between items-center bg-blue-50/50 rounded-2xl p-6 mb-6">
              <div>
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Tổng Cộng Thanh Toán</h4>
                <p className="text-xs text-gray-500 mt-1">Phương thức: Chuyển khoản / Thẻ tín dụng</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-blue-600">${selectedInvoice.amount}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => window.print()}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium flex items-center space-x-2"
              >
                <span>In Hóa Đơn</span>
              </button>
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all text-sm font-semibold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
