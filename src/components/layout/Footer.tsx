
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Cargocept</span>
          </div>
          <p className="text-muted-foreground">
            Your reliable shipping and logistics partner for worldwide deliveries.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary">Home</Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-primary">Track Package</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary">Services</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">About Us</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/contact" className="hover:text-primary">Contact Us</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-primary">FAQ</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <address className="not-italic text-muted-foreground space-y-2">
            <p>123 Logistics Way</p>
            <p>Shipping City, SC 28412</p>
            <p>Email: info@cargocept.com</p>
            <p>Phone: (555) 123-4567</p>
          </address>
        </div>
      </div>
      
      <div className="container mt-8 pt-8 border-t border-muted-foreground/20">
        <p className="text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Cargocept. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
