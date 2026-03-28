import { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import {
  MapPin,
  Navigation,
  Calendar as CalendarIcon,
  Clock,
  Users,
  CreditCard,
  Bike,
  Car,
  Truck,
  Crown,
  Leaf,
  Plane,
  Info,
  ArrowRight,
} from "lucide-react";
import { RIDE_CATEGORIES } from "../data/constants";
import { format } from "date-fns";

export default function BookRide() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("mini");
  const [date, setDate] = useState<Date>();
  const [isScheduled, setIsScheduled] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [distance, setDistance] = useState(0);

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

  const calculateFare = () => {
    const category = RIDE_CATEGORIES.find((c) => c.id === selectedCategory);
    if (!category) return;

    // Simulate distance calculation (in real app, this would use Maps API)
    const simulatedDistance = Math.random() * 20 + 5; // 5-25 km
    setDistance(Number(simulatedDistance.toFixed(1)));

    const fare =
      category.basePrice + simulatedDistance * category.pricePerKm;
    setEstimatedFare(Math.max(fare, category.minFare));
  };

  const handleBookRide = () => {
    if (!pickup || !dropoff) {
      alert("Please enter both pickup and drop locations");
      return;
    }
    calculateFare();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Badge className="mb-4">Book a Ride</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Where to?
              </h1>
              <p className="text-xl text-muted-foreground">
                Enter your journey details and get instant fare estimate
              </p>
            </div>

            {/* Main Booking Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Journey Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pickup Location */}
                <div>
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                    <Input
                      id="pickup"
                      placeholder="Enter pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="pl-12 h-12"
                    />
                  </div>
                </div>

                {/* Drop Location */}
                <div>
                  <Label htmlFor="dropoff">Drop Location</Label>
                  <div className="relative mt-2">
                    <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-600" />
                    <Input
                      id="dropoff"
                      placeholder="Enter drop location"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="pl-12 h-12"
                    />
                  </div>
                </div>

                {/* Schedule Ride */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="schedule"
                    checked={isScheduled}
                    onChange={(e) => setIsScheduled(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="schedule">Schedule ride for later</Label>
                </div>

                {/* Date Time Picker */}
                {isScheduled && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal mt-2"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="time">Select Time</Label>
                      <Input id="time" type="time" className="mt-2" />
                    </div>
                  </div>
                )}

                {/* Number of Passengers */}
                <div>
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <div className="relative mt-2">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="passengers"
                      type="number"
                      min="1"
                      max="6"
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="pl-12"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ride Category Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Select Ride Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {RIDE_CATEGORIES.map((category) => {
                    const Icon = iconMap[category.icon] || Car;
                    return (
                      <div key={category.id}>
                        <RadioGroupItem
                          value={category.id}
                          id={category.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={category.id}
                          className="flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-950 hover:border-blue-300 transition-all"
                        >
                          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-lg">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold mb-1">{category.name}</div>
                            <div className="text-sm text-muted-foreground mb-2">
                              {category.description}
                            </div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {category.features.slice(0, 2).map((feature) => (
                                <Badge key={feature} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <div className="text-sm font-semibold">
                              Base: ₹{category.basePrice} + ₹{category.pricePerKm}/km
                            </div>
                          </div>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                        <span>Online Payment (Card/UPI/Wallet)</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <span className="mr-2">💵</span>
                        <span>Cash</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Estimate Button */}
            <Button
              onClick={handleBookRide}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg mb-6"
            >
              Get Fare Estimate
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Fare Estimate */}
            {estimatedFare > 0 && (
              <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Estimated Distance
                      </div>
                      <div className="text-2xl font-bold">{distance} km</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">
                        Estimated Fare
                      </div>
                      <div className="text-3xl font-bold text-blue-600">
                        ₹{Math.round(estimatedFare)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Base Fare</span>
                      <span className="text-sm font-medium">
                        ₹
                        {
                          RIDE_CATEGORIES.find((c) => c.id === selectedCategory)
                            ?.basePrice
                        }
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Distance Charge</span>
                      <span className="text-sm font-medium">
                        ₹
                        {Math.round(
                          distance *
                            (RIDE_CATEGORIES.find((c) => c.id === selectedCategory)
                              ?.pricePerKm || 0)
                        )}
                      </span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-lg">
                          ₹{Math.round(estimatedFare)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-sm text-muted-foreground mb-4">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>
                      Final fare may vary based on actual distance, time, and traffic
                      conditions. Toll charges are extra.
                    </p>
                  </div>

                  <Button className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
