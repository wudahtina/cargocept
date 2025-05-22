
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        variant: "destructive",
      });
      console.error("Sign out error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Package className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">Cargocept</span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-2">
          <Link to="/track" className="text-foreground/80 hover:text-foreground px-3 py-2 text-sm">
            Track
          </Link>
          <Link to="/services" className="text-foreground/80 hover:text-foreground px-3 py-2 text-sm">
            Services
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground px-3 py-2 text-sm">
            About
          </Link>
          <Link to="/contact" className="text-foreground/80 hover:text-foreground px-3 py-2 text-sm">
            Contact
          </Link>
          
          {user ? (
            <>
              <span className="text-foreground/80 px-3 py-2 text-sm">
                Hello, {user.user_metadata.name || user.email}
              </span>
              <Button variant="outline" className="ml-2" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="ml-2">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="ml-2">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
