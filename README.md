# 🚗 VeloCity - Modern Cab Booking Platform

> **Ride Fast, Live Smart**

A complete, production-ready cab booking web application built with React, TypeScript, and modern web technologies.

![VeloCity](https://img.shields.io/badge/Version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38bdf8)

## ✨ Key Features

- 🎯 **10 Ride Categories** - Bike, Mini, Sedan, SUV, Luxury, Electric, and more
- 👤 **Multi-Role Support** - Users, Drivers, and Admins
- 📱 **Fully Responsive** - Mobile-first design
- 🌓 **Dark/Light Mode** - Theme switcher included
- 💳 **Payment Ready** - Razorpay integration ready
- 🗺️ **Maps Integration Ready** - Google Maps/OpenStreetMap ready
- 📊 **Analytics Dashboards** - For users, drivers, and admins
- ⚡ **Modern UI/UX** - Smooth animations and glassmorphism effects
- ♿ **Accessible** - Built with Radix UI primitives

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`

## 📸 Screenshots

### Home Page
- Hero section with booking form
- Ride categories showcase
- Testimonials and features

### Booking System
- Real-time fare estimation
- Multiple vehicle options
- Schedule rides in advance

### Dashboards
- User dashboard with ride history
- Driver dashboard with earnings
- Admin panel for management

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18, TypeScript |
| **Routing** | React Router 7 |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Motion (Framer Motion) |
| **UI Components** | Radix UI, shadcn/ui |
| **Icons** | Lucide React |
| **State** | React Hooks |
| **Forms** | React Hook Form |
| **Notifications** | Sonner |

## 📁 Project Structure

```
src/
├── app/
│   ├── components/      # Reusable components
│   │   ├── ui/         # UI primitives
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── pages/          # All application pages
│   ├── data/           # Constants and mock data
│   ├── App.tsx
│   └── routes.tsx
├── styles/             # Global styles
└── ...
```

## 📄 Available Pages

1. **Home** (`/`) - Landing page with hero and features
2. **Book Ride** (`/book-ride`) - Ride booking interface
3. **Ride Categories** (`/ride-categories`) - All ride types
4. **Become Driver** (`/become-driver`) - Driver registration
5. **Pricing** (`/pricing`) - Subscription plans
6. **About** (`/about`) - Company information
7. **Contact** (`/contact`) - Contact form
8. **FAQ** (`/faq`) - Common questions
9. **User Dashboard** (`/user-dashboard`) - User account
10. **Driver Dashboard** (`/driver-dashboard`) - Driver panel
11. **Admin Dashboard** (`/admin-dashboard`) - Admin panel
12. **Ride Tracking** (`/track-ride/:id`) - Live tracking

## 🚗 Ride Categories

- **Bike Taxi** - Quick & affordable (₹25 + ₹8/km)
- **Mini** - Everyday comfort (₹50 + ₹12/km)
- **Sedan** - Premium travel (₹80 + ₹15/km)
- **SUV** - Family rides (₹120 + ₹20/km)
- **Luxury** - VIP service (₹200 + ₹30/km)
- **Electric** - Eco-friendly (₹60 + ₹10/km)
- **Outstation** - Long distance (₹300 + ₹18/km)
- **Rental** - Hourly packages (₹150 + ₹120/hr)
- **Pool** - Shared rides (₹30 + ₹6/km)
- **Airport** - Airport transfers (₹200 + ₹16/km)

## 🎨 Customization

### Change Brand Colors

Edit `/src/styles/theme.css`:

```css
:root {
  --primary: #2563eb;      /* Your brand color */
  --secondary: #9333ea;    /* Secondary color */
}
```

### Add New Ride Category

Edit `/src/app/data/constants.ts`:

```typescript
{
  id: "new-ride",
  name: "New Ride Type",
  basePrice: 100,
  pricePerKm: 15,
  // ... more details
}
```

## 🔌 API Integration

### Ready for Backend Integration

The frontend is prepared for backend API integration:

1. **Authentication** - User/Driver login & registration
2. **Booking API** - Create and manage bookings
3. **Payment Gateway** - Razorpay integration
4. **Maps API** - Google Maps or OpenStreetMap
5. **Real-time Tracking** - WebSocket ready

See `PROJECT_DOCUMENTATION.md` for detailed API integration guide.

## 💳 Payment Integration

### Razorpay Setup

1. Get API keys from [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Add to environment variables:

```env
VITE_RAZORPAY_KEY_ID=your_key_id
VITE_RAZORPAY_KEY_SECRET=your_secret
```

3. Integration code is ready in booking flow

## 🗺️ Maps Integration

### Google Maps

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

### Alternative: OpenStreetMap (Free)

```bash
npm install leaflet react-leaflet
```

## 📱 PWA Support

Convert to Progressive Web App:

```bash
npm install vite-plugin-pwa -D
```

Configure in `vite.config.ts` (see documentation)

## 🌐 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`

### Other Platforms

Works with any static hosting:
- GitHub Pages
- Cloudflare Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 🔐 Environment Variables

Create `.env` file:

```env
# Maps
VITE_GOOGLE_MAPS_API_KEY=your_key

# Payment
VITE_RAZORPAY_KEY_ID=your_key
VITE_RAZORPAY_KEY_SECRET=your_secret

# Backend API (when ready)
VITE_API_URL=https://api.yourdomain.com
```

## 📚 Documentation

For detailed documentation, see:
- **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** - Complete guide
- **API Integration** - Backend integration guide
- **Deployment** - Production deployment steps
- **Customization** - Branding and features

## 🎯 Roadmap

- [ ] Backend API development (Node.js + Express)
- [ ] Real-time ride tracking with WebSocket
- [ ] Push notifications
- [ ] Mobile apps (React Native)
- [ ] Advanced analytics
- [ ] AI-based pricing
- [ ] Multi-language support
- [ ] Driver app

## 🤝 Contributing

This is a demonstration project. Feel free to customize for your needs.

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 💬 Support

For issues or questions:
- 📧 Email: support@velocity.com
- 📞 Phone: +1 (800) 123-4567

## 🙏 Acknowledgments

- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://radix-ui.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Motion](https://motion.dev)
- [Unsplash](https://unsplash.com) for images

---

**Built with ❤️ using modern web technologies**

**VeloCity - Ride Fast, Live Smart** 🚗💨
