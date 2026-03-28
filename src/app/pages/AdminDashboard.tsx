import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Users, Car, DollarSign, TrendingUp, CheckCircle, XCircle, MessageSquare, Target, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <div className="text-2xl font-bold">10,234</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Car className="h-8 w-8 text-green-600 mb-2" />
                <div className="text-2xl font-bold">5,432</div>
                <div className="text-sm text-muted-foreground">Active Drivers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 text-purple-600 mb-2" />
                <div className="text-2xl font-bold">₹2.5M</div>
                <div className="text-sm text-muted-foreground">Revenue (Month)</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-orange-600 mb-2" />
                <div className="text-2xl font-bold">45,678</div>
                <div className="text-sm text-muted-foreground">Total Rides</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="drivers">Drivers</TabsTrigger>
              <TabsTrigger value="rides">Rides</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="ai-support">AI Support</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold">User {i}</div>
                          <div className="text-sm text-muted-foreground">user{i}@example.com</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{Math.floor(Math.random() * 50)} rides</Badge>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="drivers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Driver Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold">Driver Application #{i}</div>
                          <div className="text-sm text-muted-foreground">Pending verification</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
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
                          <div className="font-semibold">Ride #R00{i}</div>
                          <div className="text-sm text-muted-foreground">
                            Downtown → Airport • ₹{Math.floor(Math.random() * 500 + 200)}
                          </div>
                        </div>
                        <Badge>Completed</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">₹2,543,210</div>
                    <div className="text-green-600 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +24% from last month
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">+1,234</div>
                    <div className="text-green-600 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +18% from last month
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai-support" className="mt-6">
              <div className="space-y-6">
                {/* AI Support Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
                      <div className="text-2xl font-bold">1,247</div>
                      <div className="text-sm text-muted-foreground">Total Queries</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <AlertCircle className="h-8 w-8 text-orange-600 mb-2" />
                      <div className="text-2xl font-bold">23</div>
                      <div className="text-sm text-muted-foreground">Escalated Queries</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <Target className="h-8 w-8 text-green-600 mb-2" />
                      <div className="text-2xl font-bold">87%</div>
                      <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                      <div className="text-2xl font-bold">+15%</div>
                      <div className="text-sm text-muted-foreground">Resolution Rate</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Most Common Issues */}
                <Card>
                  <CardHeader>
                    <CardTitle>Most Common Support Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { issue: 'Payment Issues', count: 342, percentage: 27 },
                        { issue: 'Booking Problems', count: 289, percentage: 23 },
                        { issue: 'Driver Complaints', count: 156, percentage: 13 },
                        { issue: 'Ride Tracking', count: 134, percentage: 11 },
                        { issue: 'Account Issues', count: 98, percentage: 8 },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.issue}</span>
                            <span className="text-sm text-muted-foreground">{item.count} queries</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Performance Metrics */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">1.2s</div>
                      <div className="text-sm text-muted-foreground mb-4">Average response time</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Fastest Response</span>
                          <span className="font-medium">0.5s</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Slowest Response</span>
                          <span className="font-medium">2.8s</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Feedback</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Very Satisfied</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }} />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">62%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Satisfied</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }} />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">25%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Neutral</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '10%' }} />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">10%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Unsatisfied</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '3%' }} />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">3%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <Button onClick={() => window.location.href = '/support-dashboard'}>
                        View Support Dashboard
                      </Button>
                      <Button variant="outline">Download Chat Logs</Button>
                      <Button variant="outline">Export Analytics</Button>
                      <Button variant="outline">Configure AI Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}