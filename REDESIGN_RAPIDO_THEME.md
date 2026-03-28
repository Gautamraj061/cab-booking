# VeloCity - Rapido-Inspired Redesign Documentation

## 🎨 Theme & Color Scheme

### Primary Colors (Rapido-Inspired)
- **Primary Yellow**: `#FFC800` - Main brand color
- **Light Yellow**: `#FFD93D` - Accent and hover states
- **Yellow Gradient**: `linear-gradient(135deg, #FFC800 0%, #FFD93D 100%)`
- **Black**: `#000000` - Text and contrast
- **Dark Gray**: `#1a1a1a` - Background (dark mode)

### Color Usage
- **Buttons**: Yellow gradient with black text
- **Headers**: Yellow gradient backgrounds
- **Accents**: Yellow highlights and borders
- **Shadows**: Custom yellow shadows (`shadow-yellow`, `shadow-yellow-lg`)

## 📱 Indian Context Integration

### Currency & Formatting
- ✅ All prices in **INR (₹)**
- ✅ Phone format: **+91 XXXXXXXXXX**
- ✅ Time zone: **Indian Standard Time (IST)**

### Indian Cities & Locations
- Delhi, Noida, Lucknow, Etah
- Mumbai, Bangalore, Hyderabad, Chennai
- Kolkata, Pune, Jaipur, Ahmedabad

### Example Data
- Indian addresses and landmarks
- Local vehicle models (Maruti, Hyundai, Bajaj, etc.)
- Aadhaar-based verification
- Driving License (DL) requirements

## 🚗 Ride Categories (Rapido-Style)

### 1. Bike Ride 🏍️
- **Base Fare**: ₹20
- **Per KM**: ₹7
- **Min Fare**: ₹30
- **ETA**: 2-5 mins
- **Features**: Beat Traffic, Fastest, Economical

### 2. Auto Ride 🛺
- **Base Fare**: ₹30
- **Per KM**: ₹9
- **Min Fare**: ₹40
- **ETA**: 3-7 mins
- **Features**: Affordable, Comfortable, Familiar

### 3. Taxi Ride 🚕
- **Base Fare**: ₹50
- **Per KM**: ₹12
- **Min Fare**: ₹80
- **ETA**: 5-10 mins
- **Features**: AC, Comfortable, Spacious

### 4. Sedan Ride 🚗
- **Base Fare**: ₹80
- **Per KM**: ₹15
- **Min Fare**: ₹120
- **ETA**: 7-12 mins
- **Features**: Premium AC, Professional, Luxury

## 🔐 Improved Authentication System

### Separate Login & Sign Up
- ✅ **Two distinct buttons** for clarity
- ✅ **Login Flow**: Phone → OTP → Dashboard
- ✅ **Sign Up Flow**: Phone → OTP → Details → Complete

### Sign Up Fields (In Order)
1. **Mobile Number** (+91 format)
2. **OTP Verification** (6-digit)
3. **First Name** (Required)
4. **Last Name** (Required)
5. **Email Address** (Required)
6. **Date of Birth** (Optional)
7. **Address** (Optional, for profile)
8. **Pincode** (Optional, for profile)

### Google Sign-In
- ✅ **Google OAuth** integration ready
- ✅ One-click sign up option
- ✅ Firebase Authentication compatible

## 👤 My Profile Section

### Profile Fields
- **Profile Photo Upload** (with preview)
- **Full Name** (First Name + Last Name)
- **Date of Birth** (with date picker)
- **Mobile Number** (verified, read-only)
- **Email Address** (editable)
- **Complete Address** (with text area)
- **Pincode** (6-digit Indian pincode)

### Profile Features
- ✅ Photo upload with image preview
- ✅ Edit mode with Save/Cancel buttons
- ✅ Validation for all fields
- ✅ Success/error messages
- ✅ Account deletion option

## 🗺️ Live Location Tracking (Google Maps)

### Features to Implement
- **"Locate Me" Button**: Auto-detect current location using Geolocation API
- **Manual Location Entry**: Type-ahead search with suggestions
- **Location Autocomplete**: Real-time suggestions while typing
- **Map Display**: Show pickup and drop locations
- **Route Visualization**: Draw route between locations
- **Distance Calculation**: Calculate distance and estimated time

