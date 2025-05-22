
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package, Truck, Clock, Users, ArrowRight, Box, Shield, Globe, Plane, Ship, Train } from 'lucide-react';
import { getServices } from '@/services/shipmentService';

const iconMapping: Record<string, React.ReactNode> = {
  'Package': <Package className="h-10 w-10" />,
  'Truck': <Truck className="h-10 w-10" />,
  'Clock': <Clock className="h-10 w-10" />,
  'Users': <Users className="h-10 w-10" />,
  'Box': <Box className="h-10 w-10" />,
  'Shield': <Shield className="h-10 w-10" />,
  'Globe': <Globe className="h-10 w-10" />,
  'Plane': <Plane className="h-10 w-10" />,
  'Ship': <Ship className="h-10 w-10" />,
  'Train': <Train className="h-10 w-10" />
};

const Services = () => {
  const { data: serviceDetails, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices
  });

  const renderIcon = (iconName: string | null) => {
    if (!iconName || !iconMapping[iconName]) {
      return <Package className="h-10 w-10" />;
    }
    return iconMapping[iconName];
  };

  const additionalServices = [
    {
      title: "Air Freight",
      description: "Expedited shipping via air cargo for time-sensitive deliveries with global coverage.",
      icon: "Plane"
    },
    {
      title: "Sea Freight",
      description: "Cost-effective shipping solution for large volumes with comprehensive ocean freight services.",
      icon: "Ship"
    },
    {
      title: "Rail Transport",
      description: "Eco-friendly logistics solution connecting major industrial hubs with reliable schedules.",
      icon: "Train"
    },
    {
      title: "Supply Chain Solutions",
      description: "End-to-end supply chain management services tailored to your business requirements.",
      icon: "Box"
    },
    {
      title: "Secure Shipping",
      description: "Enhanced security measures for high-value and sensitive shipments requiring special handling.",
      icon: "Shield"
    },
    {
      title: "International Logistics",
      description: "Comprehensive international shipping with customs clearance and documentation assistance.",
      icon: "Globe"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cargocept offers comprehensive logistics solutions tailored to your specific shipping needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {!isLoading && serviceDetails && serviceDetails.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="text-primary mb-4">
                      {renderIcon(service.icon)}
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/contact" className="flex items-center">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {isLoading && Array(4).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="h-10 w-10 bg-primary/20 rounded mb-4 animate-pulse" />
                  <div className="h-8 bg-muted rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-20 bg-muted rounded w-full mb-6 animate-pulse" />
                  <div className="h-10 bg-muted rounded w-1/3 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Additional Logistics Solutions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {additionalServices.map((service, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-primary mb-4">
                    {renderIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Looking for Custom Logistics Solutions?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Our team of logistics experts can design a tailored shipping solution to meet your specific business requirements.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Request a Custom Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
