import { useState } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { DollarSign, TrendingUp, Clock, Star, Navigation, CheckCircle } from "lucide-react";

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Driver Dashboard</h1>
              <p className="text-muted-foreground">Manage your earnings and rides</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-medium">Go {isOnline ? "Offline" : "Online"}</span>
              <Switch checked={isOnline} onCheckedChange={setIsOnline} />
            </div>
          </div>

          {isOnline && (
            <Card className="mb-8 border-2 border-green-500 bg-green-50 dark:bg-green-950">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-2">You're Online!</div>
                    <p className="text-muted-foreground">Ready to accept ride requests</p>
                  </div>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Accept New Rides
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                <div className="text-2xl font-bold">₹12,450</div>
                <div className="text-sm text-muted-foreground">Today's Earnings</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Navigation className="h-8 w-8 text-blue-600 mb-2" />
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">Rides Today</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-purple-600 mb-2" />
                <div className="text-2xl font-bold">8.5h</div>
                <div className="text-sm text-muted-foreground">Online Time</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Star className="h-8 w-8 text-yellow-600 mb-2" />
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm text-muted-foreground">Your Rating</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="earnings">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="rides">Ride History</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="earnings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                      <div key={day} className="flex items-center justify-between">
                        <span className="font-medium">{day}</span>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                              style={{ width: `${Math.random() * 100}%` }}
                            />
                          </div>
                          <span className="font-bold w-20 text-right">
                            ₹{Math.floor(Math.random() * 5000 + 3000)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rides" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Rides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold mb-1">Downtown → Airport</div>
                          <div className="text-sm text-muted-foreground">12:30 PM • 15.2 km</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">₹450</div>
                          <Badge variant="secondary">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg">
                      <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
                      <div className="text-2xl font-bold mb-1">₹45,320</div>
                      <div className="text-sm text-muted-foreground">This Month</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Navigation className="h-8 w-8 text-blue-600 mb-3" />
                      <div className="text-2xl font-bold mb-1">342</div>
                      <div className="text-sm text-muted-foreground">Total Rides</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
