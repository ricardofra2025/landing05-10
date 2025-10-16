import React from 'react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.png';

const HeroSection: React.FC = () => {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('pricing');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden h-screen min-h-[500px]">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Overlay for better text readability on mobile */}
      <div className="absolute inset-0 bg-black/20 md:bg-transparent" />

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center relative z-10">
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-2/5">
          {/* Content - positioned on left side */}
          <div className="text-white space-y-3 md:space-y-5 max-w-lg text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight drop-shadow-lg">
              Cuide da sua saúde de forma simples, prática e inteligente
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white drop-shadow-md">
              Com a Ethra, basta enviar uma foto da sua refeição no WhatsApp e receba análises nutricionais completas, relatórios e dicas personalizadas em segundos.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white drop-shadow-md font-medium">
              Sua alimentação inteligente começa hoje.
            </p>
            <Button 
              onClick={scrollToPlans}
              className="bg-white text-gray-700 hover:bg-gray-100 text-xs sm:text-sm md:text-base px-6 md:px-8 py-4 md:py-5 rounded-md font-semibold shadow-lg mt-2 uppercase w-full sm:w-auto"
            >
              QUERO EXPERIMENTAR AGORA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
