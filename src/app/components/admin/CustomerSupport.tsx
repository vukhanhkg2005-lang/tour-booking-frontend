import React, { useState, useEffect } from 'react';
import { Search, Filter, MessageSquare, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import api from '../../services/api';

interface Ticket {
  _id: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  } | string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  message: string;
  category: string;
  priority: string;
  status: string;
  reply: string;
  createdAt: string;
  updatedAt: string;
}

export function CustomerSupport() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [replyText, setReplyText] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleOpenReplyModal = (ticket: Ticket) => {
    setSelectedTicket(ticket._id);
    setReplyText(ticket.reply || '');
    setTicketStatus(ticket.status);
  };

  const handleSendReply = async () => {
    if (!selectedTicket) return;
    try {
      setUpdating(true);
      await api.put(`/tickets/${selectedTicket}`, {
        status: ticketStatus,
        reply: replyText
      });
      setSelectedTicket(null);
      await fetchTickets();
    } catch (error: any) {
      console.error("Failed to update ticket:", error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi lưu phản hồi!');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return dateStr;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'Resolved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-orange-100 text-orange-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Dynamic stats
  const newTicketsCount = tickets.filter(t => t.status === 'New').length;
  const inProgressTicketsCount = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedTicketsCount = tickets.filter(t => t.status === 'Resolved').length;

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket._id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      filterStatus === 'all' || 
      ticket.status.toLowerCase() === filterStatus.toLowerCase();
      
    const matchesPriority = 
      filterPriority === 'all' || 
      ticket.priority.toLowerCase() === filterPriority.toLowerCase();
      
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const selectedTicketObj = tickets.find(t => t._id === selectedTicket);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Customer Support & Feedback</h1>
        <p className="text-gray-600">Manage customer inquiries, feedback, and technical issues</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="all">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl text-gray-900">{newTicketsCount}</div>
              <div className="text-sm text-gray-600">New Tickets</div>
            </div>
            <AlertCircle className="w-10 h-10 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl text-gray-900">{inProgressTicketsCount}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <Clock className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl text-gray-900">{resolvedTicketsCount}</div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl text-gray-900">{tickets.length}</div>
              <div className="text-sm text-gray-600">Total Tickets</div>
            </div>
            <MessageSquare className="w-10 h-10 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Loading support tickets...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm text-gray-700">Ticket ID</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-700">Customer</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-700">Subject</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-700">Category</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-700">Priority</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-700">Created</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-900 font-mono text-sm max-w-[100px] truncate" title={ticket._id}>
                      {ticket._id.substring(ticket._id.length - 8).toUpperCase()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-900 font-semibold">{ticket.customerName}</div>
                      <div className="text-sm text-gray-600">{ticket.customerEmail}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-900 max-w-xs truncate" title={ticket.subject}>{ticket.subject}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{ticket.category}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(ticket.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">{formatDate(ticket.createdAt)}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleOpenReplyModal(ticket)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-semibold shadow-sm"
                      >
                        View & Reply
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      No support tickets found matching current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {selectedTicket && selectedTicketObj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-[1px]"
            onClick={() => setSelectedTicket(null)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Ticket Details</h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-2xl text-gray-500 font-bold">×</span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded">
                  ID: {selectedTicketObj._id}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedTicketObj.status)}`}>
                  {selectedTicketObj.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(selectedTicketObj.priority)}`}>
                  {selectedTicketObj.priority} Priority
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 font-medium">Name:</span>
                    <span className="text-gray-900 font-semibold ml-2">{selectedTicketObj.customerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Customer ID:</span>
                    <span className="text-gray-900 font-mono ml-2">
                      {selectedTicketObj.user
                        ? typeof selectedTicketObj.user === 'object'
                          ? selectedTicketObj.user._id
                          : selectedTicketObj.user
                        : 'Guest'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Email:</span>
                    <span className="text-gray-900 font-semibold ml-2">{selectedTicketObj.customerEmail}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Phone:</span>
                    <span className="text-gray-900 font-semibold ml-2">{selectedTicketObj.customerPhone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Original Message */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Original Message</h3>
                <div className="bg-blue-50/70 border-l-4 border-blue-600 p-5 rounded-r-xl">
                  <h4 className="font-bold text-gray-900 mb-2">{selectedTicketObj.subject}</h4>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedTicketObj.message}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-3">Sent on {formatDate(selectedTicketObj.createdAt)}</p>
                </div>
              </div>

              {/* Reply Form */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Your Reply</h3>
                <textarea
                  rows={5}
                  placeholder="Type your response here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Update Status</h3>
                <select
                  value={ticketStatus}
                  onChange={(e) => setTicketStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedTicket(null)}
                  disabled={updating}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={updating}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md flex items-center space-x-2"
                >
                  {updating && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                  <span>Send Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
