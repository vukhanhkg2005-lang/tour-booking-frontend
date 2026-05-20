import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import {
  CreditCard, User, Mail, Phone, MapPin, Calendar,
  Shield, AlertCircle, ChevronRight, Check, Building2, Wallet
} from 'lucide-react';

interface BookingData {
  tourId: string;
  tourName: string;
  tourPrice: number;
  guests: number;
  selectedDate: string;
  tourImage: string;
  duration: string;
}

export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, updateUserInfo } = useAuth();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'bank-transfer' | 'momo' | 'vnpay'>('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    idNumber: '',
    address: '',
    city: '',
    country: 'Vietnam',
    specialRequests: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    bankName: '',
    accountNumber: ''
  });

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    // Get booking data from location state
    const data = location.state as BookingData;
    if (!data) {
      navigate('/tours');
      return;
    }
    setBookingData(data);
  }, [isAuthenticated, location, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingData) return;

    setIsProcessing(true);

    try {
      // Create actual booking in backend database
      const response = await api.post('/bookings', {
        tourId: bookingData.tourId,
        numberOfPeople: bookingData.guests,
        totalPrice: (bookingData.tourPrice * bookingData.guests) + 49
      });

      // Update user info locally in context
      updateUserInfo({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone
      });

      setIsProcessing(false);

      const createdBooking = response.data;
      const bookingId = createdBooking._id || createdBooking.id || `VT${Date.now().toString().slice(-8)}`;

      // Navigate to success page with details
      navigate('/payment-success', {
        state: {
          bookingId,
          bookingData,
          customerInfo: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            idNumber: formData.idNumber,
            address: formData.address,
            city: formData.city
          },
          paymentMethod,
          totalAmount: (bookingData.tourPrice * bookingData.guests) + 49,
          paymentDate: new Date().toISOString()
        }
      });
    } catch (err: any) {
      console.error("Booking failed", err);
      alert(err.response?.data?.message || "Có lỗi xảy ra khi đặt tour. Vui lòng thử lại!");
      setIsProcessing(false);
    }
  };

  if (!bookingData) {
    return null;
  }

  const serviceFee = 49;
  const subtotal = bookingData.tourPrice * bookingData.guests;
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Thanh toán đặt tour</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>Trang chủ</span>
            <ChevronRight className="w-4 h-4" />
            <span>Tours</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600">Thanh toán</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  <strong>Bảo mật thanh toán:</strong> Thông tin của bạn được mã hóa và bảo mật tuyệt đối
                </p>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl text-gray-900 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-600" />
                Thông tin khách hàng
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    placeholder="Nguyễn Văn An"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    placeholder="0912345678"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    CMND/CCCD/Passport <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    placeholder="001234567890"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    placeholder="Số nhà, tên đường"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Thành phố <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    placeholder="Hà Nội"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Quốc gia
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-gray-50"
                    readOnly
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    Yêu cầu đặc biệt (nếu có)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                    placeholder="Ví dụ: Ăn chay, phòng tầng cao, v.v."
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl text-gray-900 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                Phương thức thanh toán
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit-card')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'credit-card'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-6 h-6 text-gray-700" />
                    {paymentMethod === 'credit-card' && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700">Thẻ tín dụng/ghi nợ</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank-transfer')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'bank-transfer'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Building2 className="w-6 h-6 text-gray-700" />
                    {paymentMethod === 'bank-transfer' && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700">Chuyển khoản ngân hàng</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('momo')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'momo'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Wallet className="w-6 h-6 text-pink-600" />
                    {paymentMethod === 'momo' && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700">Ví MoMo</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('vnpay')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'vnpay'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Wallet className="w-6 h-6 text-blue-700" />
                    {paymentMethod === 'vnpay' && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700">VNPay</p>
                </button>
              </div>

              {/* Payment Details */}
              {paymentMethod === 'credit-card' && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Số thẻ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Tên chủ thẻ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      placeholder="NGUYEN VAN AN"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Ngày hết hạn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        placeholder="123"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank-transfer' && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Thông tin chuyển khoản:</strong>
                    </p>
                    <p className="text-sm text-gray-600">Ngân hàng: Vietcombank</p>
                    <p className="text-sm text-gray-600">Số tài khoản: 0123456789</p>
                    <p className="text-sm text-gray-600">Chủ tài khoản: VIETNAM TRAVEL CO., LTD</p>
                    <p className="text-sm text-gray-600">Nội dung: {user?.name} - {bookingData.tourId}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-600 mt-0.5"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  Tôi đồng ý với{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    Điều khoản và Điều kiện
                  </a>{' '}
                  và{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    Chính sách bảo mật
                  </a>{' '}
                  của Vietnam Travel
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-2xl p-6 sticky top-24">
              <h2 className="text-xl text-gray-900 mb-6">Tóm tắt đặt tour</h2>

              {/* Tour Image */}
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <img
                  src={bookingData.tourImage}
                  alt={bookingData.tourName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tour Details */}
              <div className="space-y-3 mb-6">
                <h3 className="text-lg text-gray-900">{bookingData.tourName}</h3>
                
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{bookingData.selectedDate}</span>
                </div>

                <div className="flex items-center text-gray-600 text-sm">
                  <User className="w-4 h-4 mr-2" />
                  <span>{bookingData.guests} khách</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 py-4 border-t border-b border-gray-200">
                <div className="flex items-center justify-between text-gray-700">
                  <span>${bookingData.tourPrice} x {bookingData.guests} khách</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span>Phí dịch vụ</span>
                  <span>${serviceFee}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-lg text-gray-900">Tổng cộng</span>
                <span className="text-2xl text-blue-600">${total}</span>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </span>
                ) : (
                  'Xác nhận thanh toán'
                )}
              </button>

              <div className="mt-4 flex items-center justify-center text-xs text-gray-600">
                <Shield className="w-4 h-4 mr-1" />
                <span>Bảo mật bởi SSL 256-bit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
