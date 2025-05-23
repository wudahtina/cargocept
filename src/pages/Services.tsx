import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package, Truck, Clock, Shield, Globe, Home } from 'lucide-react';

const services = [
  {
    title: "Standard Shipping",
    description: "Regular delivery within 5–7 business days.",
    longDescription: "Perfect for everyday shipments that aren't time-sensitive. Our Standard Shipping offers a reliable and budget-friendly solution, ensuring your package arrives safely within a week. Includes basic tracking and delivery confirmation for peace of mind.",
    icon: <Package className="h-10 w-10" />,
    image: "/large-parcel-delivery-scaled.jpg.webp"
  },
  {
    title: "Express Shipping",
    description: "Fast delivery within 2–3 business days.",
    longDescription: "Ideal for customers who need their packages delivered quickly. Express Shipping offers faster transit times with priority processing, ensuring your items reach their destination within 72 hours. Comes with real-time tracking and status updates.",
    icon: <Truck className="h-10 w-10" />,
    image: "/delivery logistics.webp"
  },
  {
    title: "Premium Shipping",
    description: "Priority handling with insurance and tracking.",
    longDescription: "Designed for high-value or sensitive items, Premium Shipping offers enhanced care from pickup to delivery. It includes insurance coverage, detailed tracking, and priority support, making it ideal for urgent or important shipments.",
    icon: <Shield className="h-10 w-10" />,
    image: "/last-mile-delivery-logistics.jpg"
  },
  {
    title: "International Shipping",
    description: "Worldwide delivery with customs handling.",
    longDescription: "Send your packages globally with ease. Our International Shipping covers customs documentation and clearance, offering dependable transit times and global tracking. Suitable for personal or commercial shipments across borders.",
    icon: <Globe className="h-10 w-10" />,
    image: "/how-e-logistics-is-improving-supply-chain-efficiency-1920x1274.jpg.webp"
  },
  {
    title: "Door-to-Door International",
    description: "Premium door-to-door delivery service for international shipments.",
    longDescription: "Enjoy a seamless experience from pickup at your location to delivery at the recipient's address abroad. This service handles all logistics, including customs, taxes, and tracking, ensuring hassle-free global shipping.",
    icon: <Home className="h-10 w-10" />,
    image: "/set-of-delivery-logistics-delivery-process-to-customers-illustration-vector.jpg"
  },
  {
    title: "Door-to-Door Domestic",
    description: "Premium door-to-door delivery service for domestic shipments.",
    longDescription: "Let us handle everything—pickup from your door, transportation, and final delivery anywhere in the country. It's the ultimate convenience for individuals and businesses needing efficient and secure local deliveries.",
    icon: <Home className="h-10 w-10" />,
    image: "/7-tips-for-managing-your-logistics-more-effectively.webp"
  }
];

const Services = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive shipping solutions tailored to your specific needs
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-[500px]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="text-primary mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                  <p className="text-lg font-medium text-primary mb-4">
                    {service.description}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {service.longDescription}
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/contact" className="flex items-center">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 rounded-lg p-8 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Need a Custom Shipping Solution?</h2>
                <p className="text-lg mb-6">
                  Our team of logistics experts can design a tailored shipping solution to meet your specific business requirements.
                </p>
                <Button size="lg" asChild>
                  <Link to="/contact">Request a Custom Quote</Link>
                </Button>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      80 Park End St<br />
                      Broom Hill<br />
                      BH21 0XW<br />
                      United Kingdom
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+44 70 8897 8089</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
