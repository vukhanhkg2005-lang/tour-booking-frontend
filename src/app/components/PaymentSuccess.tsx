import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle, Download, Mail, Phone, MapPin, 
  Calendar, User, CreditCard, Clock, Printer,
  Home, ListChecks
} from 'lucide-react';

interface SuccessData {
  bookingId: string;
  bookingData: {
    tourId: string;
    tourName: string;
    tourPrice: number;
    guests: number;
    selectedDate: string;
    duration: string;
    tourImage: string;
  };
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    idNumber: string;
    address: string;
    city: string;
  };
  paymentMethod: string;
  totalAmount: number;
  paymentDate: string;
}

export function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [successData, setSuccessData] = useState<SuccessData | null>(null);

  useEffect(() => {
    const data = location.state as SuccessData;
    if (!data) {
      navigate('/tours');
      return;
    }
    setSuccessData(data);
  }, [location, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('Chức năng tải xuống PDF đang được phát triển');
  };

  if (!successData) {
    return null;
  }

  const paymentMethodNames = {
    'credit-card': 'Thẻ tín dụng/ghi nợ',
    'bank-transfer': 'Chuyển khoản ngân hàng',
    'momo': 'Ví MoMo',
    'vnpay': 'VNPay'
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl text-gray-900 mb-2">
            Thanh toán thành công!
          </h1>
          <p className="text-lg text-gray-600">
            Cảm ơn bạn đã đặt tour. Chúng tôi đã gửi xác nhận đến email của bạn.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
          >
            <Printer className="w-5 h-5" />
            <span>In hóa đơn</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
          >
            <Download className="w-5 h-5" />
            <span>Tải xuống PDF</span>
          </button>
        </div>

        {/* Bill/Invoice */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          {/* Bill Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <div className="text-3xl mb-1">VT</div>
                <p className="text-sm opacity-90">Vietnam Travel Company</p>
              </div>
              <div className="text-right">
                <p className="text-2xl mb-1">HÓA ĐƠN</p>
                <p className="text-sm opacity-90">#{successData.bookingId}</p>
              </div>
            </div>
          </div>

          {/* Bill Content */}
          <div className="p-8">
            {/* Company & Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
              <div>
                <h3 className="text-sm text-gray-600 mb-3">Từ:</h3>
                <p className="text-gray-900 mb-1">Vietnam Travel Co., Ltd</p>
                <p className="text-sm text-gray-600">123 Đường Lê Lợi</p>
                <p className="text-sm text-gray-600">Quận 1, TP. Hồ Chí Minh</p>
                <p className="text-sm text-gray-600 mt-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  +84 28 1234 5678
                </p>
                <p className="text-sm text-gray-600">
                  <Mail className="w-4 h-4 inline mr-1" />
                  info@vietnamtravel.com
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-600 mb-3">Đến:</h3>
                <p className="text-gray-900 mb-1">{successData.customerInfo.fullName}</p>
                <p className="text-sm text-gray-600">{successData.customerInfo.address}</p>
                <p className="text-sm text-gray-600">{successData.customerInfo.city}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  {successData.customerInfo.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <Mail className="w-4 h-4 inline mr-1" />
                  {successData.customerInfo.email}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  CMND/CCCD: {successData.customerInfo.idNumber}
                </p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="mb-8">
              <h3 className="text-lg text-gray-900 mb-4">Chi tiết đặt tour</h3>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={successData.bookingData.tourImage}
                    alt={successData.bookingData.tourName}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg text-gray-900 mb-2">
                      {successData.bookingData.tourName}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Ngày khởi hành: {successData.bookingData.selectedDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Thời gian: {successData.bookingData.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>Số khách: {successData.bookingData.guests} người</span>
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        <span>Thanh toán: {paymentMethodNames[successData.paymentMethod as keyof typeof paymentMethodNames]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Mã đặt tour</p>
                    <p className="text-gray-900">{successData.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Ngày thanh toán</p>
                    <p className="text-gray-900">{formatDate(successData.paymentDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Trạng thái</p>
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Đã thanh toán
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Phương thức</p>
                    <p className="text-gray-900">{paymentMethodNames[successData.paymentMethod as keyof typeof paymentMethodNames]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-gray-700">
                  <span>Giá tour ({successData.bookingData.guests} khách)</span>
                  <span>${successData.bookingData.tourPrice * successData.bookingData.guests}</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span>Phí dịch vụ</span>
                  <span>$49</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span>Thuế VAT (10%)</span>
                  <span>${((successData.totalAmount / 1.1) * 0.1).toFixed(2)}</span>
                </div>
                
                <div className="pt-4 border-t-2 border-gray-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xl text-gray-900">Tổng cộng</span>
                    <span className="text-3xl text-blue-600">${successData.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm text-gray-900 mb-2">Lưu ý quan trọng:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Vui lòng mang theo CMND/CCCD/Passport khi tham gia tour</li>
                <li>• Có mặt tại điểm tập trung trước giờ khởi hành 30 phút</li>
                <li>• Liên hệ hotline 1900 xxxx nếu cần hỗ trợ</li>
                <li>• Chính sách hủy tour: Miễn phí hủy trước 24 giờ khởi hành</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của Vietnam Travel!
              </p>
              <p className="text-xs text-gray-500">
                Mọi thắc mắc xin liên hệ: hotline@vietnamtravel.com hoặc gọi 1900 xxxx
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg text-gray-900 mb-4 flex items-center">
            <ListChecks className="w-5 h-5 mr-2 text-blue-600" />
            Bước tiếp theo
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm flex-shrink-0">
                1
              </div>
              <p className="text-sm text-gray-700">
                Kiểm tra email để xem xác nhận đặt tour và thông tin chi tiết
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm flex-shrink-0">
                2
              </div>
              <p className="text-sm text-gray-700">
                Hướng dẫn viên sẽ liên hệ với bạn trước ngày khởi hành 1-2 ngày
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm flex-shrink-0">
                3
              </div>
              <p className="text-sm text-gray-700">
                Chuẩn bị hành lý và giấy tờ tùy thân theo hướng dẫn
              </p>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Về trang chủ</span>
          </Link>
          <Link
            to="/tours"
            className="flex items-center space-x-2 px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
          >
            <span>Khám phá thêm tour</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
