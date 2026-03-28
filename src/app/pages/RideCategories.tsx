import Layout from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CheckCircle, Bike, Car, Truck, Crown, Leaf, MapPin, Clock, Users, Plane } from "lucide-react";
import { RIDE_CATEGORIES } from "../data/constants";
import { Link } from "react-router";
import { motion } from "motion/react";

export default function RideCategories() {
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
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-white/20">Our Fleet</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ride Categories
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              Choose from our diverse range of vehicles for every occasion. From
              budget-friendly to luxury, we've got you covered.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {RIDE_CATEGORIES.map((category, index) => {
                const Icon = iconMap[category.icon] || Car;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:shadow-2xl transition-all h-full border-2 hover:border-blue-500">
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl">
                              <Icon className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold mb-2">
                                {category.name}
                              </h2>
                              <p className="text-muted-foreground">
                                {category.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <h3 className="font-semibold mb-3">Features:</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {category.features.map((feature) => (
                              <div
                                key={feature}
                                className="flex items-center space-x-2"
                              >
                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Capacity */}
                        <div className="flex items-center space-x-2 mb-6">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm">
                            Capacity: {category.capacity}{" "}
                            {category.capacity === 1 ? "passenger" : "passengers"}
                          </span>
                        </div>

                        {/* Pricing */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-4 mb-6">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Base Fare
                              </div>
                              <div className="text-xl font-bold text-blue-600">
                                ₹{category.basePrice}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Per {category.pricePerHour ? "Hour" : "KM"}
                              </div>
                              <div className="text-xl font-bold text-purple-600">
                                ₹{category.pricePerKm || category.pricePerHour}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Min Fare
                              </div>
                              <div className="text-xl font-bold text-green-600">
                                ₹{category.minFare}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Book Button */}
                        <Link to="/book-ride">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Book {category.name}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Can't decide? We'll help you!
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Contact our support team for personalized recommendations based on
              your needs
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Contact Support
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
