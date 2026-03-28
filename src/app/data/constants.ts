export const BRAND_NAME = "VeloCity";
export const BRAND_TAGLINE = "India's Fastest Ride Service";

export const RIDE_CATEGORIES = [
  {
    id: "bike",
    name: "Bike Ride",
    description: "Quick and affordable rides through traffic",
    icon: "🏍️",
    vehicleEmoji: "🏍️",
    basePrice: 20,
    pricePerKm: 7,
    minFare: 30,
    capacity: 1,
    eta: "2-5 mins",
    features: ["Beat Traffic", "Fastest", "Economical"],
    color: "#FFC800",
  },
  {
    id: "auto",
    name: "Auto Ride",
    description: "Comfortable 3-wheeler for city travel",
    icon: "🛺",
    vehicleEmoji: "🛺",
    basePrice: 30,
    pricePerKm: 9,
    minFare: 40,
    capacity: 3,
    eta: "3-7 mins",
    features: ["Affordable", "Comfortable", "Familiar"],
    color: "#00A859",
  },
  {
    id: "taxi",
    name: "Taxi Ride",
    description: "Comfortable AC cab for everyday travel",
    icon: "🚕",
    vehicleEmoji: "🚕",
    basePrice: 50,
    pricePerKm: 12,
    minFare: 80,
    capacity: 4,
    eta: "5-10 mins",
    features: ["AC", "Comfortable", "Spacious"],
    color: "#0066FF",
  },
  {
    id: "sedan",
    name: "Sedan Ride",
    description: "Premium sedan for business travel",
    icon: "🚗",
    vehicleEmoji: "🚗",
    basePrice: 80,
    pricePerKm: 15,
    minFare: 120,
    capacity: 4,
    eta: "7-12 mins",
    features: ["Premium AC", "Professional", "Luxury"],
    color: "#8B3DFF",
  },
];

export const INDIAN_CITIES = [
  { name: "Delhi", state: "Delhi" },
  { name: "Noida", state: "Uttar Pradesh" },
  { name: "Lucknow", state: "Uttar Pradesh" },
  { name: "Etah", state: "Uttar Pradesh" },
  { name: "Mumbai", state: "Maharashtra" },
  { name: "Bangalore", state: "Karnataka" },
  { name: "Hyderabad", state: "Telangana" },
  { name: "Chennai", state: "Tamil Nadu" },
  { name: "Kolkata", state: "West Bengal" },
  { name: "Pune", state: "Maharashtra" },
  { name: "Jaipur", state: "Rajasthan" },
  { name: "Ahmedabad", state: "Gujarat" },
];

export const POPULAR_ROUTES = [
  {
    from: "Connaught Place, Delhi",
    to: "Indira Gandhi International Airport, Delhi",
    distance: "15 km",
    avgPrice: 280,
    duration: "35 mins",
  },
  {
    from: "Sector 18, Noida",
    to: "Cyber City, Gurugram",
    distance: "42 km",
    avgPrice: 650,
    duration: "1 hr 10 mins",
  },
  {
    from: "Hazratganj, Lucknow",
    to: "Chaudhary Charan Singh Airport, Lucknow",
    distance: "18 km",
    avgPrice: 320,
    duration: "40 mins",
  },
  {
    from: "Etah City Center",
    to: "Agra Fort, Agra",
    distance: "65 km",
    avgPrice: 980,
    duration: "1 hr 30 mins",
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: "⚡",
    title: "Fastest Rides",
    description: "Get a ride in under 5 minutes. Beat the traffic with our bike service.",
  },
  {
    icon: "💰",
    title: "Lowest Prices",
    description: "Starting at just ₹30. Most affordable rides in India.",
  },
  {
    icon: "🔒",
    title: "100% Safe",
    description: "All drivers verified with Aadhaar & DL. Live tracking & SOS available.",
  },
  {
    icon: "🌟",
    title: "Top Rated",
    description: "4.5+ star rated drivers. Professional and courteous service.",
  },
  {
    icon: "📱",
    title: "Easy Booking",
    description: "Book in 3 taps. No waiting, instant confirmation.",
  },
  {
    icon: "💳",
    title: "Cashless Payments",
    description: "Pay via UPI, Cards, Wallets or Cash. Multiple payment options.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    role: "IT Professional, Noida",
    rating: 5,
    comment: "VeloCity bike rides save me 30 minutes daily in traffic. Best decision for my daily commute!",
    avatar: "indian professional man",
    location: "Noida",
  },
  {
    name: "Priya Singh",
    role: "Student, Lucknow",
    rating: 5,
    comment: "Auto rides are so affordable! I use VeloCity every day to reach college. Highly recommended.",
    avatar: "indian student woman",
    location: "Lucknow",
  },
  {
    name: "Amit Verma",
    role: "Businessman, Delhi",
    rating: 5,
    comment: "Sedan service is perfect for client meetings. Professional drivers and clean vehicles.",
    avatar: "indian businessman",
    location: "Delhi",
  },
  {
    name: "Sneha Gupta",
    role: "Doctor, Etah",
    rating: 5,
    comment: "Very reliable service. I book rides for hospital visits and they're always on time.",
    avatar: "indian woman doctor",
    location: "Etah",
  },
];

