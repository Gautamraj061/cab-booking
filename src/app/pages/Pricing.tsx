import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { CheckCircle, Star } from "lucide-react";
import { PRICING_PLANS } from "../data/constants";
import { Link } from "react-router";
import { motion } from "motion/react";

export default function Pricing() {
  return (
    <Layout>
      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-white/20">Pricing Plans</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              Save more with our subscription plans. Enjoy exclusive benefits and discounts.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {PRICING_PLANS.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`relative h-full ${
                      plan.popular
                        ? "border-4 border-blue-500 shadow-2xl scale-105"
                        : "hover:shadow-xl"
                    } transition-all`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                          <Star className="h-4 w-4 mr-1 fill-white" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <span className="text-5xl font-bold">₹{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/book-ride">
                        <Button
                          className={`w-full ${
                            plan.popular
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              : ""
                          }`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
