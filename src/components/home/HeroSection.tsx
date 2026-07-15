import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const HeroSection = () => {
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[560px] flex items-center justify-center overflow-hidden">
      <img
        src="/hero-background.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-16 sm:py-20 lg:py-24">
        <div className="animate-fade-in-up">
          <span className="inline-block mb-6 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            Formation IA Générative
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 text-shadow">
            Formez vos équipes — ou vous-même — à l'IA générative
          </h1>
          <p className="text-xl sm:text-2xl mb-4 font-light text-shadow">
            Des usages concrets, sans jargon, pour votre entreprise ou votre activité indépendante
          </p>
          <p className="text-sm sm:text-base mb-8 text-white/85 text-shadow tracking-wide">
            Formateur Professionnel d'Adultes (FPA) certifié d'État · Basé à Fréjus · Présentiel & à distance
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" onClick={handleNavClick}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Demander un devis
              </Button>
            </Link>
            <Link to="/formations" onClick={handleNavClick}>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white bg-white/10 hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Voir les formations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
