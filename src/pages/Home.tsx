import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, Shield, Truck } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast & Reliable Delivery",
      description: "Get your packages delivered quickly and safely with our trusted shipping network."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Tracking",
      description: "Track your shipments in real-time with our advanced tracking system."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Shipping",
      description: "Your packages are protected with our comprehensive insurance coverage."
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Ship to and from anywhere in the world with our international shipping services."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Ship Your Packages with Confidence
            </h1>
            <p className="text-xl mb-8">
              Track your shipments in real-time, book new deliveries, and manage your logistics all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/book')}
                className="text-lg"
              >
                Book a Shipment
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/track')}
                className="text-lg bg-white/10 hover:bg-white/20"
              >
                Track a Package
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ship?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their shipping needs.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/book')}
            className="text-lg"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
