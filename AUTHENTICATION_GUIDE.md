# VeloCity Authentication System Guide

## Overview

The VeloCity platform now features a complete authentication system with OTP-based mobile verification, user registration, and profile management.

## Features

### ✅ Implemented Features

1. **Mobile Number OTP Verification**
   - Users enter their 10-digit mobile number
   - System generates a 6-digit OTP (currently mock - displayed in console/alert)
   - OTP verification before login/registration
   - Resend OTP functionality

2. **Smart User Detection**
   - Automatically detects if user is registered or new
   - Existing users: Direct login after OTP verification
   - New users: Registration form after OTP verification

3. **Registration Flow**
   - Required fields:
     - Full Name
     - Email Address
     - Pincode (6 digits)
     - Phone Number (auto-filled from OTP step)
   - Phone number is pre-verified via OTP

4. **Profile Management**
   - View and edit personal information
   - Editable fields: Name, Email, Pincode
   - Read-only field: Phone (verified, cannot be changed)
   - Profile completion tracking
   - Logout functionality

5. **Persistent Authentication**
   - User data stored in localStorage
   - Auto-login on page refresh
   - Session maintained across browser sessions

## User Flow

### New User Registration

```
1. User clicks "Login / Register" button
2. Enters mobile number (10 digits)
3. Receives OTP (shown in alert for testing)
4. Enters 6-digit OTP
5. System detects new user
6. Registration form appears
7. User fills: Name, Email, Pincode
8. Phone is pre-filled and verified
9. User clicks "Complete Registration"
10. Account created and logged in
11. Redirected to dashboard
```

### Existing User Login

```
1. User clicks "Login / Register" button
2. Enters registered mobile number
3. Receives OTP
4. Enters 6-digit OTP
5. System detects existing user
6. User automatically logged in
7. Welcome back message shown
8. Redirected to dashboard
```

### Profile Update

```
1. User navigates to Dashboard
2. Clicks "Profile" tab
3. Clicks "Edit Profile" button
4. Updates Name, Email, or Pincode
5. Clicks "Save" button
6. Changes saved to localStorage
7. Success message displayed
```

## Technical Implementation

### Components Created

```
/src/app/contexts/AuthContext.tsx       - Authentication state management
/src/app/components/AuthModal.tsx       - Login/Register modal
/src/app/components/ProfileSection.tsx  - Profile editing component
```

### Files Modified

```
/src/app/App.tsx                        - Added AuthProvider wrapper
/src/app/components/Header.tsx          - Integrated auth modal & state
/src/app/pages/UserDashboard.tsx        - Added profile section
```

### Authentication Context

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  pincode: string;
  createdAt: Date;
  profileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}
```

### Data Storage

**LocalStorage Keys:**
- `velocity_user` - Current logged-in user data
- `velocity_users` - Array of all registered users (mock database)

**User Data Structure:**
```json
{
  "id": "user_1710501234567",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "pincode": "110001",
  "createdAt": "2026-03-15T10:30:00.000Z",
  "profileComplete": true
}
```

## Usage Examples

### Using Auth Context in Components

```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protecting Routes

```typescript
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function ProtectedPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Page content
}
```

## OTP System

### Current Implementation (Mock)

```typescript
// Generate OTP
const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();

// Display for testing
console.log('🔐 Your OTP is:', mockOtp);
alert(`Your OTP is: ${mockOtp}`);
```

### Production Integration

For production, replace the mock OTP generation with an actual SMS service:

```typescript
// Example with Twilio
async function sendOTP(phoneNumber: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  const response = await fetch('/api/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: phoneNumber, otp })
  });

  return response.json();
}

// Backend API endpoint
app.post('/api/send-otp', async (req, res) => {
  const { phone, otp } = req.body;

  // Store OTP in Redis with 5-minute expiry
  await redis.setex(`otp:${phone}`, 300, otp);

  // Send SMS via Twilio
  await twilioClient.messages.create({
    body: `Your VeloCity OTP is: ${otp}. Valid for 5 minutes.`,
    from: process.env.TWILIO_PHONE,
    to: `+91${phone}`
  });

  res.json({ success: true });
});

// Verify OTP endpoint
app.post('/api/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  const storedOtp = await redis.get(`otp:${phone}`);

  if (storedOtp === otp) {
    await redis.del(`otp:${phone}`);
    res.json({ success: true, verified: true });
  } else {
    res.json({ success: false, message: 'Invalid OTP' });
  }
});
```

## SMS Service Providers

### Recommended Options

1. **Twilio**
   - Global coverage
   - Reliable delivery
   - Easy integration
   - Cost: ~$0.0075 per SMS in India

