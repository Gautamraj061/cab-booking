import { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { CheckCircle, DollarSign, Clock, TrendingUp, HeadphonesIcon, Upload, ArrowRight } from "lucide-react";
import { DRIVER_BENEFITS } from "../data/constants";
import { toast } from "sonner";
import { motion } from "motion/react";

export default function BecomeDriver() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleNumber: "",
    licenseNumber: "",
    experience: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully! We'll contact you within 24-48 hours.");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const iconMap: Record<string, any> = {
    DollarSign,
    Clock,
    TrendingUp,
    HeadphonesIcon,
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20">Driver Partnership</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Drive & Earn with VeloCity
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of drivers earning flexible income on their own schedule.
                Start your journey with us today!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">₹50K+</div>
                  <div className="text-sm text-white/80">Avg. Monthly Earning</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-white/80">Flexible Hours</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">Weekly</div>
                  <div className="text-sm text-white/80">Payouts</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">50K+</div>
                  <div className="text-sm text-white/80">Active Drivers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Drive with Us?</h2>
              <p className="text-xl text-muted-foreground">
                Enjoy unmatched benefits and support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {DRIVER_BENEFITS.map((benefit, index) => {
                const Icon = iconMap[benefit.icon] || CheckCircle;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                          <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Benefits */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  More Benefits You'll Love
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    "Bonus & Incentives",
                    "Insurance Coverage",
                    "Training Programs",
                    "Fuel Discounts",
                    "Referral Rewards",
                    "Priority Support",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-white flex-shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Requirements</h2>
                <p className="text-xl text-muted-foreground">
                  Make sure you meet these requirements before applying
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Driver Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Minimum age: 21 years",
                        "Valid driving license (min 2 years old)",
                        "Clean driving record",
                        "Police verification certificate",
                        "Aadhar card and PAN card",
                        "Smartphone with active internet",
                      ].map((req) => (
                        <li key={req} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Vehicle registration certificate (RC)",
                        "Valid insurance papers",
                        "Pollution Under Control (PUC) certificate",
                        "Vehicle fitness certificate",
                        "Four-wheeler or two-wheeler",
                        "Vehicle should be in good condition",
                      ].map((req) => (
                        <li key={req} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Driver Registration Form</CardTitle>
                  <p className="text-muted-foreground">
                    Fill in your details to start the application process
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            required
                            value={formData.fullName}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                            placeholder="Enter your full name"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="your.email@example.com"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="+91 XXXXX XXXXX"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            required
                            value={formData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            placeholder="Enter your city"
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Vehicle Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="vehicleType">Vehicle Type *</Label>
                          <Select
                            value={formData.vehicleType}
                            onValueChange={(value) =>
                              handleInputChange("vehicleType", value)
                            }
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bike">Bike</SelectItem>
                              <SelectItem value="mini">Mini Car</SelectItem>
                              <SelectItem value="sedan">Sedan</SelectItem>
                              <SelectItem value="suv">SUV</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="vehicleModel">Vehicle Model *</Label>
                          <Input
                            id="vehicleModel"
                            required
                            value={formData.vehicleModel}
                            onChange={(e) =>
                              handleInputChange("vehicleModel", e.target.value)
                            }
                            placeholder="e.g., Honda City"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
                          <Input
                            id="vehicleNumber"
                            required
                            value={formData.vehicleNumber}
                            onChange={(e) =>
                              handleInputChange("vehicleNumber", e.target.value)
                            }
                            placeholder="XX-00-XX-0000"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="licenseNumber">License Number *</Label>
                          <Input
                            id="licenseNumber"
                            required
                            value={formData.licenseNumber}
                            onChange={(e) =>
                              handleInputChange("licenseNumber", e.target.value)
                            }
                            placeholder="Enter license number"
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <Label htmlFor="experience">Driving Experience</Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) =>
                          handleInputChange("experience", e.target.value)
                        }
                        placeholder="Tell us about your driving experience..."
                        className="mt-2"
                        rows={4}
                      />
                    </div>

                    {/* Document Upload */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Upload Documents
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Driving License",
                          "Vehicle RC",
                          "Insurance",
                          "PUC Certificate",
                        ].map((doc) => (
                          <div key={doc} className="border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <div className="text-sm font-medium mb-1">{doc}</div>
                            <div className="text-xs text-muted-foreground">
                              Click to upload
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg"
                    >
                      Submit Application
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
