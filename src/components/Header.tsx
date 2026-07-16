import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Formations', href: '/formations' },
  { name: 'FAQ', href: '/faq' },
  { name: 'À propos', href: '/a-propos' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/85 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3.5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={handleNavClick}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ia-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="hidden sm:block">
              <div className="font-display text-lg font-semibold leading-tight text-foreground">Antony Addy</div>
              <div className="text-xs text-muted-foreground">Formateur en IA Générative</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavClick}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2.5 pl-3">
            <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="border-green-600/40 text-green-700 hover:border-green-600 hover:bg-green-600 hover:text-white">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
            </a>
            <Link to="/contact" onClick={handleNavClick}>
              <Button size="sm">
                Demander un devis
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="Ouvrir le menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/70 bg-white">
            <div className="px-2 pt-3 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-2 pt-3 space-y-2">
                <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" onClick={handleNavClick} className="block">
                  <Button variant="outline" className="w-full border-green-600/40 text-green-700 hover:border-green-600 hover:bg-green-600 hover:text-white">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
                <Link to="/contact" onClick={handleNavClick} className="block">
                  <Button className="w-full">
                    Demander un devis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