### Integration Steps
```javascript
// 1. Add Google Maps API
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>

// 2. Initialize Map
const map = new google.maps.Map(mapElement, {
  center: { lat: 28.6139, lng: 77.2090 }, // Delhi
  zoom: 12
});

// 3. Get Current Location
navigator.geolocation.getCurrentPosition((position) => {
  const location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  // Set pickup location
});

// 4. Autocomplete
const autocomplete = new google.maps.places.Autocomplete(inputElement);

// 5. Draw Route
const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer();
```

## 🚕 Ride Selection UI

### Visual Ride Cards
Each ride type displayed as a card with:
- **Vehicle Icon/Emoji**: 🏍️ 🛺 🚕 🚗
- **Ride Name**: Clear type (Bike, Auto, Taxi, Sedan)
- **Estimated Price**: ₹XX - ₹YY
- **ETA**: "2-5 mins"
- **Features**: List of key benefits
- **Color Coding**: Different colors per ride type

### Card Design
```jsx
<div className="ride-card">
  <div className="vehicle-icon">🏍️</div>
  <h3>Bike Ride</h3>
  <p className="price">₹30 - ₹50</p>
  <p className="eta">ETA: 2-5 mins</p>
  <ul className="features">
    <li>✓ Beat Traffic</li>
    <li>✓ Fastest</li>
    <li>✓ Economical</li>
  </ul>
  <button>Book Now</button>
</div>
```

## 🚗 Become a Driver Section

### Application Form Fields
1. **Full Name** (Required)
2. **Mobile Number** (+91 format, Required)
3. **Email Address** (Required)
4. **Vehicle Type** (Dropdown: Bike/Auto/Taxi/Sedan)
5. **Vehicle Number** (Format: MH 01 AB 1234)
6. **Driving License Number** (Alphanumeric)
7. **Aadhaar Number** (12-digit, for verification)

### Document Uploads (Required)
- **Driving License** (Front & Back)
- **Vehicle RC** (Registration Certificate)
- **Aadhaar Card** (For identity verification)
- **Profile Photo** (Passport size)

### Upload Component
```jsx
<div className="file-upload">
  <input type="file" accept="image/*,application/pdf" />
  <div className="upload-preview">
    <img src={preview} alt="Document preview" />
  </div>
  <p className="upload-note">
    Upload clear image (JPG, PNG, PDF). Max size: 5MB
  </p>
</div>
```

## 💳 Subscription & Payment

### Subscription Plans

#### 1. Basic Plan - ₹99/month
- 10% off on all rides
- Priority booking
- Free cancellation (3 rides/month)
- 24/7 support
- Ride history & invoices

#### 2. Pro Plan - ₹299/month (Popular)
- 20% off on all rides
- Free airport transfer (1/month)
- Priority support
- No surge pricing
- Free cancellation (10 rides/month)
- Exclusive rewards

#### 3. Business Plan - ₹999/month
- 30% off on all rides
- Unlimited rides worth ₹15,000
- Dedicated account manager
- GST invoices
- Multiple employee accounts
- Analytics dashboard
- Corporate billing

### Payment Gateway Integration (Razorpay)

#### Billing Breakdown
```
Base Price:         ₹299.00
GST (18%):          ₹53.82
Convenience Fee:    ₹10.00
------------------------
Total Amount:       ₹362.82
```

#### Razorpay Integration
```javascript
// 1. Load Razorpay Script
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

// 2. Initialize Payment
const options = {
  key: "YOUR_RAZORPAY_KEY",
  amount: 36282, // in paise (₹362.82)
  currency: "INR",
  name: "VeloCity",
  description: "Pro Plan Subscription",
  image: "/logo.png",
  handler: function(response) {
    // Payment successful
    const paymentId = response.razorpay_payment_id;
    activateSubscription(paymentId);
  },
  prefill: {
    name: user.name,
    email: user.email,
    contact: user.phone
  },
  theme: {
    color: "#FFC800"
  }
};

const rzp = new Razorpay(options);
rzp.open();

// 3. Success Page
function showSuccess() {
  return (
    <div className="success-page">
      <h1>🎉 Payment Successful!</h1>
      <p>Your Pro Plan subscription has been activated.</p>
      <p>Transaction ID: {paymentId}</p>
      <button>Go to Dashboard</button>
    </div>
  );
}
```

## 🎨 UI/UX Improvements

