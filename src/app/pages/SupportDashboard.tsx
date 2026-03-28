import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/button';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  XCircle,
  User,
  MapPin,
  DollarSign,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Users,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';

interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  issue: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  lastMessage: string;
  rideHistory?: {
    rideId: string;
    from: string;
    to: string;
    fare: number;
    date: Date;
    status: string;
  }[];
  chatHistory: {
    message: string;
    response: string;
    timestamp: Date;
    satisfactionFeedback?: boolean;
  }[];
}

const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    userId: 'USR-123',
    userName: 'John Doe',
    userEmail: 'john.doe@email.com',
    issue: 'Payment issue - refund not received',
    category: 'Payment',
    status: 'escalated',
    priority: 'high',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    lastMessage: 'I cancelled my ride 2 days ago but haven\'t received the refund yet.',
    rideHistory: [
      {
        rideId: 'RIDE-456',
        from: 'Airport',
        to: 'City Center',
        fare: 450,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'Cancelled',
      },
    ],
    chatHistory: [
      {
        message: 'I need help with my payment',
        response: 'I can help you with payment issues. Could you provide more details?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        satisfactionFeedback: false,
      },
      {
        message: 'I cancelled my ride but didn\'t get refund',
        response: 'Refunds typically take 5-7 business days. Has it been longer than that?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 60000),
        satisfactionFeedback: false,
      },
      {
        message: 'Yes, it has been 2 days already',
        response: 'I understand. Let me check your ride details.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 120000),
        satisfactionFeedback: false,
      },
    ],
  },
  {
    id: 'TKT-002',
    userId: 'USR-456',
    userName: 'Sarah Smith',
    userEmail: 'sarah.smith@email.com',
    issue: 'Driver complaint - unprofessional behavior',
    category: 'Driver',
    status: 'in-progress',
    priority: 'urgent',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    lastMessage: 'The driver was rude and took a longer route.',
    rideHistory: [
      {
        rideId: 'RIDE-789',
        from: 'Mall Road',
        to: 'Park Street',
        fare: 280,
        date: new Date(Date.now() - 3 * 60 * 60 * 1000),
        status: 'Completed',
      },
    ],
    chatHistory: [
      {
        message: 'I want to file a complaint about the driver',
        response: 'I\'m sorry to hear about your experience. Could you describe what happened?',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        satisfactionFeedback: false,
      },
    ],
  },
  {
    id: 'TKT-003',
    userId: 'USR-789',
    userName: 'Mike Johnson',
    userEmail: 'mike.johnson@email.com',
    issue: 'Unable to book ride - app showing error',
    category: 'Booking',
    status: 'open',
    priority: 'medium',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    lastMessage: 'Getting "Service Unavailable" error when trying to book.',
    chatHistory: [
      {
        message: 'I can\'t book a ride',
        response: 'Let me help you with that. What error are you seeing?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        satisfactionFeedback: false,
      },
    ],
  },
];

const analytics = {
  totalQueries: 1247,
  escalatedQueries: 23,
  satisfactionRate: 87,
  commonIssues: [
    { issue: 'Payment Issues', count: 342 },
    { issue: 'Booking Problems', count: 289 },
    { issue: 'Driver Complaints', count: 156 },
    { issue: 'Ride Tracking', count: 134 },
    { issue: 'Account Issues', count: 98 },
  ],
};

export function SupportDashboard() {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'escalated' | 'resolved'>('all');
  const [responseText, setResponseText] = useState('');

  const filteredTickets = filter === 'all' 
    ? mockTickets 
    : mockTickets.filter(t => t.status === filter);

  const handleSendResponse = () => {
    if (!responseText.trim() || !selectedTicket) return;
    
    // In a real app, this would send the response to the backend
    console.log('Sending response:', responseText);
    setResponseText('');
    alert('Response sent successfully!');
  };

  const handleCloseTicket = (ticketId: string) => {
    console.log('Closing ticket:', ticketId);
    alert(`Ticket ${ticketId} has been marked as resolved.`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Support Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage customer support tickets and view analytics
            </p>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {analytics.totalQueries}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Queries Handled</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="h-8 w-8 text-orange-600" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Escalated</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {analytics.escalatedQueries}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Escalated Queries</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <Target className="h-8 w-8 text-green-600" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Rate</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {analytics.satisfactionRate}%
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-purple-600" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Active</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {mockTickets.filter(t => t.status !== 'resolved').length}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Tickets</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tickets List */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600">
                  <h2 className="text-xl font-semibold text-white mb-4">Support Tickets</h2>
                  
                  {/* Filter Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {['all', 'open', 'in-progress', 'escalated', 'resolved'].map((status) => (
                      <Button
                        key={status}
                        onClick={() => setFilter(status as any)}
                        variant={filter === status ? 'secondary' : 'outline'}
                        size="sm"
                        className={filter === status ? 'bg-white text-blue-600' : 'text-white border-white/30 hover:bg-white/20'}
                      >
                        {status.replace('-', ' ').toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
                  {filteredTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        selectedTicket?.id === ticket.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {ticket.userName}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{ticket.id}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ticket.priority === 'urgent'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              : ticket.priority === 'high'
                              ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                              : ticket.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                        {ticket.issue}
                      </p>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(ticket.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full ${
                            ticket.status === 'escalated'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              : ticket.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              : ticket.status === 'resolved'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="lg:col-span-2">
              {selectedTicket ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Ticket Header */}
                  <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-1">{selectedTicket.userName}</h2>
                        <p className="text-white/80 text-sm">{selectedTicket.userEmail}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/80">Ticket ID</p>
                        <p className="font-semibold">{selectedTicket.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white/80">Category</p>
                        <p className="font-semibold">{selectedTicket.category}</p>
                      </div>
                      <div>
                        <p className="text-white/80">Status</p>
                        <p className="font-semibold">{selectedTicket.status}</p>
                      </div>
                    </div>
                  </div>

                  {/* User Info & Ride History */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      User Information
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">User ID</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {selectedTicket.userId}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Email</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {selectedTicket.userEmail}
                          </p>
                        </div>
                      </div>
                    </div>

                    {selectedTicket.rideHistory && selectedTicket.rideHistory.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Recent Rides
                        </h3>
                        {selectedTicket.rideHistory.map((ride) => (
                          <div
                            key={ride.rideId}
                            className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-2"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900 dark:text-white text-sm">
                                {ride.rideId}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  ride.status === 'Completed'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                }`}
                              >
                                {ride.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {ride.from} → {ride.to}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">
                                {ride.date.toLocaleDateString()}
                              </span>
                              <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />₹{ride.fare}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Chat History */}
                  <div className="p-6 max-h-[300px] overflow-y-auto">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Chat History
                    </h3>
                    <div className="space-y-4">
                      {selectedTicket.chatHistory.map((chat, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-end">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-4 py-2 max-w-[80%]">
                              <p className="text-sm">{chat.message}</p>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl px-4 py-2 max-w-[80%]">
                              <p className="text-sm">{chat.response}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Response Input */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Send Response
                    </h3>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Type your response to the customer..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={4}
                    />
                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={handleSendResponse}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Send Response
                      </Button>
                      <Button
                        onClick={() => handleCloseTicket(selectedTicket.id)}
                        variant="outline"
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Resolved
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full flex items-center justify-center p-12">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No Ticket Selected
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Select a ticket from the list to view details and respond
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Common Issues Section */}
          <div className="mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Most Common Issues
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {analytics.commonIssues.map((issue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4"
                  >
                    <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {issue.count}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{issue.issue}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
