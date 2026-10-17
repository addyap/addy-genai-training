import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { FORMATIONS } from '@/lib/formations';
import { useLocale, localizePath, canonicalPath, type Locale } from '@/i18n';
import { CONTACT_URL, asset } from '@/lib/site';
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
  activities: string; quote: string; openMenu: string; closeMenu: string;
  newTab: string; homeAria: string;
}> = {
  fr: {
    home: 'Accueil', formations: 'Formations', faq: 'FAQ', about: 'À propos', contact: 'Contact',
    activities: 'Mes activités', quote: 'Demander un devis', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu',
    newTab: " (s'ouvre dans un nouvel onglet)", homeAria: 'Antony Addy — Accueil',
  },
  en: {
    home: 'Home', formations: 'Training', faq: 'FAQ', about: 'About', contact: 'Contact',
    activities: 'What I do', quote: 'Get a quote', openMenu: 'Open menu', closeMenu: 'Close menu',
    newTab: ' (opens in a new tab)', homeAria: 'Antony Addy — Home',
  },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const locale = useLocale();
  const t = strings[locale];
  const route = canonicalPath(location.pathname);
  const lp = (href: string) => localizePath(href, locale);

  const isActive = (href: string) => location.pathname === lp(href);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsActivitiesOpen(false);
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
        aria-label="Français"
        aria-current={locale === 'fr' ? 'true' : undefined}
        className={`rounded-full px-2.5 py-1 transition-colors ${locale === 'fr' ? 'bg-primary text-primary-foreground' : 'text-foreground/60 hover:text-primary'}`}
      >
        FR
      </Link>
      <Link
        to={localizePath(route, 'en')}
        hrefLang="en"
        aria-label="English"
        aria-current={locale === 'en' ? 'true' : undefined}
        className={`rounded-full px-2.5 py-1 transition-colors ${locale === 'en' ? 'bg-primary text-primary-foreground' : 'text-foreground/60 hover:text-primary'}`}
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
          {/* Logo: the brand wordmark, with this activity beside it (as on the hub) */}
          <Link to={lp('/')} className="flex items-center gap-3" onClick={handleNavClick} aria-label={t.homeAria}>
            <img src={asset('/brand/antony-addy-logo.svg')} alt="Antony Addy" width={86} height={44} className="h-10 w-auto" />
            <span className="hidden sm:flex items-center gap-2 border-l border-border pl-3 text-xs font-medium text-muted-foreground">
              <span className="font-semibold" style={{ color: '#553B9B' }}>02</span>
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

            {/* Mes activités — the hub's three lines, this one current */}
            <div
              className="relative"
              onMouseEnter={() => setIsActivitiesOpen(true)}
              onMouseLeave={() => setIsActivitiesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsActivitiesOpen((o) => !o)}
                aria-haspopup="true"
                aria-expanded={isActivitiesOpen}
                className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition-colors duration-fast hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {t.activities}
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              {isActivitiesOpen && (
                <div className="motion-menu absolute right-0 top-full mt-1 w-80 rounded-2xl border border-border bg-card p-2 shadow-lg">
                  {FORMATIONS.map((f) => {
                    const content = (
                      <>
                        <span className="w-6 shrink-0 pt-0.5 text-xs font-semibold" style={{ color: f.color }}>{f.number}</span>
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">{f.label[locale]}</span>
                          <span className="text-xs text-muted-foreground">{f.detail[locale]}</span>
                        </span>
                      </>
                    );
                    return f.current ? (
                      <Link key={f.key} to={lp('/')} onClick={handleNavClick} aria-current="page" className="flex items-start gap-2 rounded-xl bg-primary/5 px-3 py-2.5">
                        {content}
                      </Link>
                    ) : (
                      <a key={f.key} href={f.href} onClick={() => setIsActivitiesOpen(false)} className="flex items-start gap-2 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted">
                        {content}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2.5 pl-3">
            <LangSwitcher />
            <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer">
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

              {/* Mes activités — mobile */}
              <div className="pt-3 mt-2 border-t border-border/70">
                <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.activities}</p>
                {FORMATIONS.map((f) => {
                  const cls = 'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary';
                  const content = (
                    <>
                      <span className="w-6 shrink-0 text-xs font-semibold" style={{ color: f.color }}>{f.number}</span>
                      {f.label[locale]}
                    </>
                  );
                  return f.current ? (
                    <Link key={f.key} to={lp('/')} onClick={handleNavClick} className={cls} aria-current="page">{content}</Link>
                  ) : (
                    <a key={f.key} href={f.href} onClick={handleNavClick} className={cls}>{content}</a>
                  );
                })}
              </div>

              <div className="px-2 pt-3 space-y-2">
                <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" onClick={handleNavClick} className="block">
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
