import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold">
                Cargocept
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive('/admin') ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/book"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/book') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Book Shipment
                </Link>
                <Link
                  to="/track"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/track') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Track Shipment
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Button variant="ghost" onClick={signOut}>
                  Sign Out
                </Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <p className="text-sm text-muted-foreground">
                Cargocept provides reliable and efficient shipping solutions for businesses and individuals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/book" className="text-sm text-muted-foreground hover:text-primary">
                    Book Shipment
                  </Link>
                </li>
                <li>
                  <Link to="/track" className="text-sm text-muted-foreground hover:text-primary">
                    Track Shipment
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/services/domestic" className="text-sm text-muted-foreground hover:text-primary">
                    Domestic Shipping
                  </Link>
                </li>
                <li>
                  <Link to="/services/international" className="text-sm text-muted-foreground hover:text-primary">
                    International Shipping
                  </Link>
                </li>
                <li>
                  <Link to="/services/express" className="text-sm text-muted-foreground hover:text-primary">
                    Express Delivery
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">
                  Email: support@cargocept.com
                </li>
                <li className="text-sm text-muted-foreground">
                  Phone: +1 (555) 123-4567
                </li>
                <li className="text-sm text-muted-foreground">
                  Address: 123 Shipping St, Logistics City, LC 12345
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cargocept. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