export const DRIVER_BENEFITS = [
  {
    icon: "💸",
    title: "Earn ₹30,000+/Month",
    description: "High earning potential with flexible hours and weekly payouts.",
  },
  {
    icon: "⏰",
    title: "Flexible Timings",
    description: "Drive when you want. Morning, evening or full time - your choice.",
  },
  {
    icon: "📈",
    title: "Weekly Payments",
    description: "Get paid every week directly to your bank account. No delays.",
  },
  {
    icon: "🎁",
    title: "Bonuses & Incentives",
    description: "Earn extra with ride completion bonuses and referral rewards.",
  },
];

export const SUBSCRIPTION_PLANS = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 99,
    period: "month",
    discount: 10,
    features: [
      "10% off on all rides",
      "Priority booking",
      "Free cancellation (3 rides/month)",
      "24/7 support",
      "Ride history & invoices",
    ],
    popular: false,
    color: "#FFC800",
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: 299,
    period: "month",
    discount: 20,
    features: [
      "20% off on all rides",
      "Free airport transfer (1/month)",
      "Priority support",
      "No surge pricing",
      "Free cancellation (10 rides/month)",
      "Exclusive rewards",
    ],
    popular: true,
    color: "#FF6B00",
  },
  {
    id: "business",
    name: "Business Plan",
    price: 999,
    period: "month",
    discount: 30,
    features: [
      "30% off on all rides",
      "Unlimited rides worth ₹15,000",
      "Dedicated account manager",
      "GST invoices",
      "Multiple employee accounts",
      "Analytics dashboard",
      "Corporate billing",
    ],
    popular: false,
    color: "#8B3DFF",
  },
];

export const FAQ_DATA = [
  {
    question: "How do I book a ride on VeloCity?",
    answer: "Download the app or visit our website. Enter your pickup and drop location, choose your ride type (Bike, Auto, Taxi or Sedan), and confirm booking. A driver will be assigned within minutes.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash. All online payments are processed securely through Razorpay.",
  },
  {
    question: "How is the fare calculated?",
    answer: "Fare = Base Fare + (Distance × Per KM rate) + Waiting charges (if any). You can see the estimated fare before booking. Actual fare may vary based on route and traffic.",
  },
  {
    question: "Can I cancel my ride?",
    answer: "Yes. Free cancellation within 2 minutes of booking. After that, cancellation charges of ₹10-30 may apply based on ride type.",
  },
  {
    question: "Is VeloCity available in my city?",
    answer: "We currently operate in Delhi, Noida, Lucknow, Etah, and 50+ other cities across India. More cities coming soon!",
  },
  {
    question: "How do I become a VeloCity driver?",
    answer: "Visit 'Become a Driver' page, fill the form with your details, upload documents (Aadhaar, Driving License, Vehicle RC), and complete verification. Start earning within 48 hours!",
  },
  {
    question: "Are all drivers verified?",
    answer: "Yes! All drivers undergo strict background verification including Aadhaar verification, Driving License check, and vehicle inspection before onboarding.",
  },
  {
    question: "What should I do in case of emergency?",
    answer: "Use the in-app SOS button to alert emergency contacts and our support team. You can also call our 24/7 helpline at 1800-XXX-XXXX.",
  },
];

export const VEHICLE_TYPES = [
  {
    type: "Bike",
    models: ["Hero Splendor", "Honda Activa", "TVS Apache", "Bajaj Pulsar"],
    capacity: "1 passenger",
    luggage: "1 small bag",
  },
  {
    type: "Auto",
    models: ["Bajaj RE", "Piaggio Ape", "TVS King"],
    capacity: "3 passengers",
    luggage: "2 medium bags",
  },
  {
    type: "Taxi",
    models: ["Maruti Swift", "Hyundai i20", "Honda Amaze", "Tata Tiago"],
    capacity: "4 passengers",
    luggage: "2 large bags",
  },
  {
    type: "Sedan",
    models: ["Honda City", "Maruti Ciaz", "Hyundai Verna", "Skoda Rapid"],
    capacity: "4 passengers",
    luggage: "3 large bags",
  },
];


export const POPULAR_DESTINATIONS = typeof POPULAR_ROUTES !== 'undefined' ? POPULAR_ROUTES : [];

export const PRICING_PLANS = [
  {
    name: "Basic",
    price: "₹9/km",
    features: ["Standard cab","AC ride","24/7 booking","Cash or online payment"]
  },
  {
    name: "Premium",
    price: "₹14/km",
    features: ["Luxury cab","Professional driver","Priority booking","24/7 support"]
  },
  {
    name: "Business",
    price: "₹18/km",
    features: ["Top rated drivers","Luxury vehicles","Corporate billing","Premium support"]
  }
];
