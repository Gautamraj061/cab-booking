import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Phone, MessageSquare, Navigation, Clock, MapPin, Star } from "lucide-react";

export default function RideTracking() {
  const { rideId } = useParams();
  const [eta, setEta] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Track Your Ride</h1>

          {/* Map Placeholder */}
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 h-96 rounded-t-lg flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-16 w-16 mx-auto mb-4 text-blue-600 animate-pulse" />
                  <div className="text-xl font-semibold">Live Tracking</div>
                  <div className="text-muted-foreground">Ride ID: {rideId}</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Estimated Arrival</div>
                    <div className="text-3xl font-bold">{eta} mins</div>
                  </div>
                  <Badge className="text-lg px-4 py-2 bg-green-600">On the Way</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver Info */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-2xl font-bold">John Driver</div>
                    <div className="flex items-center text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      4.9 • 1,234 rides
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="icon" variant="outline">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-accent rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Vehicle</div>
                  <div className="font-semibold">Honda City</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Plate Number</div>
                  <div className="font-semibold">XX-00-XX-1234</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Trip Details</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-950 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Pickup</div>
                    <div className="font-semibold">123 Main Street, Downtown</div>
                  </div>
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    2:30 PM
                  </Badge>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-950 p-2 rounded-full">
                    <Navigation className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Drop-off</div>
                    <div className="font-semibold">456 Airport Road, Terminal 1</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Distance</span>
                  <span className="font-semibold">15.2 km</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Estimated Fare</span>
                  <span className="text-2xl font-bold">₹450</span>
                </div>
              </div>

              <Button variant="destructive" className="w-full">
                Cancel Ride
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
