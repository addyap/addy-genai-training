import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, MessageCircle, ChevronDown, Globe, Settings, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { FORMATIONS } from '@/lib/formations';
import { useLocale, localizePath, canonicalPath, type Locale } from '@/i18n';

const navigation = [
  { key: 'home', href: '/' },
  { key: 'formations', href: '/formations' },
  { key: 'faq', href: '/faq' },
  { key: 'about', href: '/a-propos' },
  { key: 'contact', href: '/contact' },
] as const;

const strings: Record<Locale, {
  home: string; formations: string; faq: string; about: string; contact: string;
  myTraining: string; quote: string; openMenu: string; closeMenu: string;
  newTab: string; homeAria: string;
}> = {
  fr: {
    home: 'Accueil', formations: 'Formations', faq: 'FAQ', about: 'À propos', contact: 'Contact',
    myTraining: 'Mes formations', quote: 'Demander un devis', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu',
    newTab: " (s'ouvre dans un nouvel onglet)", homeAria: 'Antony Addy — Accueil',
  },
  en: {
    home: 'Home', formations: 'Training', faq: 'FAQ', about: 'About', contact: 'Contact',
    myTraining: 'My training', quote: 'Get a quote', openMenu: 'Open menu', closeMenu: 'Close menu',
    newTab: ' (opens in a new tab)', homeAria: 'Antony Addy — Home',
  },
};

const FORMATION_ICONS = { Globe, Sparkles, Settings } as const;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormationsOpen, setIsFormationsOpen] = useState(false);
  const location = useLocation();
  const locale = useLocale();
  const t = strings[locale];
  const route = canonicalPath(location.pathname);
  const lp = (href: string) => localizePath(href, locale);

  const isActive = (href: string) => location.pathname === lp(href);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsFormationsOpen(false);
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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/85 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3.5">
          {/* Logo */}
          <Link to={lp('/')} className="flex items-center gap-3 group" onClick={handleNavClick} aria-label={t.homeAria}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ia-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="hidden sm:block">
              <div className="font-display text-lg font-semibold leading-tight text-foreground">Antony Addy</div>
              <div className="text-xs text-muted-foreground">{locale === 'en' ? 'Generative AI Trainer' : 'Formateur en IA Générative'}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.key}
                to={lp(item.href)}
                onClick={handleNavClick}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {t[item.key]}
              </Link>
            ))}

            {/* Mes formations — cross-domain switcher (Anglais · IA · SAP) */}
            <div
              className="relative"
              onMouseEnter={() => setIsFormationsOpen(true)}
              onMouseLeave={() => setIsFormationsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsFormationsOpen((o) => !o)}
                aria-haspopup="true"
                aria-expanded={isFormationsOpen}
                className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition-colors duration-200 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {t.myTraining}
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              {isFormationsOpen && (
                <div className="absolute right-0 top-full mt-1 w-72 rounded-2xl border border-border/70 bg-white p-2 shadow-lg">
                  {FORMATIONS.map((f) => {
                    const Icon = FORMATION_ICONS[f.icon];
                    const content = (
                      <>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="flex flex-col">
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                            {f.navLabel}
                            {f.external && <ExternalLink className="h-3 w-3 text-muted-foreground" aria-hidden="true" />}
                          </span>
                          <span className="text-xs text-muted-foreground">{f.domain}</span>
                        </span>
                      </>
                    );
                    return f.external ? (
                      <a
                        key={f.key}
                        href={f.href}
                        target="_blank"
                        rel="noopener"
                        onClick={() => setIsFormationsOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-primary/5"
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        key={f.key}
                        to={lp('/')}
                        onClick={handleNavClick}
                        className="flex items-center gap-3 rounded-xl bg-primary/5 px-3 py-2"
                        aria-current="page"
                      >
                        {content}
                      </Link>
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
            <Link to={lp('/contact')} onClick={handleNavClick}>
              <Button size="sm">
                {t.quote}
              </Button>
            </Link>
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
          <div id="mobile-nav-menu" className="lg:hidden border-t border-border/70 bg-white">
            <div className="px-2 pt-3 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  to={lp(item.href)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={handleNavClick}
                >
                  {t[item.key]}
                </Link>
              ))}

              {/* Mes formations — mobile switcher */}
              <div className="pt-3 mt-2 border-t border-border/70">
                <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.myTraining}</p>
                {FORMATIONS.map((f) => {
                  const Icon = FORMATION_ICONS[f.icon];
                  const cls = 'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary';
                  const content = (
                    <>
                      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <span className="inline-flex items-center gap-1">
                        {f.navLabel}
                        {f.external && <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />}
                      </span>
                    </>
                  );
                  return f.external ? (
                    <a key={f.key} href={f.href} target="_blank" rel="noopener" onClick={handleNavClick} className={cls}>
                      {content}
                    </a>
                  ) : (
                    <Link key={f.key} to={lp('/')} onClick={handleNavClick} className={cls} aria-current="page">
                      {content}
                    </Link>
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
                <Link to={lp('/contact')} onClick={handleNavClick} className="block">
                  <Button className="w-full">
                    {t.quote}
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
