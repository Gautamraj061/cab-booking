import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { X, Phone, User, Mail, MapPin, Check, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'phone' | 'otp' | 'register' | 'login';

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  
  // Registration form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');

  const { login } = useAuth();

  // Mock user database (in production, this would be an API call)
  const mockUsers = JSON.parse(localStorage.getItem('velocity_users') || '[]');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    // Check if user exists
    const existingUser = mockUsers.find((u: any) => u.phone === phone);
    setIsExistingUser(!!existingUser);

    // Generate OTP (mock - in production, send via SMS)
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    
    // Show OTP in console for testing
    console.log('🔐 Your OTP is:', mockOtp);
    alert(`Your OTP is: ${mockOtp} (Check console for testing)`);

    setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const enteredOtp = otp.join('');
    if (enteredOtp !== generatedOtp) {
      alert('Invalid OTP. Please try again.');
      return;
    }

    if (isExistingUser) {
      // Login existing user
      const existingUser = mockUsers.find((u: any) => u.phone === phone);
      login(existingUser);
      onClose();
      alert('Login successful! Welcome back.');
    } else {
      // New user - go to registration
      setStep('register');
    }
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !pincode) {
      alert('Please fill in all fields');
      return;
    }

    if (pincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode');
      return;
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      phone,
      pincode,
      createdAt: new Date(),
      profileComplete: true,
    };

    // Save to mock database
    const updatedUsers = [...mockUsers, newUser];
    localStorage.setItem('velocity_users', JSON.stringify(updatedUsers));

    // Login user
    login(newUser);
    onClose();
    alert('Registration successful! Welcome to VeloCity.');
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setStep('phone');
    setPhone('');
    setOtp(['', '', '', '', '', '']);
    setGeneratedOtp('');
    setName('');
    setEmail('');
    setPincode('');
    setIsExistingUser(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                
                {step !== 'phone' && (
                  <button
                    onClick={() => {
                      if (step === 'otp') setStep('phone');
                      else if (step === 'register') setStep('otp');
                    }}
                    className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}

                <h2 className="text-2xl font-bold text-center mt-2">
                  {step === 'phone' && 'Login / Register'}
                  {step === 'otp' && 'Verify OTP'}
                  {step === 'register' && 'Complete Registration'}
                  {step === 'login' && 'Welcome Back'}
                </h2>
                <p className="text-white/80 text-sm text-center mt-1">
                  {step === 'phone' && 'Enter your mobile number to continue'}
                  {step === 'otp' && `OTP sent to +91 ${phone}`}
                  {step === 'register' && 'Just a few more details'}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Phone Number Step */}
                {step === 'phone' && (
                  <form onSubmit={handlePhoneSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="Enter 10-digit mobile number"
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={10}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        We'll send you a one-time password
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={phone.length !== 10}
                    >
                      Send OTP
                    </Button>
                  </form>
                )}

                {/* OTP Verification Step */}
                {step === 'otp' && (
                  <form onSubmit={handleOtpSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                        Enter 6-digit OTP
                      </label>
                      <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className="w-12 h-12 text-center text-xl font-bold rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            maxLength={1}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                        OTP expires in 5:00
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={otp.join('').length !== 6}
                    >
                      Verify OTP
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
                        setGeneratedOtp(mockOtp);
                        console.log('🔐 New OTP:', mockOtp);
                        alert(`New OTP sent: ${mockOtp}`);
                      }}
                      className="w-full text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Resend OTP
                    </button>
                  </form>
                )}

                {/* Registration Step */}
                {step === 'register' && (
                  <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Pincode
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="Enter 6-digit pincode"
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={6}
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <p className="font-medium mb-1">Phone Verified</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">+91 {phone}</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={!name || !email || pincode.length !== 6}
                    >
                      Complete Registration
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
