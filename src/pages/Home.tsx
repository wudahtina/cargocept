import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package, Truck, Clock, Shield, Globe } from 'lucide-react';

const features = [
  {
    title: "Fast & Reliable Delivery",
    description: "Get your packages delivered quickly and safely with our efficient logistics network.",
    icon: <Truck className="h-10 w-10" />,
    image: "/large-parcel-delivery-scaled.jpg.webp"
  },
  {
    title: "Real-time Tracking",
    description: "Track your shipments in real-time with our advanced tracking system.",
    icon: <Clock className="h-10 w-10" />,
    image: "/delivery logistics.webp"
  },
  {
    title: "Secure Shipping",
    description: "Your packages are protected with our comprehensive insurance coverage.",
    icon: <Shield className="h-10 w-10" />,
    image: "/last-mile-delivery-logistics.jpg"
  },
  {
    title: "Global Coverage",
    description: "Ship to any destination worldwide with our extensive network.",
    icon: <Globe className="h-10 w-10" />,
    image: "/how-e-logistics-is-improving-supply-chain-efficiency-1920x1274.jpg.webp"
  }
];

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="absolute inset-0">
          <img
            src="/141518321-delivery-service-concept-business-logistics-vector-infographic.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Your Trusted Partner in Global Logistics
            </h1>
            <p className="text-xl mb-8">
              Experience seamless shipping solutions with real-time tracking and reliable delivery services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/book-shipment">Book a Shipment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/track">Track a Package</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive shipping solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
              <div className="relative h-64">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="mb-4 text-primary-foreground">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-primary-foreground/90">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Ship?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start your shipping journey with us today and experience the difference
            </p>
            <Button size="lg" asChild>
              <Link to="/book-shipment">Book Your Shipment Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Our Location</h3>
              <p className="text-muted-foreground">
                80 Park End St<br />
                Broom Hill<br />
                BH21 0XW<br />
                United Kingdom
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <p className="text-muted-foreground">
                Phone: +44 70 8897 8089<br />
                Email: info@cargocept.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

