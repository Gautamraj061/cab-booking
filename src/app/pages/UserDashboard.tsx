import { useState } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { ProfileSection } from "../components/ProfileSection";
import {
  User,
  MapPin,
  History,
  CreditCard,
  Settings,
  Star,
  Clock,
  Navigation,
  Award,
  Leaf,
} from "lucide-react";

export default function UserDashboard() {
  const [rides] = useState([
    {
      id: "R001",
      date: "2026-03-14",
      from: "Downtown",
      to: "Airport",
      fare: 450,
      driver: "John Smith",
      rating: 5,
      status: "completed",
    },
    {
      id: "R002",
      date: "2026-03-12",
      from: "Home",
      to: "Shopping Mall",
      fare: 180,
      driver: "Sarah Johnson",
      rating: 4,
      status: "completed",
    },
    {
      id: "R003",
      date: "2026-03-10",
      from: "Office",
      to: "Restaurant",
      fare: 120,
      driver: "Mike Wilson",
      rating: 5,
      status: "completed",
    },
  ]);

  const savedLocations = [
    { name: "Home", address: "123 Main Street, City", icon: "🏠" },
    { name: "Work", address: "456 Business Ave, Downtown", icon: "💼" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your rides, payments, and profile
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl font-bold">{rides.length}</div>
                  <History className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-sm text-muted-foreground">Total Rides</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl font-bold">₹750</div>
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl font-bold">4.8★</div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl font-bold">12kg</div>
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-sm text-muted-foreground">CO₂ Saved</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rides">Ride History</TabsTrigger>
              <TabsTrigger value="locations">Saved Locations</TabsTrigger>
              <TabsTrigger value="payment">Payments</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Rides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rides.slice(0, 3).map((ride) => (
                        <div
                          key={ride.id}
                          className="flex justify-between items-start p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="font-semibold mb-1">
                              {ride.from} → {ride.to}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {ride.date} • {ride.driver}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">₹{ride.fare}</div>
                            <div className="flex items-center text-sm">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              {ride.rating}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Membership Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Rides to Silver Status</span>
                          <span className="text-sm font-semibold">3/10</span>
                        </div>
                        <Progress value={30} />
                      </div>
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                        <div className="text-center">
                          <Award className="h-8 w-8 mx-auto mb-2 text-bronze" />
                          <div className="text-xs font-semibold">Current</div>
                          <div className="text-xs text-muted-foreground">Bronze</div>
                        </div>
                        <div className="text-center opacity-50">
                          <Award className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <div className="text-xs font-semibold">Next</div>
                          <div className="text-xs text-muted-foreground">Silver</div>
                        </div>
                        <div className="text-center opacity-30">
                          <Award className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                          <div className="text-xs font-semibold">Goal</div>
                          <div className="text-xs text-muted-foreground">Gold</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Rides Tab */}
            <TabsContent value="rides">
              <Card>
                <CardHeader>
                  <CardTitle>All Rides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rides.map((ride) => (
                      <div
                        key={ride.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-start space-x-4 mb-4 md:mb-0">
                          <div className="bg-blue-100 dark:bg-blue-950 p-3 rounded-lg">
                            <Navigation className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold mb-1">
                              {ride.from} → {ride.to}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ID: {ride.id} • {ride.date}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Driver: {ride.driver}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold">₹{ride.fare}</div>
                            <Badge variant="secondary" className="mt-1">
                              {ride.status}
                            </Badge>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-semibold">{ride.rating}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Locations Tab */}
            <TabsContent value="locations">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savedLocations.map((location) => (
                      <div
                        key={location.name}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-4xl">{location.icon}</div>
                          <div>
                            <div className="font-semibold">{location.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {location.address}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      Add New Location
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-950">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                          <div>
                            <div className="font-semibold">•••• •••• •••• 4242</div>
                            <div className="text-sm text-muted-foreground">
                              Expires 12/26
                            </div>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <ProfileSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}