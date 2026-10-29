import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useLocale, localizePath, canonicalPath, type Locale } from '@/i18n';
import { CONTACT_URL, whatsappUrl } from '@/lib/site';
import SiteLink from './SiteLink';

const navigation = [
  { key: 'home', href: '/' },
  { key: 'formations', href: '/formations' },
  { key: 'faq', href: '/faq' },
  { key: 'about', href: '/a-propos' },
  { key: 'contact', href: '/contact' },
] as const;

const strings: Record<Locale, {
  home: string; formations: string; faq: string; about: string; contact: string;
  quote: string; openMenu: string; closeMenu: string;
  newTab: string; homeAria: string;
}> = {
  fr: {
    home: 'Accueil', formations: 'Formations', faq: 'FAQ', about: 'À propos', contact: 'Contact',
    quote: 'Demander un devis', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu',
    newTab: " (s'ouvre dans un nouvel onglet)", homeAria: 'IA générative — Accueil',
  },
  en: {
    home: 'Home', formations: 'Training', faq: 'FAQ', about: 'About', contact: 'Contact',
    quote: 'Get a quote', openMenu: 'Open menu', closeMenu: 'Close menu',
    newTab: ' (opens in a new tab)', homeAria: 'Generative AI — Home',
  },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const locale = useLocale();
  const t = strings[locale];
  const route = canonicalPath(location.pathname);
  const lp = (href: string) => localizePath(href, locale);

  const isActive = (href: string) => location.pathname === lp(href);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Header firms up once content scrolls under it — no shrink, no hide: the quote CTA stays put.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const LangSwitcher = ({ className = '' }: { className?: string }) => (
    <div className={`inline-flex items-center rounded-full border border-border/70 p-0.5 text-xs font-semibold ${className}`}>
      <Link
        to={localizePath(route, 'fr')}
        hrefLang="fr"
        aria-label="FR (Français)"
        aria-current={locale === 'fr' ? 'true' : undefined}
        className={`rounded-full px-2.5 py-1 transition-colors ${locale === 'fr' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-primary'}`}
      >
        FR
      </Link>
      <Link
        to={localizePath(route, 'en')}
        hrefLang="en"
        aria-label="EN (English)"
        aria-current={locale === 'en' ? 'true' : undefined}
        className={`rounded-full px-2.5 py-1 transition-colors ${locale === 'en' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-primary'}`}
      >
        EN
      </Link>
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-base ease-out-quart ${
        isScrolled
          ? 'border-border bg-background/95 shadow-[0_8px_24px_-16px_rgba(17,23,49,0.18)]'
          : 'border-border/70 bg-background/90'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3.5">
          {/* Section name, not a second logo: the shared bar above carries the
              brand and goes to the hub; this goes to the AI section's home. */}
          <Link to={lp('/')} className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" onClick={handleNavClick} aria-label={t.homeAria}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#553B9B' }} aria-hidden="true" />
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              {locale === 'en' ? 'Generative AI' : 'IA générative'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <SiteLink
                key={item.key}
                to={item.href}
                onClick={handleNavClick}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {t[item.key]}
              </SiteLink>
            ))}

          </div>

          <div className="hidden lg:flex items-center gap-2.5 pl-3">
            <LangSwitcher />
            <a href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer nofollow">
              <Button size="sm" variant="outline" className="border-green-600/40 text-green-700 hover:border-green-600 hover:bg-green-600 hover:text-white">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
                <span className="sr-only">{t.newTab}</span>
              </Button>
            </a>
            <a href={CONTACT_URL} onClick={handleNavClick}>
              <Button size="sm">
                {t.quote}
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <LangSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-nav-menu" className="motion-sheet lg:hidden border-t border-border/70 bg-background">
            <div className="px-2 pt-3 pb-4 space-y-1">
              {navigation.map((item) => (
                <SiteLink
                  key={item.key}
                  to={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={handleNavClick}
                >
                  {t[item.key]}
                </SiteLink>
              ))}


              <div className="px-2 pt-3 space-y-2">
                <a href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer nofollow" onClick={handleNavClick} className="block">
                  <Button variant="outline" className="w-full border-green-600/40 text-green-700 hover:border-green-600 hover:bg-green-600 hover:text-white">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                    <span className="sr-only">{t.newTab}</span>
                  </Button>
                </a>
                <a href={CONTACT_URL} onClick={handleNavClick} className="block">
                  <Button className="w-full">
                    {t.quote}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
