import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, MessageCircle, MapPin } from 'lucide-react';

const Footer = () => {
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
            <Link to="/" onClick={handleNavClick} className="flex items-center gap-3 mb-5 w-fit hover:opacity-90 transition-opacity">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ia-gradient text-white shadow-glow">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-xl font-semibold text-white">Antony Addy</div>
                <div className="text-sm text-white/60">Formateur en IA Générative</div>
              </div>
            </Link>
            <p className="text-white/65 max-w-sm leading-relaxed">
              Formations pratiques en intelligence artificielle générative pour entreprises et indépendants, animées par un formateur professionnel d'adultes certifié d'État.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/40 mb-5">Navigation</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/formations', label: 'Formations' },
                { to: '/faq', label: 'FAQ' },
                { to: '/ressources', label: 'Ressources' },
                { to: '/diagnostic', label: 'Diagnostic IA responsable' },
                { to: '/generateur-programme', label: 'Générateur de programme' },
                { to: '/correction-email', label: "Correcteur d'email anglais" },
                { to: '/a-propos', label: 'À propos' },
                { to: '/contact', label: 'Contact' },
                { to: '/mentions-legales', label: 'Mentions légales' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} onClick={handleNavClick} className="text-white/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/40 mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:formations@antonyaddy.com" className="hover:text-primary transition-colors">formations@antonyaddy.com</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <MessageCircle className="h-4 w-4 text-primary shrink-0" />
                <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Fréjus, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Antony Addy. Tous droits réservés.</p>
          <p>SIRET : 483 178 893 00028</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
