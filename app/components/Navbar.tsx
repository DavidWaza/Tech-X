'use client';
import { useState, useEffect } from "react";
import { Menu, X, Headphones, Search, User } from "lucide-react";
import { Button } from "./ui/Button";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "#home" },
  { name: "Podcast", href: "#podcast" },
  { name: "News", href: "#news" },
  { name: "Watch", href: "#watch" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="px-4 md:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              {/* <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105">
                <Headphones className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div> */}
              <div className="flex flex-col">
                <span className="font-sansita font-bold text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                  Tech X
                </span>
                <span className="text-[10px] text-muted-foreground -mt-1 uppercase tracking-wider hidden sm:block">
                  Innovation Voices
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${activeLink === link.name
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full hover:bg-muted"
              >
                <Search className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="ghost"
                className="gap-2"
              >
                <User className="w-4 h-4" />
                Membership
              </Button>
              
              <Button 
                variant="default"
                className="gap-2 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all"
              >
                Subscribe
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden transition-all duration-300
          ${isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
          }
        `}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`
            absolute top-16 md:top-20 left-0 right-0 bg-background border-b border-border shadow-2xl
            transition-transform duration-300
            ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
          `}
        >
          <div className="max-w-[1600px] mx-auto px-4 py-6">
            {/* Mobile Navigation Links */}
            <div className="space-y-1 mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    block px-4 py-3 rounded-lg font-medium transition-all duration-200
                    ${activeLink === link.name
                      ? 'text-primary bg-primary/10 border-l-4 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search podcasts, news..."
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="space-y-3 pt-4 border-t border-border">
              <Button 
                variant="ghost"
                className="w-full justify-start gap-2 h-12"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                Membership
              </Button>
              
              <Button 
                variant="default"
                className="w-full gap-2 h-12 bg-primary hover:bg-primary/90 shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Subscribe to Newsletter
              </Button>
            </div>

            {/* Social Links or Additional Info */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Join 50,000+ innovators staying ahead
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
}