### Design Elements
- ✅ **Card-style sections** throughout
- ✅ **Smooth animations** using Motion (Framer Motion)
- ✅ **Yellow & Black gradient** accents
- ✅ **Shadow effects** for depth
- ✅ **Rounded corners** (0.75rem radius)
- ✅ **Mobile-first responsive** design

### Typography
- **Font Weight**: Semi-bold (600) for headings
- **Primary Font**: System UI font stack
- **Font Sizes**: Responsive scaling

### Animations
- **Fade in/out**: Page transitions
- **Slide up**: Modal entries
- **Scale**: Button hover effects
- **Bounce**: Notification alerts

### Components Updated
1. **Header**: Yellow theme, separate auth buttons
2. **Hero Section**: Yellow gradient, modern layout
3. **Ride Cards**: Visual icons, color-coded
4. **Pricing Cards**: Highlighted popular plan
5. **Forms**: Better validation, Indian format
6. **Modals**: Smooth transitions, step indicators

## 📱 Mobile Responsiveness

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- ✅ Hamburger menu
- ✅ Collapsible sections
- ✅ Touch-friendly buttons (min 44px)
- ✅ Swipeable cards
- ✅ Bottom navigation (optional)
- ✅ Full-screen modals

## 🔧 Technical Implementation

### Technologies Used
- **React 18+**: Frontend framework
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Styling
- **Motion (Framer Motion)**: Animations
- **React Router 7**: Navigation
- **Lucide React**: Icons

### New Files Created
```
/src/styles/theme.css                          (Updated)
/src/app/data/constants.ts                     (Updated)
/src/app/components/ImprovedAuthModal.tsx      (New)
/src/app/components/Header.tsx                 (Updated)
/REDESIGN_RAPIDO_THEME.md                      (This file)
```

### Files to Create/Update
```
/src/app/pages/BookRide.tsx                    (Google Maps)
/src/app/pages/BecomeDriver.tsx                (File uploads)
/src/app/pages/Pricing.tsx                     (Razorpay)
/src/app/components/ProfileSection.tsx         (Photo upload)
/src/app/components/RideCard.tsx               (Visual cards)
/src/app/components/PaymentModal.tsx           (Razorpay)
```

## 📦 Required Packages

```bash
# Already installed
- react
- react-router
- tailwindcss
- motion (framer-motion)
- lucide-react

# To install
npm install @react-google-maps/api
npm install razorpay
```

## 🚀 Next Steps

### Phase 1: Core UI (Completed ✓)
- [x] Update theme colors
- [x] Update constants with Indian data
- [x] Create improved auth modal
- [x] Update header with separate buttons
- [x] Add yellow/black gradients

### Phase 2: Authentication (In Progress)
- [x] Separate Login/Sign Up flows
- [x] First Name + Last Name fields
- [x] OTP verification
- [ ] Google Sign-In integration
- [ ] Profile photo upload
- [ ] DOB and address fields

### Phase 3: Ride Booking
- [ ] Google Maps integration
- [ ] "Locate Me" button
- [ ] Location autocomplete
- [ ] Visual ride cards
- [ ] ETA calculation
- [ ] Price estimation

### Phase 4: Driver Application
- [ ] Application form
- [ ] File upload component
- [ ] Document preview
- [ ] Vehicle type selection
- [ ] Aadhaar verification UI

### Phase 5: Payments
- [ ] Subscription page redesign
- [ ] Razorpay integration
- [ ] Billing breakdown UI
- [ ] Payment success page
- [ ] Invoice generation

### Phase 6: Final Polish
- [ ] Mobile optimization
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Accessibility (a11y)
- [ ] Testing & QA

## 🎯 Key Features Summary

✅ **Completed:**
- Rapido-inspired yellow & black theme
- Indian context (INR, IST, +91, cities)
- Improved authentication (separate Login/Sign Up)
- Visual ride categories with emojis
- Subscription plans with Indian pricing
- Mobile-responsive design
- Smooth animations

⏳ **In Progress:**
- Google Maps integration
- File upload for driver application
- Razorpay payment gateway
- Profile photo upload
- Complete profile section

📋 **Planned:**
- Real-time ride tracking
- Push notifications
- Ride history
- Rating system
- Referral program

## 📞 Support & Documentation

For implementation help:
- Check individual component documentation
- Review code comments
- Test all flows in dev environment
- Refer to official API docs (Google Maps, Razorpay)

---

**Last Updated**: March 16, 2026
**Version**: 2.0.0 (Rapido Theme)
**Status**: Active Development
