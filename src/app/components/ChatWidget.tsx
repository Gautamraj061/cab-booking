import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { cn } from './ui/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  solved?: boolean;
}

interface ChatHistory {
  userId: string;
  message: string;
  response: string;
  timestamp: Date;
  satisfactionFeedback?: boolean;
  escalationFlag?: boolean;
}

const quickActions = [
  { label: 'Book a Ride', value: 'book_ride' },
  { label: 'Track My Ride', value: 'track_ride' },
  { label: 'Payment Issue', value: 'payment_issue' },
  { label: 'Cancel Ride', value: 'cancel_ride' },
  { label: 'Driver Complaint', value: 'driver_complaint' },
];

const aiResponses: Record<string, string> = {
  book_ride: "I'd be happy to help you book a ride! You can start by entering your pickup and drop-off locations on our Book Ride page. Would you like me to guide you through the booking process?",
  track_ride: "To track your current ride, please go to the 'My Rides' section in your dashboard. You'll see real-time location of your driver and estimated arrival time. Do you have an active booking?",
  payment_issue: "I understand you're having a payment issue. Could you please provide more details? Are you facing problems with payment processing, refunds, or viewing your payment history?",
  cancel_ride: "I can help you cancel your ride. Please note that cancellation charges may apply depending on when you cancel. Would you like to proceed with the cancellation?",
  driver_complaint: "I'm sorry to hear about your experience. Your feedback is important to us. Could you please describe what happened? I'll make sure to escalate this to our safety team.",
  greeting: "Hello! I'm VeloCity AI Assistant. How can I help you today?",
  fare_estimate: "To get a fare estimate, please provide your pickup and drop-off locations. Our AI will calculate the fare based on distance, time, and demand. You can also use our fare calculator on the Book Ride page.",
  ride_categories: "We offer various ride categories:\n• Bike Taxi - Quick and economical\n• Mini - Affordable compact cars\n• Sedan - Comfortable sedans\n• SUV - Spacious for groups\n• Luxury - Premium experience\n• Electric - Eco-friendly rides\n\nWhich category interests you?",
  safety: "Your safety is our top priority. All our drivers are verified with background checks. You can share your trip details with friends/family, access emergency SOS button during rides, and rate drivers after each trip. Is there a specific safety concern I can address?",
  default: "I understand you need help. Could you please provide more details about your query? I'm here to assist with bookings, payments, driver issues, or any other concerns.",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: aiResponses.greeting,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unsatisfiedCount, setUnsatisfiedCount] = useState(0);
  const [showEscalation, setShowEscalation] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return aiResponses.greeting;
    }
    if (lowerMessage.includes('book') || lowerMessage.includes('booking')) {
      return aiResponses.book_ride;
    }
    if (lowerMessage.includes('track') || lowerMessage.includes('where is') || lowerMessage.includes('location')) {
      return aiResponses.track_ride;
    }
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('refund')) {
      return aiResponses.payment_issue;
    }
    if (lowerMessage.includes('cancel')) {
      return aiResponses.cancel_ride;
    }
    if (lowerMessage.includes('driver') || lowerMessage.includes('complaint')) {
      return aiResponses.driver_complaint;
    }
    if (lowerMessage.includes('fare') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('estimate')) {
      return aiResponses.fare_estimate;
    }
    if (lowerMessage.includes('category') || lowerMessage.includes('categories') || lowerMessage.includes('types') || lowerMessage.includes('options')) {
      return aiResponses.ride_categories;
    }
    if (lowerMessage.includes('safe') || lowerMessage.includes('security')) {
      return aiResponses.safety;
    }

    return aiResponses.default;
  };

  const handleQuickAction = (action: string) => {
    const quickActionMessage: Message = {
      id: Date.now().toString(),
      text: quickActions.find(a => a.value === action)?.label || '',
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, quickActionMessage]);
    simulateBotResponse(aiResponses[action] || aiResponses.default, quickActionMessage.text);
  };

  const simulateBotResponse = (responseText: string, userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Store in chat history
      const historyEntry: ChatHistory = {
        userId: 'user_123', // In real app, get from auth context
        message: userMessage,
        response: responseText,
        timestamp: new Date(),
      };
      setChatHistory(prev => [...prev, historyEntry]);

      // Ask for satisfaction after bot response
      setTimeout(() => {
        const satisfactionMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: "Did this solve your issue?",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, satisfactionMessage]);
      }, 1000);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const aiResponse = generateAIResponse(inputValue);
    setInputValue('');
    
    simulateBotResponse(aiResponse, inputValue);
  };

  const handleSatisfaction = (solved: boolean) => {
    const responseMessage: Message = {
      id: Date.now().toString(),
      text: solved ? "Great! Glad I could help." : "I'm sorry I couldn't help better.",
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, responseMessage]);

    if (!solved) {
      const newCount = unsatisfiedCount + 1;
      setUnsatisfiedCount(newCount);

      if (newCount >= 3) {
        setShowEscalation(true);
        setTimeout(() => {
          const escalationMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "I'm sorry I couldn't resolve this issue. Let me connect you to a human support agent who can better assist you.",
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, escalationMessage]);
        }, 500);
      }
    } else {
      setUnsatisfiedCount(0);
      setShowEscalation(false);
    }
  };

  const handleEscalation = (type: 'chat' | 'call' | 'email') => {
    const escalationMessages = {
      chat: "Connecting you to a live support agent... Please wait.",
      call: "Our support team will call you shortly at your registered number.",
      email: "A support ticket has been created. You'll receive an email confirmation shortly.",
    };

    const escalationMessage: Message = {
      id: Date.now().toString(),
      text: escalationMessages[type],
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, escalationMessage]);
    setShowEscalation(false);
    setUnsatisfiedCount(0);

    // Update chat history with escalation flag
    setChatHistory(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1].escalationFlag = true;
      }
      return updated;
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">VeloCity AI Assistant</h3>
                  <p className="text-xs text-white/80">Online • Responds instantly</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-2 whitespace-pre-line',
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={cn(
                        'text-xs mt-1',
                        message.sender === 'user'
                          ? 'text-white/70'
                          : 'text-gray-500 dark:text-gray-400'
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Satisfaction Buttons */}
              {messages.length > 1 &&
                messages[messages.length - 1].text === "Did this solve your issue?" && (
                  <div className="flex justify-center gap-2 mt-2">
                    <Button
                      onClick={() => handleSatisfaction(true)}
                      variant="outline"
                      size="sm"
                      className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900"
                    >
                      Yes, solved! ✓
                    </Button>
                    <Button
                      onClick={() => handleSatisfaction(false)}
                      variant="outline"
                      size="sm"
                      className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900"
                    >
                      No, still need help
                    </Button>
                  </div>
                )}

              {/* Escalation Options */}
              {showEscalation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-2"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                    How would you like to proceed?
                  </p>
                  <Button
                    onClick={() => handleEscalation('chat')}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Live Support Chat
                  </Button>
                  <Button
                    onClick={() => handleEscalation('call')}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Request a Call
                  </Button>
                  <Button
                    onClick={() => handleEscalation('email')}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Support Ticket
                  </Button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.value}
                      onClick={() => handleQuickAction(action.value)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
