# VeloCity - Complete Cab Booking Platform

## 🚀 Project Overview

**VeloCity** is a modern, full-featured cab booking platform built with React, TypeScript, and Tailwind CSS. It provides a comprehensive solution for ride-hailing services with features for users, drivers, and administrators.

### Brand Identity
- **Brand Name:** VeloCity
- **Tagline:** Ride Fast, Live Smart
- **Color Scheme:** Blue (#2563eb) to Purple (#9333ea) gradient theme
- **Design Style:** Modern, clean UI with glassmorphism effects and smooth animations

---

## 📋 Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Pages Overview](#pages-overview)
6. [Ride Categories](#ride-categories)
7. [User Roles](#user-roles)
8. [API Integration Guide](#api-integration-guide)
9. [Payment Integration](#payment-integration)
10. [Deployment](#deployment)

---

## ✨ Features

### User Features
- ✅ User registration and login (authentication ready)
- ✅ Profile management dashboard
- ✅ Instant ride booking with fare estimation
- ✅ Schedule rides for later
- ✅ Choose from 10 vehicle categories
- ✅ Live ride tracking (UI ready)
- ✅ Fare calculator
- ✅ Ride history with ratings
- ✅ Saved locations (Home, Work)
- ✅ Multiple payment methods
- ✅ Rating & review system
- ✅ Carbon footprint tracking
- ✅ Membership tiers (Bronze, Silver, Gold)

### Driver Features
- ✅ Driver registration with document upload
- ✅ Driver dashboard with earnings
- ✅ Online/Offline toggle
- ✅ Accept/reject rides
- ✅ Earnings tracking (daily, weekly, monthly)
- ✅ Ride history
- ✅ Performance statistics
- ✅ Rating display

### Admin Features
- ✅ Admin dashboard
- ✅ User management
- ✅ Driver approval system
- ✅ Ride monitoring
- ✅ Revenue analytics
- ✅ Platform statistics

### Additional Features
- ✅ Dark/Light mode toggle
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth animations with Motion (Framer Motion)
- ✅ Toast notifications
- ✅ FAQ section
- ✅ Contact form
- ✅ About page
- ✅ Pricing plans (3 subscription tiers)
- ✅ Popular destinations
- ✅ Testimonials section
- ✅ App download section

---

## 🛠 Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **React Router 7.13.0** - Navigation & routing
- **Tailwind CSS 4.1.12** - Styling
- **Motion (Framer Motion)** - Animations
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **date-fns** - Date formatting
- **Sonner** - Toast notifications
- **next-themes** - Dark mode support

### Backend Ready
- **Supabase** - Backend infrastructure (auth, database, storage)
- **Node.js + Express.js** - Server (integration ready)
- **MongoDB/PostgreSQL** - Database (integration ready)

### APIs Ready for Integration
- **Razorpay** - Payment gateway
- **Google Maps API / OpenStreetMap** - Maps & location services
- **JWT / OAuth** - Authentication

---

## 📁 Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Header.tsx             # Sticky navigation header
│   │   │   ├── Footer.tsx             # Footer with links
│   │   │   └── Layout.tsx             # Page layout wrapper
│   │   ├── pages/
│   │   │   ├── Home.tsx               # Landing page
│   │   │   ├── BookRide.tsx           # Ride booking page
│   │   │   ├── RideCategories.tsx     # All ride types
│   │   │   ├── BecomeDriver.tsx       # Driver registration
│   │   │   ├── Pricing.tsx            # Subscription plans
│   │   │   ├── About.tsx              # About VeloCity
│   │   │   ├── Contact.tsx            # Contact form
│   │   │   ├── FAQ.tsx                # Frequently asked questions
│   │   │   ├── UserDashboard.tsx      # User account dashboard
│   │   │   ├── DriverDashboard.tsx    # Driver dashboard
│   │   │   ├── AdminDashboard.tsx     # Admin panel
│   │   │   ├── RideTracking.tsx       # Live ride tracking
│   │   │   └── NotFound.tsx           # 404 page
│   │   ├── data/
│   │   │   └── constants.ts           # App constants & data
│   │   ├── App.tsx                    # Root component
│   │   └── routes.tsx                 # Route configuration
│   └── styles/
│       ├── index.css                  # Global styles
│       ├── tailwind.css               # Tailwind imports
│       ├── theme.css                  # Design tokens
│       └── fonts.css                  # Font imports
├── package.json
└── vite.config.ts
```

---

## 🏃 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Local Development

1. **Clone/Download the project**

2. **Install dependencies:**
```bash
npm install
# or
pnpm install
```

3. **Start development server:**
```bash
npm run dev
# or
pnpm dev
```

4. **Build for production:**
```bash
npm run build
# or
pnpm build
```

The app will be available at `http://localhost:5173`

---

## 📄 Pages Overview

### 1. **Home Page** (`/`)
- Hero section with booking form
- Quick ride booking widget
- 10 ride category cards
- Popular destinations
- Why choose us section (6 features)
- Driver partner recruitment
- Customer testimonials
- App download section
- CTA section

### 2. **Book Ride** (`/book-ride`)
- Pickup & drop location inputs
- Schedule ride option with date/time picker
- Vehicle category selection (10 options)
- Passenger count
- Payment method selection
- Instant fare calculator
- Fare breakdown display

### 3. **Ride Categories** (`/ride-categories`)
- Detailed view of all 10 ride types
- Features, capacity, and pricing for each
- Direct booking buttons

### 4. **Become Driver** (`/become-driver`)
- Driver benefits showcase
- Requirements checklist
- Registration form with fields:
  - Personal info (name, email, phone, city)
  - Vehicle info (type, model, number, license)
  - Document upload sections
- Earnings potential display

### 5. **Pricing** (`/pricing`)
- 3 subscription plans:
  - **VeloCity Pass** (₹99/month)
  - **VeloCity Premium** (₹299/month) - Most Popular
  - **VeloCity Business** (₹999/month)
- Feature comparison
- Benefits of each plan

### 6. **User Dashboard** (`/user-dashboard`)
- Overview with quick stats
- Ride history with ratings
- Saved locations management
- Payment methods
- Profile settings
- Membership progress tracker

### 7. **Driver Dashboard** (`/driver-dashboard`)
- Online/offline status toggle
- Today's earnings & stats
- Weekly earnings chart
- Recent rides
- Performance analytics

### 8. **Admin Dashboard** (`/admin-dashboard`)
- Platform statistics
- User management
- Driver approval queue
- Ride monitoring
- Revenue analytics

### 9. **Ride Tracking** (`/track-ride/:rideId`)
- Live map display (placeholder)
- ETA countdown
- Driver information with photo
- Vehicle details
- Trip route display
- Contact driver options
- Cancel ride button

### 10. **Other Pages**
- **About** (`/about`) - Company story, mission, vision, values
- **Contact** (`/contact`) - Contact form with office info
- **FAQ** (`/faq`) - 8+ common questions with answers
- **404** (`/*`) - Custom not found page

---

## 🚗 Ride Categories

VeloCity offers 10 diverse ride categories:

1. **Bike Taxi** - ₹25 base + ₹8/km (Beat traffic, quick rides)
2. **Mini** - ₹50 base + ₹12/km (Affordable everyday travel)
3. **Sedan** - ₹80 base + ₹15/km (Premium comfort)
4. **SUV** - ₹120 base + ₹20/km (Family & groups, 6 seats)
5. **Luxury** - ₹200 base + ₹30/km (Top models, VIP service)
6. **Electric Cab** - ₹60 base + ₹10/km (Zero emission, eco-friendly)
7. **Outstation** - ₹300 base + ₹18/km (Intercity travel)
8. **Rental** - ₹150 base + ₹120/hour (Hourly packages)
9. **Pool Ride** - ₹30 base + ₹6/km (Share & save)
10. **Airport Transfer** - ₹200 base + ₹16/km (Flight tracking, meet & greet)

---

## 👥 User Roles

### 1. **Riders (Customers)**
- Browse and book rides
- Track rides in real-time
- Rate drivers
- Manage payment methods
- View ride history
- Save favorite locations

### 2. **Drivers**
- Register with documents
- Go online/offline
- Accept ride requests
- Navigate to pickup/drop
- Track earnings
- Receive ratings

### 3. **Admins**
- Approve driver applications
- Monitor all rides
- Manage users & drivers
- View analytics
- Handle disputes
- Manage promotions

---

## 🔌 API Integration Guide

### Authentication API (To be integrated)

```typescript
// User Registration
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+1234567890"
}

// User Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Ride Booking API (To be integrated)

```typescript
// Create Booking
POST /api/rides/book
{
  "pickupLocation": { "lat": 37.7749, "lng": -122.4194, "address": "..." },
  "dropLocation": { "lat": 37.7849, "lng": -122.4094, "address": "..." },
  "rideType": "sedan",
  "scheduledTime": "2026-03-15T14:30:00Z",
  "paymentMethod": "online"
}

// Get Fare Estimate
POST /api/rides/estimate
{
  "pickupLocation": { "lat": 37.7749, "lng": -122.4194 },
  "dropLocation": { "lat": 37.7849, "lng": -122.4094 },
  "rideType": "sedan"
}
```

### Maps API Integration

**For Google Maps:**
```typescript
// Add to .env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here

// Usage in code
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
});
```

**For OpenStreetMap (Leaflet):**
```bash
npm install leaflet react-leaflet
```

---

## 💳 Payment Integration

### Razorpay Integration Steps

1. **Install Razorpay:**
```bash
npm install razorpay
```

2. **Add environment variables:**
```env
VITE_RAZORPAY_KEY_ID=your_key_id
VITE_RAZORPAY_KEY_SECRET=your_key_secret
```

3. **Frontend Integration:**
```typescript
const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: fareAmount * 100, // Amount in paise
  currency: "INR",
  name: "VeloCity",
  description: "Ride Payment",
  handler: function (response) {
    // Handle successful payment
    console.log(response.razorpay_payment_id);
  },
  prefill: {
    name: userName,
    email: userEmail,
    contact: userPhone,
  },
  theme: {
    color: "#2563eb",
  },
};

const rzp = new window.Razorpay(options);
rzp.open();
```

4. **Backend Verification:**
```typescript
// Verify payment signature
import crypto from 'crypto';

const generatedSignature = crypto
  .createHmac('sha256', RAZORPAY_KEY_SECRET)
  .update(order_id + "|" + razorpay_payment_id)
  .digest('hex');

if (generatedSignature === razorpay_signature) {
  // Payment verified
}
```

---

## 🌐 Deployment

### Vercel Deployment

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Production deployment:**
```bash
vercel --prod
```

### Netlify Deployment

1. **Build command:** `npm run build`
2. **Publish directory:** `dist`
3. **Add redirects for SPA:**

Create `public/_redirects`:
```
/*    /index.html   200
```

### Environment Variables for Production

Set these in your deployment platform:

```env
# Maps API
VITE_GOOGLE_MAPS_API_KEY=your_key

# Razorpay
VITE_RAZORPAY_KEY_ID=your_key
VITE_RAZORPAY_KEY_SECRET=your_secret

# Backend API
VITE_API_URL=https://your-api-url.com
```

---

## 🔐 Security Best Practices

1. **Never commit API keys** - Use environment variables
2. **Validate all inputs** - Both frontend and backend
3. **Use HTTPS** - Always in production
4. **Implement rate limiting** - Prevent abuse
5. **Sanitize user data** - Prevent XSS attacks
6. **Verify payments** - Server-side verification is mandatory
7. **Encrypt sensitive data** - User information, payment details

---

## 🎨 Customization

### Changing Brand Colors

Edit `/src/styles/theme.css`:
```css
:root {
  --primary: #2563eb; /* Blue */
  --secondary: #9333ea; /* Purple */
  /* Add your custom colors */
}
```

### Adding New Ride Categories

Edit `/src/app/data/constants.ts`:
```typescript
export const RIDE_CATEGORIES = [
  {
    id: "new-category",
    name: "New Ride Type",
    description: "Description here",
    icon: "Car",
    basePrice: 100,
    pricePerKm: 15,
    minFare: 150,
    capacity: 4,
    features: ["Feature 1", "Feature 2"],
  },
  // ... existing categories
];
```

---

## 📱 Progressive Web App (PWA)

To make VeloCity a PWA:

1. **Install Vite PWA plugin:**
```bash
npm install vite-plugin-pwa -D
```

2. **Configure in `vite.config.ts`:**
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'VeloCity - Ride Booking',
        short_name: 'VeloCity',
        theme_color: '#2563eb',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
```

---

## 🧪 Testing

### Recommended Testing Stack

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Sample Test
```typescript
import { render, screen } from '@testing-library/react';
import Home from './pages/Home';

test('renders hero section', () => {
  render(<Home />);
  expect(screen.getByText(/Your Ride, Your Way/i)).toBeInTheDocument();
});
```

---

## 📊 Analytics Integration

### Google Analytics

```typescript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🤝 Support & Contact

For questions or issues:
- **Email:** support@velocity.com
- **Phone:** +1 (800) 123-4567
- **Website:** www.velocity.com

---

## 📝 License

This project is a demonstration/template. Customize as needed for your use case.

---

## 🙏 Credits

- **UI Components:** Radix UI, shadcn/ui
- **Icons:** Lucide React
- **Images:** Unsplash
- **Animations:** Motion (Framer Motion)
- **Styling:** Tailwind CSS

---

**Built with ❤️ for modern transportation**

**VeloCity - Ride Fast, Live Smart** 🚗💨
