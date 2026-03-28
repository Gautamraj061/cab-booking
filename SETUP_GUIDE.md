# 🚀 VeloCity - Quick Setup Guide

Get your cab booking platform running in 5 minutes!

## ⚡ Instant Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

**That's it!** Open `http://localhost:5173` in your browser.

---

## 🎯 Next Steps for Production

### 1. Backend Integration

#### Option A: Use Supabase (Recommended for Quick Start)
```bash
# Install Supabase client
npm install @supabase/supabase-js

# Create Supabase account at https://supabase.com
# Get your project URL and anon key
```

Create `.env`:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

#### Option B: Custom Backend
Build your own REST API with:
- Node.js + Express
- MongoDB or PostgreSQL
- JWT authentication

### 2. Maps Integration

#### Google Maps
```bash
# Get API key from https://console.cloud.google.com
```

Add to `.env`:
```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

Install package:
```bash
npm install @googlemaps/js-api-loader
```

#### Alternative: OpenStreetMap (Free)
```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

### 3. Payment Gateway Setup

#### Razorpay Integration
1. Create account at https://razorpay.com
2. Get Test/Live API keys
3. Add to `.env`:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
VITE_RAZORPAY_KEY_SECRET=your_secret
```

4. Add Razorpay script to `index.html`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

---

## 🗂️ Database Schema (For Backend)

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Drivers Table
```sql
CREATE TABLE drivers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  license_number VARCHAR(50) NOT NULL,
  vehicle_type VARCHAR(50),
  vehicle_model VARCHAR(100),
  vehicle_number VARCHAR(20),
  rating DECIMAL(2,1) DEFAULT 5.0,
  is_approved BOOLEAN DEFAULT false,
  is_online BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  driver_id UUID REFERENCES drivers(id),
  pickup_location JSONB NOT NULL,
  drop_location JSONB NOT NULL,
  ride_type VARCHAR(50) NOT NULL,
  fare DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending',
  scheduled_time TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50),
  payment_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 API Endpoints to Implement

### Authentication
```
POST /api/auth/register       - User registration
POST /api/auth/login          - User login
POST /api/auth/logout         - User logout
GET  /api/auth/me             - Get current user
```

### Bookings
```
POST /api/bookings            - Create new booking
GET  /api/bookings/:id        - Get booking details
GET  /api/bookings/user/:id   - Get user's bookings
PATCH /api/bookings/:id       - Update booking status
DELETE /api/bookings/:id      - Cancel booking
```

### Drivers
```
POST /api/drivers/register    - Driver registration
GET  /api/drivers/:id         - Get driver details
PATCH /api/drivers/:id        - Update driver info
POST /api/drivers/:id/online  - Toggle online status
```

### Fare Calculation
```
POST /api/fare/estimate       - Get fare estimate
```

### Payments
```
POST /api/payments/initiate   - Start payment
POST /api/payments/verify     - Verify payment
GET  /api/payments/:id        - Get payment details
```

---

## 🎨 Branding Customization

### 1. Change Brand Name
Edit `/src/app/data/constants.ts`:
```typescript
export const BRAND_NAME = "YourBrandName";
export const BRAND_TAGLINE = "Your Tagline";
```

### 2. Update Colors
Edit `/src/styles/theme.css`:
```css
:root {
  /* Change these to your brand colors */
  --primary: #2563eb;       /* Main brand color */
  --secondary: #9333ea;     /* Secondary color */
}
```

### 3. Update Logo
Replace logo in `/src/app/components/Header.tsx`:
```typescript
// Replace Car icon with your logo image
<img src="/logo.png" alt="YourBrand" />
```

### 4. Add Favicon
Add to `/public` folder:
- `favicon.ico`
- `logo192.png`
- `logo512.png`

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Test all pages and features
- [ ] Add environment variables
- [ ] Set up backend API
- [ ] Configure payment gateway
- [ ] Test payment flow
- [ ] Add Google Maps API
- [ ] Test on mobile devices
- [ ] Enable HTTPS

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Environment Variables on Vercel
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add all variables from `.env`

### Netlify Deployment
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Site Settings

---

## 🔐 Security Checklist

- [ ] Use HTTPS in production
- [ ] Validate all user inputs
- [ ] Sanitize data before storing
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting on APIs
- [ ] Enable CORS properly
- [ ] Hash passwords (bcrypt)
- [ ] Verify payments server-side
- [ ] Implement session management
- [ ] Add CSRF protection

---

## 📱 Mobile App Development

Want to create mobile apps?

### React Native Setup
```bash
npx react-native init VeloCityMobile

# Reuse components and logic
# Adapt UI for mobile screens
```

### Expo (Easier)
```bash
npx create-expo-app VeloCityMobile

# Faster development
# Easier deployment
```

---

## 🧪 Testing Setup

### Install Testing Libraries
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Create Test File
`src/app/pages/Home.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

test('renders home page', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(screen.getByText(/VeloCity/i)).toBeInTheDocument();
});
```

### Run Tests
```bash
npm test
```

---

## 📊 Analytics Integration

### Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Track Events
```typescript
// Track button clicks
gtag('event', 'book_ride', {
  'event_category': 'engagement',
  'event_label': 'ride_type',
  'value': fare
});
```

---

## 🐛 Common Issues & Solutions

### Issue: "Module not found"
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port already in use"
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Issue: Build fails
```bash
# Check TypeScript errors
npx tsc --noEmit

# Check for unused imports
# Fix any type errors
```

### Issue: Dark mode not working
```typescript
// Wrap App with ThemeProvider
import { ThemeProvider } from 'next-themes';

<ThemeProvider attribute="class" defaultTheme="light">
  <App />
</ThemeProvider>
```

---

## 📞 Support & Resources

### Documentation
- Full Documentation: `PROJECT_DOCUMENTATION.md`
- README: `README.md`

### Helpful Links
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://radix-ui.com)
- [React Router](https://reactrouter.com)

### Community
- Stack Overflow: Tag `reactjs`
- GitHub Discussions
- Discord Communities

---

## 🎯 Production Optimization

### Performance
```bash
# Analyze bundle size
npm run build
npx vite-bundle-visualizer

# Lazy load routes
const Home = lazy(() => import('./pages/Home'));
```

### SEO
Add meta tags in `index.html`:
```html
<meta name="description" content="VeloCity - Your trusted cab booking platform">
<meta name="keywords" content="cab, taxi, ride, booking">
<meta property="og:title" content="VeloCity">
<meta property="og:description" content="Ride Fast, Live Smart">
```

### PWA
```bash
npm install vite-plugin-pwa -D
```

Configure in `vite.config.ts`:
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'VeloCity',
        short_name: 'VeloCity',
        description: 'Ride Fast, Live Smart',
        theme_color: '#2563eb',
      }
    })
  ]
});
```

---

## ✅ Launch Checklist

### Before Launch
- [ ] Test all user flows
- [ ] Test payment integration
- [ ] Test on different devices
- [ ] Test on different browsers
- [ ] Set up error monitoring (Sentry)
- [ ] Set up analytics
- [ ] Create privacy policy
- [ ] Create terms of service
- [ ] Set up customer support
- [ ] Prepare marketing materials

### Post Launch
- [ ] Monitor error logs
- [ ] Track user analytics
- [ ] Gather user feedback
- [ ] Plan feature updates
- [ ] Scale infrastructure as needed

---

**Ready to launch! 🚀**

For detailed information, refer to `PROJECT_DOCUMENTATION.md`

**VeloCity - Ride Fast, Live Smart** 🚗💨
