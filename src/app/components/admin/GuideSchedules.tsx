import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Phone, Search, ChevronDown, ChevronUp, Clock, FileText } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import api from '../../services/api';

export function GuideSchedules() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTourId, setExpandedTourId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await api.get('/schedules');
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch schedules", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  // Group bookings by tour
  const groupedTours = bookings.reduce((acc: any, booking: any) => {
    // Only include confirmed or completed bookings for the guide
    if (booking.status === 'CANCELLED' || booking.status === 'PENDING') return acc;
    
    const tourId = booking.tour?._id;
    if (!tourId) return acc;

    if (!acc[tourId]) {
      acc[tourId] = {
        tour: booking.tour,
        bookings: [],
        totalParticipants: 0
      };
    }
    
    acc[tourId].bookings.push(booking);
    acc[tourId].totalParticipants += booking.participants;
    return acc;
  }, {});

  const toursList = Object.values(groupedTours);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lịch Trình Tour & Danh Sách Khách Hàng</h1>
        <p className="text-gray-600">Quản lý các tour được phân công và xem danh sách khách hàng</p>
      </div>

      {toursList.length === 0 ? (
        <Card className="p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có lịch trình</h3>
          <p className="text-gray-500">Hiện tại bạn chưa được phân công tour nào hoặc không có khách hàng đặt.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {toursList.map((group: any) => {
            const tour = group.tour;
            const isExpanded = expandedTourId === tour._id;
            const isUpcoming = new Date(tour.startDate) > new Date();

            return (
              <Card key={tour._id} className="overflow-hidden border border-gray-200">
                {/* Tour Header */}
                <div 
                  className={`p-6 cursor-pointer transition-colors ${isExpanded ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  onClick={() => setExpandedTourId(isExpanded ? null : tour._id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{tour.name}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{tour.durationDays} ngày</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(tour.startDate).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span className="font-medium text-blue-600">{group.totalParticipants} khách</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={isUpcoming ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                        {isUpcoming ? 'Sắp diễn ra' : 'Đang/Đã diễn ra'}
                      </Badge>
                      {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                    </div>
                  </div>
                </div>

                {/* Customer List */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-white p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <span>Danh sách khách hàng ({group.bookings.length} booking)</span>
                    </h4>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 uppercase">
                          <tr>
                            <th className="px-4 py-3 rounded-tl-lg">Mã Booking</th>
                            <th className="px-4 py-3">Tên Khách Hàng</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Số lượng khách</th>
                            <th className="px-4 py-3 rounded-tr-lg">Trạng thái thanh toán</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {group.bookings.map((booking: any) => (
                            <tr key={booking._id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium text-gray-900">
                                #{booking._id.substring(booking._id.length - 6).toUpperCase()}
                              </td>
                              <td className="px-4 py-3">
                                {booking.user?.name || 'Khách hàng'}
                              </td>
                              <td className="px-4 py-3 text-gray-500">
                                {booking.user?.email}
                              </td>
                              <td className="px-4 py-3 text-center font-medium">
                                {booking.participants}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  booking.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' :
                                  booking.paymentStatus === 'PARTIAL' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {booking.paymentStatus}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
