import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Phone, MapPin, Mail, Briefcase, Save, AlertCircle } from 'lucide-react';

export function AdminProfile() {
  const { user, updateUserInfo } = useAuth();
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');
    try {
      await updateUserInfo({
        name: profileForm.name,
        phone: profileForm.phone,
        address: profileForm.address
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Failed to update admin profile", err);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin cá nhân.');
    } finally {
      setSaving(false);
    }
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Quản Trị Viên Hệ Thống';
      case 'MANAGER':
        return 'Quản Lý Điều Hành';
      case 'ACCOUNTANT':
        return 'Kế Toán Trưởng';
      case 'STAFF':
      case 'OPERATOR':
        return 'Nhân Viên Điều Hành';
      case 'SALE':
        return 'Chuyên Viên Tư Vấn';
      case 'GUIDE':
        return 'Hướng Dẫn Viên Du Lịch';
      default:
        return role || 'Nhân Viên';
    }
  };

  const initials = profileForm.name
    ? profileForm.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ Sơ Cá Nhân</h1>
        <p className="text-gray-600">Quản lý và cập nhật thông tin cá nhân của bạn trên hệ thống</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 text-center relative overflow-hidden">
            {/* Header background decoration */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
            
            {/* Profile Avatar */}
            <div className="relative pt-8 mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg relative z-10">
                {initials}
              </div>
            </div>

            {/* Profile Info */}
            <h3 className="text-xl font-bold text-gray-900 mt-2">{user?.name}</h3>
            <p className="text-sm font-semibold text-blue-600 mt-1 uppercase tracking-wider">{getRoleLabel(user?.role)}</p>
            <p className="text-xs text-gray-500 mt-1">{user?.email}</p>

            <div className="border-t border-gray-100 my-6 pt-6 text-left space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Bộ phận: <strong className="text-gray-900">{user?.role}</strong></span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="truncate">{user?.email}</span>
              </div>
              {user?.phone && (
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>{user?.phone}</span>
                </div>
              )}
              {user?.address && (
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{user?.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              Cập Nhật Thông Tin Cá Nhân
            </h3>

            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 text-sm font-medium flex items-center animate-fade-in">
                <span>Cập nhật thông tin hồ sơ thành công! Dữ liệu đã được đồng bộ lên máy chủ.</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-medium flex items-center animate-fade-in">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-medium"
                    placeholder="Nhập họ và tên..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email hệ thống</label>
                  <input
                    type="email"
                    disabled
                    value={profileForm.email}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none font-medium bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại liên hệ</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-medium"
                    placeholder="Nhập số điện thoại..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Chức danh / Vai trò</label>
                  <input
                    type="text"
                    disabled
                    value={getRoleLabel(user?.role)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none font-medium bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ thường trú</label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-medium"
                  placeholder="Nhập địa chỉ của bạn..."
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all shadow-md flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
