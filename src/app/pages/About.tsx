import Layout from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Target, Eye, Heart, Users, Globe, Award } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const values = [
    { icon: Heart, title: "Customer First", description: "Your satisfaction is our top priority" },
    { icon: Users, title: "Community", description: "Building strong relationships with riders and drivers" },
    { icon: Globe, title: "Sustainability", description: "Committed to eco-friendly transportation" },
    { icon: Award, title: "Excellence", description: "Delivering exceptional service every time" },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-white/20">About Us</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              Revolutionizing urban mobility with technology, safety, and sustainability
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  VeloCity is more than just a ride-hailing platform. We're a community of riders, drivers, and innovators working together to transform urban transportation.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Founded in 2020, we've grown from a small startup to serving millions of riders across 50+ cities. Our mission is to make transportation accessible, affordable, and sustainable for everyone.
                </p>
                <p className="text-lg text-muted-foreground">
                  With cutting-edge technology, verified drivers, and a commitment to safety, we're redefining what it means to get from point A to point B.
                </p>
              </div>
              <div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1664881876314-5fc1beacec1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0YXhpJTIwY2FiJTIwY2l0eXxlbnwxfHx8fDE3NzM1NzY3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="VeloCity story"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <Card className="border-2">
                <CardContent className="p-8">
                  <Target className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To provide safe, reliable, and affordable transportation solutions that connect communities and reduce environmental impact through innovative technology and exceptional service.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-8">
                  <Eye className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become the world's most trusted mobility platform, empowering millions of drivers and riders while leading the transition to sustainable urban transportation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-5xl font-bold mb-2">10M+</div>
                <div className="text-white/80">Happy Riders</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50K+</div>
                <div className="text-white/80">Active Drivers</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-white/80">Cities Served</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">100M+</div>
                <div className="text-white/80">Rides Completed</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
