import { useState } from "react";
import { Link } from "react-router";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  MapPin,
  Navigation,
  Calendar,
  ArrowRight,
  Star,
  Shield,
  Clock,
  Wallet,
  Zap,
  Leaf,
  CheckCircle,
  DollarSign,
  TrendingUp,
  HeadphonesIcon,
  Smartphone,
  Download,
  Play,
  Bike,
  Car,
  Truck,
  Crown,
  Users,
  Plane,
  ChevronRight,
} from "lucide-react";
import { BRAND_NAME, RIDE_CATEGORIES, POPULAR_DESTINATIONS, WHY_CHOOSE_US, TESTIMONIALS, DRIVER_BENEFITS } from "../data/constants";
import { motion } from "motion/react";

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("mini");

  const iconMap: Record<string, any> = {
    Bike,
    Car,
    Truck,
    Crown,
    Leaf,
    MapPin,
    Clock,
    Users,
    Plane,
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1664881876314-5fc1beacec1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0YXhpJTIwY2FiJTIwY2l0eXxlbnwxfHx8fDE3NzM1NzY3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern city taxi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">
                🚀 Now Available in 50+ Cities
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Your Ride,
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Your Way
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Book rides instantly with {BRAND_NAME}. Safe, affordable, and
                eco-friendly transportation at your fingertips.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book-ride">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8">
                    Book Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/become-driver">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-black">
                    Become a Driver
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold">10M+</div>
                  <div className="text-gray-400">Happy Riders</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-gray-400">Drivers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-gray-400">Cities</div>
                </div>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 shadow-2xl border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Book Your Ride</h3>
                  
                  {/* Pickup Location */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Pickup Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                      <Input
                        placeholder="Enter pickup location"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="pl-12 h-12"
                      />
                    </div>
                  </div>

                  {/* Drop Location */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Drop Location
                    </label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-600" />
                      <Input
                        placeholder="Enter drop location"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        className="pl-12 h-12"
                      />
                    </div>
                  </div>

                  {/* Ride Categories */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">
                      Select Ride Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {RIDE_CATEGORIES.slice(0, 4).map((category) => {
                        const Icon = iconMap[category.icon] || Car;
                        return (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedCategory === category.id
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <Icon className="h-5 w-5 mb-1 mx-auto" />
                            <div className="text-xs font-medium">{category.name}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Schedule Option */}
                  <div className="mb-6">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule for Later
                    </Button>
                  </div>

                  {/* Book Button */}
                  <Link to="/book-ride">
                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg">
                      Find Rides
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ride Categories Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Perfect Ride
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From budget-friendly to luxury, we have the perfect ride for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {RIDE_CATEGORIES.map((category, index) => {
              const Icon = iconMap[category.icon] || Car;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group hover:shadow-xl transition-all cursor-pointer h-full border-2 hover:border-blue-500">
                    <CardContent className="p-6">
                      <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        {category.features.map((feature) => (
                          <div key={feature} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">₹{category.basePrice}</span>
                        <span className="text-muted-foreground ml-2">base fare</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/ride-categories">
              <Button size="lg" variant="outline">
                View All Categories
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Popular Routes</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trending Destinations
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick access to frequently traveled destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_DESTINATIONS.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={
                        index === 0
                          ? "https://images.unsplash.com/photo-1758669246636-17a5f6d972ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwdGVybWluYWwlMjBtb2Rlcm58ZW58MXx8fHwxNzczNTc2NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          : index === 1
                          ? "https://images.unsplash.com/photo-1585377411866-9a36320135d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRpc3RyaWN0JTIwc2t5c2NyYXBlcnN8ZW58MXx8fHwxNzczNTc2NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          : index === 2
                          ? "https://images.unsplash.com/photo-1677381667267-5b922eb18eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzaG9wcGluZyUyMG1hbGx8ZW58MXx8fHwxNzczNTc2NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          : "https://images.unsplash.com/photo-1645874197112-11a90125cf4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlsd2F5JTIwc3RhdGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3NzM1NzY3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      }
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">From ₹{destination.avgPrice}</span>
                        <span className="text-sm flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {destination.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The {BRAND_NAME} Advantage
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our premium features and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((feature, index) => {
              const Icon = iconMap[feature.icon] || feature.icon === "Clock" ? Clock :
                feature.icon === "Shield" ? Shield :
                feature.icon === "Wallet" ? Wallet :
                feature.icon === "Zap" ? Zap :
                feature.icon === "Star" ? Star :
                feature.icon === "Leaf" ? Leaf : CheckCircle;
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-blue-400">
                    <CardContent className="p-8">
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                        <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Driver Partner Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1683744269796-a1cc9555432d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2ZXIlMjBzbWlsaW5nJTIwY2FyfGVufDF8fHx8MTc3MzU3Njc2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Happy driver"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-purple-900/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="mb-4 bg-white/20">For Drivers</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Drive with {BRAND_NAME}
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of drivers earning flexible income on their own schedule.
                Start your journey with us today!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {DRIVER_BENEFITS.map((benefit) => {
                  const Icon = benefit.icon === "DollarSign" ? DollarSign :
                    benefit.icon === "Clock" ? Clock :
                    benefit.icon === "TrendingUp" ? TrendingUp :
                    benefit.icon === "HeadphonesIcon" ? HeadphonesIcon : CheckCircle;
                  
                  return (
                    <div key={benefit.title} className="flex items-start space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-white/80">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link to="/become-driver">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                  Register as Driver
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Card className="backdrop-blur-xl bg-white/10 border-white/20 text-white p-8">
                <h3 className="text-2xl font-bold mb-6">Driver Requirements</h3>
                <ul className="space-y-4">
                  {[
                    "Valid driving license (minimum 2 years old)",
                    "Vehicle registration certificate",
                    "Valid insurance papers",
                    "Police verification certificate",
                    "Minimum age: 21 years",
                    "Clean driving record",
                  ].map((req) => (
                    <li key={req} className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-400 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Riders Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join millions of satisfied customers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center">
                      <ImageWithFallback
                        src={
                          index === 0
                            ? "https://images.unsplash.com/photo-1745434159123-4908d0b9df94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzczNDgyODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            : index === 1
                            ? "https://images.unsplash.com/photo-1746791006255-6337e86080f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzc3xlbnwxfHx8fDE3NzM1NDY0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            : index === 2
                            ? "https://images.unsplash.com/photo-1714115661024-7600ef587fd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc3R1ZGVudHxlbnwxfHx8fDE3NzM1NzY3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            : "https://images.unsplash.com/photo-1758599543129-f12d83d5dbae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NzM1NzY3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        }
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-white/20">Download Now</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get the {BRAND_NAME} App
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Download our app for the best experience. Available on iOS and Android.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button size="lg" className="bg-black hover:bg-gray-900 text-white">
                  <Download className="mr-2 h-5 w-5" />
                  Download on App Store
                </Button>
                <Button size="lg" className="bg-black hover:bg-gray-900 text-white">
                  <Play className="mr-2 h-5 w-5" />
                  Get it on Google Play
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-1">4.8★</div>
                  <div className="text-sm text-white/80">App Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">5M+</div>
                  <div className="text-sm text-white/80">Downloads</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">100K+</div>
                  <div className="text-sm text-white/80">Reviews</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629697776275-725482b486f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwYXBwJTIwbW9ja3VwfGVufDF8fHx8MTc3MzU1NDYzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="VeloCity App"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 text-white border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/5" />
            <CardContent className="p-12 md:p-16 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-xl mb-8 text-white/80">
                  Join millions of riders who trust {BRAND_NAME} for their daily commute
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/book-ride">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                      Book Your First Ride
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      View Pricing Plans
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
