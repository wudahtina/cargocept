
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Truck, MapPin, Users, Star } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6">About Cargocept</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Your trusted partner in global shipping and logistics solutions since 2010.
          </p>

          <div className="prose prose-lg max-w-none mb-12">
            <p>
              Cargocept was founded with a simple mission: to make global shipping accessible,
              transparent, and efficient for businesses and individuals alike. What started as a
              small local courier service has grown into a comprehensive logistics platform serving
              clients across six continents.
            </p>
            <p>
              Our team of experienced logistics professionals combines industry knowledge with
              cutting-edge technology to provide you with reliable shipping solutions that meet your
              unique needs. Whether you're sending documents across town or shipping products around
              the world, we have the expertise and network to deliver.
            </p>
            <p>
              At Cargocept, we believe in building lasting relationships with our clients through
              exceptional service and transparent communication. We're committed to continuous
              improvement and innovation to ensure we're always providing the best possible shipping
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardContent className="pt-6">
                <div className="text-primary mb-4">
                  <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                </div>
                <p>
                  To provide accessible, reliable, and efficient shipping solutions that connect
                  businesses and individuals around the world, empowering global commerce through
                  innovative logistics services.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-primary mb-4">
                  <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
                </div>
                <p>
                  To be the world's most trusted logistics partner, setting the standard for
                  shipping excellence through technological innovation, exceptional service, and
                  sustainable practices.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold mb-8">Why Choose Cargocept?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            <div className="flex flex-col items-start">
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-muted-foreground">
                With partners in over 120 countries, we can deliver your shipments anywhere in the world.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
              <p className="text-muted-foreground">
                Our advanced tracking system lets you monitor your shipments at every step of the journey.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
              <p className="text-muted-foreground">
                Our customer service team is available 24/7 to assist with any questions or concerns.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Solutions</h3>
              <p className="text-muted-foreground">
                We offer tailored shipping solutions designed to meet your specific business needs.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
