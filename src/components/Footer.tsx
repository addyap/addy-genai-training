import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { FORMATIONS } from '@/lib/formations';
import { useLocale, localizePath, type Locale } from '@/i18n';
import SiteLink from './SiteLink';
import { asset } from '@/lib/site';

const strings: Record<Locale, {
  role: string; tagline: string; myTraining: string; navigation: string; contact: string;
  rights: string; newTab: string; links: { to: string; label: string }[];
}> = {
  fr: {
    role: 'Formateur en IA Générative',
    tagline: "Formations pratiques en intelligence artificielle générative pour entreprises et indépendants, animées par un formateur professionnel d'adultes certifié d'État — en français ou en anglais.",
    myTraining: 'Mes activités',
    navigation: 'Navigation',
    contact: 'Contact',
    rights: 'Tous droits réservés.',
    newTab: " (s'ouvre dans un nouvel onglet)",
    links: [
      { to: '/', label: 'Accueil' },
      { to: '/formations', label: 'Formations' },
      { to: '/faq', label: 'FAQ' },
      { to: '/ressources', label: 'Ressources' },
      { to: '/diagnostic', label: 'Diagnostic IA responsable' },
      { to: '/a-propos', label: 'À propos' },
      { to: '/contact', label: 'Contact' },
      { to: '/mentions-legales', label: 'Mentions légales' },
    ],
  },
  en: {
    role: 'Generative AI Trainer',
    tagline: 'Practical generative-AI training for companies and independent professionals, delivered by a state-certified adult-education trainer — in French or English.',
    myTraining: 'What I do',
    navigation: 'Navigation',
    contact: 'Contact',
    rights: 'All rights reserved.',
    newTab: ' (opens in a new tab)',
    links: [
      { to: '/', label: 'Home' },
      { to: '/formations', label: 'Training' },
      { to: '/faq', label: 'FAQ' },
      { to: '/ressources', label: 'Resources' },
      { to: '/diagnostic', label: 'Responsible-AI check' },
      { to: '/a-propos', label: 'About' },
      { to: '/contact', label: 'Contact' },
      { to: '/mentions-legales', label: 'Legal notice' },
    ],
  },
};

const Footer = () => {
  const locale = useLocale();
  const t = strings[locale];
  const lp = (href: string) => localizePath(href, locale);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-ia-navy text-white">
      <div className="absolute inset-0 bg-dot-grid-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <Link to={lp('/')} onClick={handleNavClick} className="flex items-center gap-3 mb-5 w-fit hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ia-navy rounded-lg">
              <img src={asset('/brand/antony-addy-logo-white.svg')} alt="Antony Addy" width={125} height={64} loading="lazy" className="h-14 w-auto" />
              <span className="border-l border-white/20 pl-3 text-sm text-white/60">{t.role}</span>
            </Link>
            <p className="text-white/65 max-w-sm leading-relaxed">
              {t.tagline}
            </p>

            {/* Mes formations — cross-domain links */}
            <div className="mt-6">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50 mb-3">{t.myTraining}</h2>
              <ul className="space-y-2">
                {FORMATIONS.map((f) => (
                  <li key={f.key}>
                    {f.current ? (
                      <span className="inline-flex items-center gap-2.5 font-medium text-white" aria-current="page">
                        <span className="text-xs font-semibold" style={{ color: '#a995e6' }}>{f.number}</span>
                        {f.label[locale]}
                      </span>
                    ) : (
                      <a href={f.href} className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors">
                        <span className="text-xs font-semibold text-white/45">{f.number}</span>
                        {f.label[locale]}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50 mb-5">{t.navigation}</h2>
            <ul className="space-y-3">
              {t.links.map((link) => (
                <li key={link.to}>
                  <SiteLink to={link.to} onClick={handleNavClick} className="text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ia-navy rounded-sm">
                    {link.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50 mb-5">{t.contact}</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="h-4 w-4 text-[#f6a463] shrink-0" />
                <a href="mailto:formations@antonyaddy.com" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ia-navy rounded-sm">formations@antonyaddy.com</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <MessageCircle className="h-4 w-4 text-[#f6a463] shrink-0" />
                <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ia-navy rounded-sm">WhatsApp<span className="sr-only">{t.newTab}</span></a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <MapPin className="h-4 w-4 text-[#f6a463] shrink-0" />
                <span>Fréjus, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© {new Date().getFullYear()} Antony Addy. {t.rights}</p>
          <p>SIRET : 483 178 893 00028</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
