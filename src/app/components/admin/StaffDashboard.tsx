import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Users,
  AlertCircle,
  TrendingUp,
  FileText,
  Phone,
  Mail,
  Star,
  Filter,
  Search,
  ChevronRight,
  UserPlus,
  Package,
  Activity,
  Loader2
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import api from '../../services/api';

export function StaffDashboard() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ticketFilter, setTicketFilter] = useState('all');
  const [data, setData] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedules = async () => {
    try {
      const [scheduleRes, ticketRes] = await Promise.allSettled([
        api.get('/schedules'),
        api.get('/tickets')
      ]);

      if (scheduleRes.status === 'fulfilled') {
        setData(scheduleRes.value.data);
      } else {
        console.error("Failed to fetch schedules in dashboard", scheduleRes.reason);
      }

      if (ticketRes.status === 'fulfilled') {
        setTickets(ticketRes.value.data);
      } else {
        console.error("Failed to fetch tickets in dashboard", ticketRes.reason);
      }
    } catch (err) {
      console.error("Failed to fetch staff data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleApproveBooking = async (bookingId: string) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status: 'CONFIRMED' });
      alert("Xác nhận đặt tour thành công!");
      await fetchSchedules();
    } catch (err: any) {
      console.error("Failed to confirm booking", err);
      alert(err.response?.data?.message || "Xác nhận đặt tour thất bại!");
    }
  };

  const pendingBookings = data.filter(b => b.status === "PENDING");
  const confirmedBookings = data.filter(b => b.status === "CONFIRMED" || b.status === "COMPLETED");
  const pendingTicketsCount = tickets.filter(t => t.status === 'New' || t.status === 'In Progress').length;

  // Key metrics for staff
  const metrics = [
    {
      label: 'Hôm nay',
      sublabel: 'Khách hàng mới',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: UserPlus,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Đang chờ',
      sublabel: 'Yêu cầu đặt tour',
      value: pendingBookings.length.toString(),
      change: '+2',
      trend: 'up',
      icon: Package,
      color: 'from-orange-500 to-orange-600'
    },
    {
      label: 'Cần phản hồi',
      sublabel: 'Hỗ trợ khách hàng',
      value: pendingTicketsCount.toString(),
      change: pendingTicketsCount > 0 ? `+${pendingTicketsCount}` : '0',
      trend: pendingTicketsCount > 0 ? 'up' : 'down',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Tuần này',
      sublabel: 'Tour Hoàn thành',
      value: data.filter(b => b.status === 'COMPLETED').length.toString(),
      change: '+8',
      trend: 'up',
      icon: CheckCircle2,
      color: 'from-green-500 to-green-600'
    }
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  // Today's tour schedule (Mocked slightly using real confirmed bookings)
  const tourSchedule = confirmedBookings.slice(0, 5).map((b, i) => ({
    id: b._id,
    tourName: b.tour?.name || 'Unknown Tour',
    time: new Date(b.bookingDate).toLocaleDateString(),
    status: b.status === 'COMPLETED' ? 'completed' : 'upcoming',
    participants: b.participants,
    guide: 'HDV Công Ty',
    phone: '0901234567'
  }));

  // Pending booking requests mapped from real PENDING bookings
  const bookingRequests = pendingBookings.slice(0, 10).map((b) => ({
    id: b._id,
    customerName: b.user?.name || b.user?.email || 'Khách hàng',
    tourName: b.tour?.name || 'Unknown Tour',
    date: new Date(b.bookingDate).toLocaleDateString(),
    participants: b.participants,
    totalAmount: formatCurrency((b.tour?.price || 0) * b.participants),
    requestTime: 'Gần đây',
    priority: b.participants > 2 ? 'High' : 'Medium'
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Recent customer interactions
  const recentInteractions = [
    {
      type: 'call',
      customerName: 'Nguyễn Văn A',
      action: 'Tư vấn tour Đà Nẵng',
      time: '15 phút trước',
      icon: Phone
    },
    {
      type: 'email',
      customerName: 'Trần Thị B',
      action: 'Gửi báo giá tour Phú Quốc',
      time: '1 giờ trước',
      icon: Mail
    },
    {
      type: 'feedback',
      customerName: 'Lê Văn C',
      action: 'Đánh giá 5 sao tour Hội An',
      time: '2 giờ trước',
      icon: Star
    },
    {
      type: 'booking',
      customerName: 'Phạm Thị D',
      action: 'Xác nhận đặt tour Sapa',
      time: '3 giờ trước',
      icon: CheckCircle2
    }
  ];

  const statusConfig = {
    departing: {
      label: 'Sắp khởi hành',
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    'in-progress': {
      label: 'Đang diễn ra',
      color: 'bg-green-100 text-green-700 border-green-200'
    },
    upcoming: {
      label: 'Sắp diễn ra',
      color: 'bg-gray-100 text-gray-700 border-gray-200'
    },
    completed: {
      label: 'Hoàn thành',
      color: 'bg-purple-100 text-purple-700 border-purple-200'
    }
  };

  const ticketStatusConfig = {
    'New': {
      label: 'Mới',
      color: 'bg-orange-100 text-orange-700'
    },
    'In Progress': {
      label: 'Đang xử lý',
      color: 'bg-blue-100 text-blue-700'
    },
    'Resolved': {
      label: 'Đã giải quyết',
      color: 'bg-green-100 text-green-700'
    }
  };

  const priorityConfig = {
    High: {
      label: 'Cao',
      color: 'bg-red-100 text-red-700'
    },
    Medium: {
      label: 'Trung bình',
      color: 'bg-yellow-100 text-yellow-700'
    },
    Low: {
      label: 'Thấp',
      color: 'bg-gray-100 text-gray-700'
    }
  };

  const getBackendStatus = (filter: string) => {
    if (filter === 'open') return 'New';
    if (filter === 'in-progress') return 'In Progress';
    if (filter === 'resolved') return 'Resolved';
    return filter;
  };

  const filteredTickets = tickets.filter(t => {
    if (ticketFilter === 'all') return true;
    return t.status === getBackendStatus(ticketFilter);
  });


  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard Nhân viên</h1>
        <p className="text-gray-600">Chào mừng trở lại! Quản lý công việc hôm nay của bạn.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center text-white`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-orange-600'
                  }`}
                >
                  <TrendingUp className={`w-4 h-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className="text-2xl text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-900">{metric.label}</div>
              <div className="text-xs text-gray-500">{metric.sublabel}</div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Today's Tour Schedule - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="text-gray-900">Lịch Tour Hôm Nay</h2>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                <span>Xem tất cả</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {tourSchedule.map((tour) => (
                <div
                  key={tour.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-gray-900">{tour.tourName}</h3>
                        <Badge className={statusConfig[tour.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-700 border-gray-200'}>
                          {statusConfig[tour.status as keyof typeof statusConfig]?.label || tour.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{tour.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{tour.participants} khách</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                        {tour.guide.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm text-gray-900">{tour.guide}</div>
                        <div className="text-xs text-gray-500">{tour.phone}</div>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700">Chi tiết</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-gray-900 mb-6">Thao tác nhanh</h2>
            <div className="space-y-3">
              <button onClick={() => navigate('/admin/tours')} className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-left flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>Quản lý & Tạo tour mới</span>
              </button>
              <button onClick={() => navigate('/admin/customers')} className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center space-x-3">
                <UserPlus className="w-5 h-5" />
                <span>Thêm/Quản lý khách hàng</span>
              </button>
              <button onClick={() => navigate('/admin/support')} className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center space-x-3">
                <MessageSquare className="w-5 h-5" />
                <span>Hỗ trợ khách hàng</span>
              </button>
              
              {/* Tour Guide Feature */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Dành cho Hướng dẫn viên</div>
                <button 
                  onClick={() => {
                    navigate('/admin/guide/schedules');
                  }} 
                  className="w-full py-3 px-4 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left flex items-center space-x-3"
                >
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Xem DS Khách & Lịch trình</span>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm text-gray-900 mb-4">Tương tác gần đây</h3>
              <div className="space-y-3">
                {recentInteractions.map((interaction, index) => {
                  const Icon = interaction.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900">{interaction.action}</div>
                        <div className="text-xs text-gray-500">{interaction.customerName}</div>
                        <div className="text-xs text-gray-400">{interaction.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Booking Requests and Support Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Booking Requests */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-orange-600" />
              <h2 className="text-gray-900">Yêu cầu đặt tour</h2>
            </div>
            <Badge className="bg-orange-100 text-orange-700">{bookingRequests.length} chờ xử lý</Badge>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {bookingRequests.map((request) => (
              <div
                key={request.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-gray-900">{request.customerName}</h3>
                      <Badge className={priorityConfig[request.priority as keyof typeof priorityConfig]?.color || 'bg-yellow-100 text-yellow-700'}>
                        Ưu tiên {(priorityConfig[request.priority as keyof typeof priorityConfig]?.label || request.priority).toLowerCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{request.tourName}</div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{request.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{request.participants} người</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-sm text-gray-900">{request.totalAmount}</div>
                    <div className="text-xs text-gray-500">{request.requestTime}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleApproveBooking(request.id)}
                      className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Chấp nhận
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Customer Support Tickets */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              <h2 className="text-gray-900">Hỗ trợ khách hàng</h2>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={ticketFilter}
                onChange={(e) => setTicketFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5"
              >
                <option value="all">Tất cả</option>
                <option value="open">Mới</option>
                <option value="in-progress">Đang xử lý</option>
                <option value="resolved">Đã giải quyết</option>
              </select>
            </div>
          </div>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket._id}
                className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${
                  ticket.status === 'New' ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-gray-900 font-semibold">{ticket.customerName}</h3>
                      {ticket.status === 'New' && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" title="Mới"></div>
                      )}
                    </div>
                    <div className="text-sm text-gray-900 mb-2 font-medium">{ticket.subject}</div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={ticketStatusConfig[ticket.status as keyof typeof ticketStatusConfig]?.color || 'bg-gray-100 text-gray-700'}>
                        {ticketStatusConfig[ticket.status as keyof typeof ticketStatusConfig]?.label || ticket.status}
                      </Badge>
                      <Badge className={priorityConfig[ticket.priority as keyof typeof priorityConfig]?.color || 'bg-gray-100 text-gray-700'}>
                        {priorityConfig[ticket.priority as keyof typeof priorityConfig]?.label || ticket.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    ID: {ticket._id.substring(ticket._id.length - 8).toUpperCase()} • {new Date(ticket.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                  <button 
                    onClick={() => navigate('/admin/support')}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <span>Xử lý</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {filteredTickets.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-sm">
                Không có yêu cầu hỗ trợ nào.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
