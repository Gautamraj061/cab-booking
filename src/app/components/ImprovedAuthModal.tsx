import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { X, Phone, User, Mail, MapPin, Check, ArrowLeft, Calendar, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ImprovedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

type Step = 'phone' | 'otp' | 'signup-details' | 'complete';

export function ImprovedAuthModal({ isOpen, onClose, mode }: ImprovedAuthModalProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  
  // Sign up form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  const { login } = useAuth();

  // Mock user database
  const mockUsers = JSON.parse(localStorage.getItem('velocity_users') || '[]');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    // Generate OTP
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    
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

    if (mode === 'login') {
      // Check if user exists
      const existingUser = mockUsers.find((u: any) => u.phone === phone);
      if (existingUser) {
        login(existingUser);
        onClose();
        alert('Login successful! Welcome back.');
      } else {
        alert('No account found with this number. Please sign up first.');
        handleClose();
      }
    } else {
      // Sign up - go to details form
      setStep('signup-details');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      phone,
      dob: dob || null,
      address: address || null,
      pincode: pincode || null,
      createdAt: new Date(),
      profileComplete: true,
      profilePhoto: null,
    };

    // Save to mock database
    const updatedUsers = [...mockUsers, newUser];
    localStorage.setItem('velocity_users', JSON.stringify(updatedUsers));

    // Login user
    login(newUser);
    
    setStep('complete');
    setTimeout(() => {
      onClose();
      resetForm();
    }, 2000);
  };

  const resetForm = () => {
    setStep('phone');
    setPhone('');
    setOtp(['', '', '', '', '', '']);
    setGeneratedOtp('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setDob('');
    setAddress('');
    setPincode('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleGoogleSignIn = () => {
    alert('Google Sign-In integration will be implemented with Firebase Authentication');
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
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
              <div className="relative bg-gradient-to-r from-[#FFC800] to-[#FFD93D] p-6 text-black">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-black/80 hover:text-black transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                
                {step !== 'phone' && step !== 'complete' && (
                  <button
                    onClick={() => {
                      if (step === 'otp') setStep('phone');
                      else if (step === 'signup-details') setStep('otp');
                    }}
                    className="absolute top-4 left-4 text-black/80 hover:text-black transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}

                <h2 className="text-2xl font-bold text-center mt-2">
                  {step === 'phone' && (mode === 'login' ? 'Login to VeloCity' : 'Sign Up on VeloCity')}
                  {step === 'otp' && 'Verify OTP'}
                  {step === 'signup-details' && 'Complete Your Profile'}
                  {step === 'complete' && 'Welcome to VeloCity!'}
                </h2>
                <p className="text-black/80 text-sm text-center mt-1">
                  {step === 'phone' && 'Enter your mobile number to continue'}
                  {step === 'otp' && `OTP sent to +91 ${phone}`}
                  {step === 'signup-details' && 'Just a few more details'}
                  {step === 'complete' && 'Your account has been created successfully'}
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
                        <div className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">
                          +91
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="Enter 10-digit mobile number"
                          className="w-full pl-20 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800]"
                          maxLength={10}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        We'll send you a one-time password (OTP)
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#FFC800] hover:bg-[#FFD93D] text-black font-semibold py-6"
                      disabled={phone.length !== 10}
                    >
                      Send OTP
                    </Button>

                    {mode === 'signup' && (
                      <>
                        <div className="relative my-6">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or sign up with</span>
                          </div>
                        </div>

                        <Button
                          type="button"
                          onClick={handleGoogleSignIn}
                          variant="outline"
                          className="w-full py-6 border-2"
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Continue with Google
                        </Button>
                      </>
                    )}
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
                            className="w-12 h-12 text-center text-xl font-bold rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800]"
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
                      className="w-full bg-[#FFC800] hover:bg-[#FFD93D] text-black font-semibold py-6"
                      disabled={otp.join('').length !== 6}
                    >
                      Verify & {mode === 'login' ? 'Login' : 'Continue'}
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
                        setGeneratedOtp(mockOtp);
                        console.log('🔐 New OTP:', mockOtp);
                        alert(`New OTP sent: ${mockOtp}`);
                      }}
                      className="w-full text-sm text-[#FFC800] hover:underline"
                    >
                      Resend OTP
                    </button>
                  </form>
                )}

                {/* Sign Up Details Step */}
                {step === 'signup-details' && (
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Rahul"
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Sharma"
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rahul.sharma@example.com"
                          className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date of Birth (Optional)
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800]"
                        />
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <p className="font-medium mb-1">Phone Verified</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">+91 {phone}</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#FFC800] hover:bg-[#FFD93D] text-black font-semibold py-6"
                      disabled={!firstName || !lastName || !email}
                    >
                      Create Account
                    </Button>
                  </form>
                )}

                {/* Success Step */}
                {step === 'complete' && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Account Created!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Welcome to VeloCity, {firstName}! 🎉
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
