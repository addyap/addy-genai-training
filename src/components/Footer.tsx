import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Footer = () => {
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ia-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" onClick={handleNavClick} className="flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ia-gradient text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xl font-bold text-white">Antony Addy</div>
                <div className="text-sm text-gray-300">Formateur en IA Générative</div>
              </div>
            </Link>
            <p className="text-gray-300 max-w-md mb-6">
              Formations pratiques en intelligence artificielle générative pour entreprises et indépendants, animées par un formateur professionnel d'adultes certifié d'État.
            </p>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Antony Addy. Tous droits réservés.
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" onClick={handleNavClick} className="text-gray-300 hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/formations" onClick={handleNavClick} className="text-gray-300 hover:text-primary transition-colors">
                  Formations
                </Link>
              </li>
              <li>
                <Link to="/a-propos" onClick={handleNavClick} className="text-gray-300 hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleNavClick} className="text-gray-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" onClick={handleNavClick} className="text-gray-300 hover:text-primary transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            SIRET : 483 178 893 00028 | Email : <a href="mailto:ia@antonyaddy.com" className="text-primary hover:underline">ia@antonyaddy.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
