import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  Clock, 
  Shield, 
  Globe, 
  Plane, 
  Ship, 
  Warehouse,
  Map,
  Users,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const services = [
  {
    title: "Air Freight",
    description: "Fast and reliable air cargo solutions for time-sensitive shipments",
    icon: <Plane className="h-8 w-8" />
  },
  {
    title: "Ocean Freight",
    description: "Cost-effective sea transportation for large volume shipments",
    icon: <Ship className="h-8 w-8" />
  },
  {
    title: "Ground Transport",
    description: "Efficient land transportation with real-time tracking",
    icon: <Truck className="h-8 w-8" />
  },
  {
    title: "Customs Clearance",
    description: "Expert handling of customs documentation and clearance",
    icon: <Shield className="h-8 w-8" />
  }
];

const features = [
  {
    title: "Global Tracking",
    description: "Track your shipments in real-time across the globe with our advanced tracking system.",
    icon: <Globe className="h-10 w-10" />,
    image: "/images/2.jpg",
    link: "/login",
    caption: "Efficient Warehousing"
  },
  {
    title: "Next-Day Delivery",
    description: "Experience lightning-fast delivery with our premium next-day shipping service.",
    icon: <Clock className="h-10 w-10" />,
    image: "/images/3.jpg",
    link: "/login",
    caption: "Air Freight Solutions"
  },
  {
    title: "Eco-Friendly Shipping",
    description: "Sustainable shipping solutions that reduce your carbon footprint.",
    icon: <Shield className="h-10 w-10" />,
    image: "/images/4.jpg",
    link: "/login",
    caption: "Advanced Logistics"
  }
];

const flightBenefits = [
  {
    title: "Fastest Delivery",
    description: "Urgent cargo delivered with speed and precision",
    icon: <Clock className="h-8 w-8" />
  },
  {
    title: "Global Network",
    description: "Access to major airports worldwide",
    icon: <Globe className="h-8 w-8" />
  },
  {
    title: "Real-time Tracking",
    description: "Monitor your cargo every step of the way",
    icon: <Shield className="h-8 w-8" />
  }
];

const testimonials = [
  {
    quote: "Cargocept has transformed our shipping experience. Their reliability and speed are unmatched in the industry.",
    author: "Sarah Johnson",
    role: "Logistics Manager, TechCorp"
  },
  {
    quote: "The real-time tracking and customer service make Cargocept our preferred shipping partner for all international deliveries.",
    author: "Michael Chen",
    role: "Operations Director, Global Imports"
  }
];

const values = [
  {
    title: "Efficiency",
    description: "Optimizing every step of the shipping process",
    icon: <Clock className="h-8 w-8" />
  },
  {
    title: "Sustainability",
    description: "Committed to eco-friendly shipping solutions",
    icon: <Shield className="h-8 w-8" />
  },
  {
    title: "Customer Focus",
    description: "Putting our clients' needs first",
    icon: <Users className="h-8 w-8" />
  }
];

const serviceSlider = [
  {
    title: "Air Freight Solutions",
    description: "Fast and reliable air cargo solutions for time-sensitive shipments",
    icon: <Plane className="h-12 w-12" />,
    image: "/images/3.jpg",
    link: "/services"
  },
  {
    title: "Ocean Freight Services",
    description: "Cost-effective sea transportation for large volume shipments",
    icon: <Ship className="h-12 w-12" />,
    image: "/images/1.jpg",
    link: "/services"
  },
  {
    title: "Warehousing Solutions",
    description: "Secure storage and efficient inventory management",
    icon: <Warehouse className="h-12 w-12" />,
    image: "/images/2.jpg",
    link: "/services"
  },
  {
    title: "Ground Transportation",
    description: "Reliable land transportation with real-time tracking",
    icon: <Truck className="h-12 w-12" />,
    image: "/images/4.jpg",
    link: "/services"
  },
  {
    title: "Customs Clearance",
    description: "Expert handling of customs documentation and clearance",
    icon: <Shield className="h-12 w-12" />,
    image: "/images/5.jpg",
    link: "/services"
  },
  {
    title: "Supply Chain Solutions",
    description: "End-to-end supply chain management and optimization",
    icon: <Globe className="h-12 w-12" />,
    image: "/images/6.jpg",
    link: "/services"
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(true);

  useEffect(() => {
    // Check if all required images exist
    const requiredImages = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
    const missingImages = requiredImages.filter(img => {
      try {
        new Image().src = `/images/${img}`;
        return false;
      } catch {
        return true;
      }
    });

    if (missingImages.length > 0) {
      console.error('Missing images:', missingImages);
      setImagesLoaded(false);
    }
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % serviceSlider.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + serviceSlider.length) % serviceSlider.length);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/images/1.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70" />
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 animate-fade-in">
              Fast, Reliable Cargo Solutions with Cargocept
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-delay">
              Seamless shipping, global reach, unbeatable prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link to="/login">Get a Quote Today</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 transition-all duration-300"
                asChild
              >
                <Link to="/track">Track Your Shipment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Slider Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-blue-900">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of shipping solutions
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {serviceSlider.map((service, index) => (
                  <div 
                    key={index} 
                    className="w-full flex-shrink-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4">
                      <div className="relative h-[400px] overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="space-y-6">
                        <div className="text-orange-500">
                          {service.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-blue-900">
                          {service.title}
                        </h3>
                        <p className="text-xl text-gray-600">
                          {service.description}
                        </p>
                        <Button 
                          className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 transform hover:scale-105"
                          asChild
                        >
                          <Link to={service.link}>
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-900 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-900 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {serviceSlider.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-orange-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-blue-900">
            Why Choose Cargocept?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience shipping excellence with our comprehensive solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <Link to={feature.link} className="block">
                <div className="relative h-[300px]">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-4 text-orange-400">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/90 mb-4">{feature.description}</p>
                    <p className="text-orange-400 font-semibold">{feature.caption}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Flight Shipments Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-blue-900">
              Why Choose Our Flight Shipments?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the fastest and most reliable air freight solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
              <Link to="/login" className="block">
                <img
                  src="/images/5.jpg"
                  alt="Rapid Air Cargo"
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">Rapid Air Cargo</h3>
                </div>
              </Link>
            </div>
            <div className="flex flex-col justify-center">
              <div className="grid grid-cols-1 gap-8">
                {flightBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-orange-500 mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-blue-900">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/login">Explore Air Freight</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-blue-900">
            Our Cargo Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive shipping solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-orange-500 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-900">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                to="/login"
                className="inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-300"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-blue-900">
                About Cargocept
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Empowering global trade with reliable logistics solutions
              </p>
              <div className="grid grid-cols-1 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-orange-500 mt-1">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-blue-900">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
                <Link to="/login" className="block">
                  <img
                    src="/images/6.jpg"
                    alt="Our Operations"
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white">Our Operations</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-blue-900">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-bold text-blue-900">{testimonial.author}</p>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="/images/1.jpg"
            alt="Cargo Ship"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70" />
        </div>
        <div className="relative container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
              Move Your Cargo with Confidence
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Experience the difference with Cargocept's reliable shipping solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link to="/tracking">Track Your Shipment</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 transition-all duration-300"
                asChild
              >
                <Link to="/login">Start Shipping Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-900">Our Location</h3>
              <p className="text-gray-600">
                80 Park End St<br />
                Broom Hill<br />
                BH21 0XW<br />
                United Kingdom
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-900">Contact Us</h3>
              <p className="text-gray-600">
                Phone: +44 70 8897 8089<br />
                Email: info@cargocept.org
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

