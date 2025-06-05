import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package, Truck, Clock, Shield, Globe, Home, Plane, Ship, Warehouse } from 'lucide-react';

const services = [
  {
    title: "Air Freight Solutions",
    description: "Fast and reliable air cargo solutions for time-sensitive shipments.",
    longDescription: "Our air freight service offers the fastest delivery times for urgent shipments. With access to major airports worldwide, we ensure your cargo reaches its destination quickly and safely. Includes real-time tracking and priority handling.",
    icon: <Plane className="h-10 w-10" />,
    image: "/images/3.jpg"
  },
  {
    title: "Ocean Freight Services",
    description: "Cost-effective sea transportation for large volume shipments.",
    longDescription: "Perfect for large cargo volumes, our ocean freight service provides reliable and economical shipping solutions. We handle everything from container loading to customs clearance, ensuring smooth international transport.",
    icon: <Ship className="h-10 w-10" />,
    image: "/images/1.jpg"
  },
  {
    title: "Warehousing Solutions",
    description: "Secure storage and efficient inventory management.",
    longDescription: "Our state-of-the-art warehouses offer secure storage solutions with advanced inventory management systems. We provide flexible storage options, real-time inventory tracking, and efficient order fulfillment services.",
    icon: <Warehouse className="h-10 w-10" />,
    image: "/images/2.jpg"
  },
  {
    title: "Ground Transportation",
    description: "Reliable land transportation with real-time tracking.",
    longDescription: "Our ground transportation network ensures reliable delivery across the country. With a fleet of modern vehicles and experienced drivers, we provide safe and efficient land transport solutions for all your cargo needs.",
    icon: <Truck className="h-10 w-10" />,
    image: "/images/4.jpg"
  },
  {
    title: "Customs Clearance",
    description: "Expert handling of customs documentation and clearance.",
    longDescription: "Navigate international shipping regulations with ease. Our customs clearance service handles all documentation, compliance checks, and customs procedures, ensuring smooth border crossings for your shipments.",
    icon: <Shield className="h-10 w-10" />,
    image: "/images/5.jpg"
  },
  {
    title: "Supply Chain Solutions",
    description: "End-to-end supply chain management and optimization.",
    longDescription: "Optimize your entire supply chain with our comprehensive solutions. From procurement to delivery, we provide integrated logistics services that streamline operations and reduce costs while maintaining quality.",
    icon: <Globe className="h-10 w-10" />,
    image: "/images/6.jpg"
  }
];

const Services = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-blue-900">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive shipping solutions tailored to your specific needs
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group"
              >
                <div className="relative h-[500px] overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="space-y-6">
                  <div className="text-orange-500 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-blue-900">{service.title}</h3>
                  <p className="text-lg font-medium text-orange-500 mb-4">
                    {service.description}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {service.longDescription}
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                    asChild
                  >
                    <Link to="/contact" className="flex items-center">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-8 mt-16 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Need a Custom Shipping Solution?</h2>
                <p className="text-lg mb-6 text-white/90">
                  Our team of logistics experts can design a tailored shipping solution to meet your specific business requirements.
                </p>
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link to="/contact">Request a Custom Quote</Link>
                </Button>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-white/80">
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
                    <p className="text-white/80">+44 70 8897 8089</p>
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