2. **AWS SNS**
   - Integrated with AWS ecosystem
   - Scalable
   - Cost: ~$0.00645 per SMS

3. **MSG91** (India-focused)
   - Great for Indian market
   - Affordable pricing
   - Good delivery rates
   - Cost: ~₹0.20 per SMS

4. **Firebase Phone Auth**
   - Free tier available
   - Easy setup
   - No backend required initially

### Environment Variables (Production)

```env
# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone

# MSG91
MSG91_AUTH_KEY=your_auth_key
MSG91_SENDER_ID=your_sender_id
MSG91_ROUTE=4

# Redis (for OTP storage)
REDIS_URL=redis://localhost:6379
```

## Security Considerations

### Current Implementation

✅ OTP-based authentication
✅ Client-side form validation
✅ Phone number verification
✅ Data persistence in localStorage

### Production Requirements

⚠️ **Need to implement:**

1. **Backend Authentication**
   - JWT token-based authentication
   - Secure session management
   - HTTPS only

2. **OTP Security**
   - Rate limiting (max 3 attempts)
   - Time-based expiry (5 minutes)
   - Store OTPs in secure backend (Redis/DB)
   - Hash OTPs before storage

3. **Data Security**
   - Encrypt sensitive data
   - Use secure cookies for sessions
   - CSRF protection
   - XSS protection

4. **Phone Number Validation**
   - Verify phone number format
   - Check against spam/disposable numbers
   - Implement cooldown between OTP requests

5. **Database**
   - Move from localStorage to secure database
   - Encrypt user data at rest
   - Regular backups

## API Endpoints (For Backend Integration)

```typescript
// Authentication
POST   /api/auth/send-otp          // Send OTP to phone
POST   /api/auth/verify-otp        // Verify OTP
POST   /api/auth/register          // Register new user
POST   /api/auth/login             // Login existing user
POST   /api/auth/logout            // Logout user
GET    /api/auth/me                // Get current user

// Profile Management
GET    /api/profile                // Get user profile
PUT    /api/profile                // Update user profile
DELETE /api/profile                // Delete account
```

## Testing

### Test Credentials

Currently, any 10-digit phone number can be used for testing. The OTP is displayed in:
1. Console log
2. Alert popup

### Test Flow

1. **Register New User**
   ```
   Phone: 9876543210
   OTP: (check console/alert)
   Name: Test User
   Email: test@example.com
   Pincode: 110001
   ```

2. **Login Existing User**
   ```
   Phone: (previously registered number)
   OTP: (check console/alert)
   ```

3. **Update Profile**
   - Login to dashboard
   - Go to Profile tab
   - Click "Edit Profile"
   - Update name/email/pincode
   - Click "Save"

## Features Checklist

- [x] Mobile number input
- [x] OTP generation and display
- [x] OTP verification (6-digit input)
- [x] Resend OTP functionality
- [x] Auto-detect existing vs new users
- [x] User registration form
- [x] User login flow
- [x] Profile viewing
- [x] Profile editing
- [x] Logout functionality
- [x] Persistent authentication
- [x] Form validation
- [x] Dark mode support
- [x] Mobile responsive design
- [x] Loading states
- [ ] Backend API integration
- [ ] Real SMS sending
- [ ] Database storage
- [ ] JWT authentication
- [ ] Password reset
- [ ] Email verification

## Next Steps for Production

1. **Set up Backend**
   - Create API endpoints
   - Integrate SMS service
   - Set up database

2. **Security Hardening**
   - Implement JWT tokens
   - Add rate limiting
   - Enable HTTPS

3. **Testing**
   - Unit tests for auth flows
   - Integration tests
   - Security audits

4. **Monitoring**
   - Log authentication attempts
   - Track failed OTP verifications
   - Monitor SMS delivery rates

## Troubleshooting

### Common Issues

**Issue:** OTP not displaying
- **Solution:** Check console logs and alert popup

**Issue:** Login button not working
- **Solution:** Ensure AuthProvider is wrapping the app in App.tsx

**Issue:** User data not persisting
- **Solution:** Check browser localStorage, ensure not in incognito mode

**Issue:** Profile updates not saving
- **Solution:** Verify updateProfile function is called correctly

### Debug Mode

Enable debug logging:
```typescript
// In AuthContext.tsx
useEffect(() => {
  console.log('Auth state:', { user, isAuthenticated });
}, [user, isAuthenticated]);
```

## Support

For issues or questions:
- Check browser console for errors
- Verify localStorage data
- Test in different browsers
- Clear cache and try again

---

**Last Updated**: March 15, 2026  
**Version**: 1.0.0  
**Status**: Development (Mock OTP)
